/* Pure matching logic: only a unique first-author/year pair among this term's references
   can become a link. In particular, two works from the same author/year stay plain text. */
const escapeRE = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const normalise = (text) => text.normalize('NFC').toLocaleLowerCase();

export function citationMatches(text, references) {
  const groups = new Map();
  for (const ref of references) {
    if (!ref.first || !ref.year) continue;
    const pair = `${normalise(ref.first)}\0${normalise(ref.year)}`;
    const group = groups.get(pair) || [];
    group.push(ref);
    groups.set(pair, group);
  }
  const matches = [];
  for (const group of groups.values()) {
    if (group.length !== 1) continue;
    const ref = group[0];
    const names = ref.authors || [ref.first];
    const rest = names.slice(1);
    const full = rest.map((name, index) => index === rest.length - 1
      ? String.raw`,?\s+(?:&|and)\s+${escapeRE(name)}`
      : String.raw`,\s*${escapeRE(name)}`).join('');
    let others = full;
    if (ref.etal) others = full ? String.raw`(?:\s+et\s+al\.?|${full})` : String.raw`\s+et\s+al\.?`;
    const pattern = new RegExp(String.raw`(?<![\p{L}\p{M}\p{N}])${escapeRE(ref.first)}${others}(?:,\s*${escapeRE(ref.year)}|\s+\(${escapeRE(ref.year)}\))(?![\p{L}\p{N}])`, 'giu');
    for (let match; (match = pattern.exec(text));) {
      // A coauthor or the end of a longer surname is not the first author.
      const before = text.slice(0, match.index);
      if (/(?:,|&|\band)\s*$/iu.test(before) || /\b(?:van(?:\s+den)?|von|de(?:\s+la)?|del|da|der|di|le|la)\s+$/iu.test(before)) continue;
      matches.push({ start: match.index, end: match.index + match[0].length, key: ref.key });
    }
  }
  // Longer surnames win over their suffixes (e.g. van den Berg / Berg).
  matches.sort((a, b) => a.start - b.start || b.end - a.end);
  return matches.filter((match, index) => !matches.slice(0, index).some((other) => match.start < other.end && match.end > other.start));
}
