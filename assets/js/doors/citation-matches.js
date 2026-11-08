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
  const name = String.raw`[\p{L}][\p{L}\p{M}'’.-]*(?:\s+[\p{L}][\p{L}\p{M}'’.-]*)*`;
  const others = String.raw`(?:\s+et\s+al\.?|(?:,\s*${name})*(?:,?\s+(?:&|and)\s+${name}))?`;
  for (const group of groups.values()) {
    if (group.length !== 1) continue;
    const ref = group[0];
    const pattern = new RegExp(String.raw`(?<![\p{L}\p{M}\p{N}])${escapeRE(ref.first)}${others}(?:,\s*${escapeRE(ref.year)}|\s+\(${escapeRE(ref.year)}\))(?![\p{L}\p{N}])`, 'giu');
    for (const match of text.matchAll(pattern)) {
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
