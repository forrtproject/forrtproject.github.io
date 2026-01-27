const { Cite } = require('@citation-js/core');
require('@citation-js/plugin-bibtex');
require('@citation-js/plugin-csl');
const fs = require('fs');

const DEFAULT_INPUT = 'https://docs.google.com/document/d/1-KKsOYZWJ3LdgdO2b2uJsOG2AmUDaQBNqWVVTY2W4W8/edit?tab=t.0';
const DEFAULT_OUTPUT = 'apa_lookup.json';

async function fetchBibtex(input) {
  if (!input.startsWith('http')) {
    return fs.readFileSync(input, 'utf-8');
  }

  if (input.includes('docs.google.com')) {
    const match = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) throw new Error('Invalid Google Doc URL');
    const exportUrl = `https://docs.google.com/document/d/${match[1]}/export?format=txt`;
    const response = await fetch(exportUrl);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    let text = await response.text();
    return text.replace(/\[[a-z]+\]/gi, ''); // Remove Google Docs comment markers
  }

  const response = await fetch(input);
  if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
  return response.text();
}

function extractUrl(entry) {
  if (entry.URL) return entry.URL;
  if (entry.note) {
    const match = entry.note.match(/https?:\/\/[^\s]+/);
    if (match) return match[0];
  }
  return null;
}

function bibtexToApaJson(bibtexContent, includeUrl = true) {
  const cite = new Cite(bibtexContent);
  const result = {};

  for (const entry of cite.data) {
    const key = entry.id || entry['citation-key'];
    let ref = new Cite(entry).format('bibliography', {
      format: 'text',
      template: 'apa',
      lang: 'en-US'
    }).trim();

    if (includeUrl) {
      const url = extractUrl(entry);
      if (url && !url.includes('doi.org') && !ref.includes(url)) {
        ref = ref.match(/https?:\/\/[^\s]+$/)
          ? `${ref} Retrieved from ${url}`
          : ref.replace(/\.?$/, `. Retrieved from ${url}`);
      }
    }

    result[key] = ref;
  }

  return result;
}

async function main() {
  const args = process.argv.slice(2);
  let input = DEFAULT_INPUT;
  let output = DEFAULT_OUTPUT;
  let includeUrl = true;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-i' || args[i] === '--input') input = args[++i];
    else if (args[i] === '-o' || args[i] === '--output') output = args[++i];
    else if (args[i] === '--no-url') includeUrl = false;
    else if (args[i] === '-h' || args[i] === '--help') {
      console.log(`Usage: node bibtex-to-apa.js [-i INPUT] [-o OUTPUT] [--no-url]
Options:
  -i, --input   Input BibTeX (URL or file). Default: Google Doc
  -o, --output  Output JSON file. Default: apa_lookup.json
  --no-url      Don't append URLs to references`);
      process.exit(0);
    }
  }

  const bibtex = await fetchBibtex(input);
  const apaJson = bibtexToApaJson(bibtex, includeUrl);
  fs.writeFileSync(output, JSON.stringify(apaJson, null, 2));
  console.log(`Wrote ${Object.keys(apaJson).length} references to ${output}`);
}

main().catch(console.error);