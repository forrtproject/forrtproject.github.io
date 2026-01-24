# FORRT Spell Check

This directory contains the automated spell-checking system for the FORRT repository.

## Components

### check_spelling.py
Python script that:
- Runs codespell on the repository
- Parses the results
- Formats them as a GitHub comment for PRs

### Configuration Files (in repository root)

#### .codespellrc
Configuration file for codespell that:
- Specifies which files/directories to skip
- Configures checking options
- References the ignore words list

#### .codespell-ignore.txt
List of words to ignore during spell checking:
- Project-specific terms (FORRT, preregistration, etc.)
- Proper names (authors, organizations)
- Technical terms
- Acceptable spelling variations (e.g., British English "behaviour", "colour" are acceptable alongside American English variants)

## Usage

### Running Locally

To run spell check locally:

```bash
# Install codespell
pip install codespell

# Run the spell check
python scripts/spell_check/check_spelling.py
```

Or run codespell directly:

```bash
codespell --config .codespellrc
```

### Adding Words to Whitelist

If codespell flags a word that is correct (e.g., a person's name, technical term, or intentional spelling):

1. Add the word to `.codespell-ignore.txt`
2. One word per line
3. Add a comment above the word explaining why it's whitelisted (optional but recommended)
4. Commit the change

Example:
```
# Author names
Kathawalla
Gilad
```

### GitHub Actions Workflow

The spell check runs automatically on pull requests via the `.github/workflows/spell-check.yaml` workflow. It:

1. Triggers on PR open, synchronize, or reopen
2. Installs codespell
3. Runs the spell check script
4. Posts/updates a comment on the PR with results

## False Positives

If you encounter false positives:

1. **For legitimate terms**: Add to `.codespell-ignore.txt`
2. **For file types**: Add the extension to the `skip` list in `.codespellrc`
3. **For directories**: Add the directory path to the `skip` list in `.codespellrc`

## Configuration

The spell check focuses on:
- Content files (markdown)
- Scripts (Python, shell)
- GitHub workflows
- Documentation files

It skips:
- Binary files (images, fonts)
- Themes and node_modules
- Non-English translations
- Data files (JSON, PDF)
- Lock files
