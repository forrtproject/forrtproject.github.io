# Contributing

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. Please read the relevant section before contributing — it makes things smoother for everyone. The community looks forward to your contributions. 🎉

You can support FORRT by:
> - Starring the repository
> - Sharing FORRT on social media
> - Referencing FORRT in your project's readme
> - Mentioning FORRT at local meetups and to colleagues

Please follow the [FORRT Code of Conduct](https://forrt.org/coc/) in issues, reviews, and other project interactions.

## Table of Contents

- [Questions, Ideas & Suggestions](#questions-ideas--suggestions)
- [Edit content in your browser](#edit-content-in-your-browser)
  - [Linking glossary terms](#linking-glossary-terms)
- [Local Development Setup](#local-development-setup)
  - [Standard Setup](#standard-setup-git--hugo)
  - [RStudio Setup](#rstudio-setup)
- [Contribution Workflow](#contribution-workflow)
  - [Citing references](#citing-references)
  - [Contributing with AI tools](#contributing-with-ai-tools)
  - [Content, Licensing & Fact-Checking](#content-licensing--fact-checking)
- [Deployment & Staging](#deployment--staging)
  - [Production](#production)
  - [Staging](#staging)
  - [How Staging Works](#how-staging-works)
  - [Monthly Reports](#monthly-reports)

---

## Questions, Ideas & Suggestions

Issues are the best place to raise a question, suggest an improvement, or propose a resource for inclusion (unless you can find the more specific submission form).

- Have a quick look through the existing [Issues](https://github.com/forrtproject/forrtproject.github.io/issues) in case the same idea is already being discussed.
- Otherwise, [open a new Issue](https://github.com/forrtproject/forrtproject.github.io/issues/new) and go for it — a question, a rough idea, or a fully worked-out proposal are all welcome. Share whatever context is helpful.

FORRT is maintained by volunteers, so response times may vary. We appreciate your patience and your contribution.

---

## Edit content in your browser

You do not need to install Git or Hugo to fix text or a broken link. Find the relevant Markdown page under [`content/`](https://github.com/forrtproject/forrtproject.github.io/tree/main/content), open it on GitHub, and choose the pencil icon. GitHub will guide you through creating a fork, committing the edit, and opening a pull request against `main`.

Preserve the YAML/TOML front matter at the top of the file and existing Hugo shortcodes. Describe the affected page and link to it in your PR. Generated paths include `content/curated_resources/` (except `_index.md`), `content/glossary/`, `content/contributors/tenzing.md`, `content/contributor-analysis/`, `content/publications/citation_chart.webp`, announcement bundles in `content/post/`, the citation block between `<!-- flora-citation-start -->` and `<!-- flora-citation-end -->` in `content/replication-hub/flora/_index.md`, `static/data/fred_citation.txt`, and generated files in `data/`. The remaining prose on the FLoRA page is hand-maintained. The manually maintained `data/publications.yaml` is editable; follow the [publication instructions](content/publications/README). Generated content is refreshed during deployment. Use the source submission form/sheet linked from the public page or open an issue rather than editing the generated output. Local previews use committed copies and can differ from production. For layout or code changes, use the local setup below.

To set a short note beside the text, put `{{% callout title="A title" %}}Your note{{% /callout %}}` just before the paragraph it goes with. On articles and most other text pages it sits in the right-hand column on wide screens, and in the text on phones and on pages set to full width. `title` is optional, and `tone="example"` or `tone="warning"` changes its colour. Keep it short: a long note runs on past the text it goes with.

### Linking glossary terms

On hand-written pages, use `{{< term "Preregistration" >}}` to link an English glossary term. To match an existing inflection, use `{{< term "Preregistration" "preregistered" >}}`. Preserve the author's exact wording and spelling; add markup only, and skip an occurrence if it cannot be marked without changing the text. Titles are matched without regard to case. Mark only the first occurrence of each term on a page, and keep existing resource links intact. Hover, keyboard focus, or a first touch tap shows a short definition; the popover links to the full entry. A repeat tap on the open trigger, mouse clicks, and Enter follow the term link, which also works without JavaScript. Unknown terms render as plain text and produce a Hugo build warning; check the [English glossary](https://forrt.org/glossary/english/) for the exact title. Do not add these shortcodes to generated content.

## Local Development Setup

Choose the setup method that suits your workflow.

### Standard Setup (Git + Hugo)

**Prerequisites**

- [Git](https://git-scm.com/downloads)
- [Hugo Extended](https://gohugo.io/getting-started/installing/) — any recent version works for local development; production and staging use 0.158.0, so try that version if your build differs from the live site
- A text editor of your choice — [Visual Studio Code](https://code.visualstudio.com/) is recommended.

**Steps**

1. Fork the repository on GitHub, keeping its name `forrtproject.github.io` so staging can fetch it, then clone your fork (replace `YOUR-USERNAME` with your GitHub username):

   ```bash
   git clone https://github.com/YOUR-USERNAME/forrtproject.github.io.git
   cd forrtproject.github.io
   git remote add upstream https://github.com/forrtproject/forrtproject.github.io.git
   ```

2. Start the development server:

   ```bash
   hugo server -D
   ```

   The `-D` flag includes draft pages. Open `http://localhost:1313` in your browser to preview the site.

---

### RStudio Setup

For R users who prefer to work entirely within RStudio.

**Prerequisites**

- [Git](https://git-scm.com/downloads)
- [Hugo Extended](https://gohugo.io/getting-started/installing/) — any recent version works for local development; production and staging use 0.158.0, so try that version if your build differs from the live site
- [R](https://cran.r-project.org/)
- [RStudio](https://www.rstudio.com/products/rstudio/download/)
- [blogdown](https://bookdown.org/yihui/blogdown/)
- [usethis](https://usethis.r-lib.org/) — recommended for PR management

**Steps**

1. In RStudio, go to **File → New Project → Version Control → Git**.
   - Fork the repository first; use your fork URL: `https://github.com/YOUR-USERNAME/forrtproject.github.io.git`
   - After cloning, run `git remote add upstream https://github.com/forrtproject/forrtproject.github.io.git` in the RStudio Terminal.
   - Project directory name: `FORRT`
   - Choose a location with **Browse**.
2. Run the site locally using the **blogdown Addins** in RStudio, or run `hugo server -D` in the RStudio terminal.
3. Use `usethis` to manage your Pull Request workflow from within R — it is the most accessible approach for R users:

   ```r
   usethis::pr_init("my-feature-branch")   # create a branch
   usethis::pr_push()                       # push and open a PR on GitHub
   usethis::pr_finish()                     # clean up after the PR is merged
   ```

   See the [usethis documentation](https://usethis.r-lib.org/index.html) for the full workflow.

> **Note:** RStudio is not designed for website development. For a smoother experience, consider the [Standard Setup](#standard-setup-git--hugo) instead.

---

## Contribution Workflow

For browser edits, GitHub handles branch creation and opening the PR; see [staging guidance](#how-staging-works) to request a preview.

All proposed changes must be made on a feature branch and submitted via a Pull Request to `main`. We do not use a separate development branch.

1. **Fork and clone** — fork the repository to your account and clone it locally (if you haven't already).

2. **Create a feature branch** from an up-to-date `main` (commit or stash any local work first):

   ```bash
   git fetch upstream
   git switch main
   git merge --ff-only upstream/main
   git switch -c fix-typo-contributing
   ```

3. **Make and test your changes** — run `hugo server -D` to preview the site locally. Check the affected page, links, and narrow-screen layout. Run `hugo --gc --minify --cleanDestinationDir --destination public` to check a production-style build; do not commit the generated `public/` output. Browser-only contributors can state that they could not run a local build and request a maintainer preview.

4. **Commit with a clear message** — describe what you changed and why:

   ```bash
   git commit -m "Fix broken link in contributing guide"
   ```

5. **Push and open a Pull Request** — push your branch and open a PR targeting the `main` branch of `forrtproject/forrtproject.github.io`. Use `git push -u origin fix-typo-contributing` (or your branch name). Link any related issues and briefly summarise your changes.

6. **Check the automated feedback** — a spell checker runs on every PR. On PRs from this repository it posts its results as a comment; on PRs from forks they appear in the workflow run summary under the **Checks** tab. Fix genuine typos; if a correct word is flagged (for example, a name or technical term), add it to [`.codespell-ignore.txt`](.codespell-ignore.txt).

For more on Git, see the [official documentation](https://docs.github.com/en/get-started/using-git/about-git).

### Citing references

Hand-written pages can cite works in [`content/glossary/apa_lookup.json`](content/glossary/apa_lookup.json), the shared bibliography generated from the Glossary BibTeX Google Doc. Use its exact keys:

```text
{{< cite "Nosek2018" "Simmons2011" >}}
{{< cite key="Nosek2018" narrative="true" >}}
(e.g. Smith, 2019; {{< cite key="Nosek2018" bare="true" >}})
```

These render as “(Nosek et al., 2018; Simmons et al., 2011)”, “Nosek et al. (2018)” and “(e.g. Smith, 2019; Nosek et al., 2018)”. Use `bare` inside brackets you write yourself, for example alongside a work that isn't in the bibliography, so the author's wording stays as it was. Every page that cites must include `{{< references >}}` once, after its last citation, to add an alphabetical reference list. The built-HTML check fails citation links without matching reference entries. Clicking a citation opens its full APA reference with source and copy actions; without JavaScript it jumps to the reference list. Unknown keys produce a build warning and appear in square brackets.

Do not edit the generated bibliography or glossary terms. Request additions to the Glossary BibTeX Doc through an issue; the bibliography generator supplies the APA text. Glossary definitions automatically link citations only when their first author and year identify exactly one of the term’s listed references and their author lists agree. Other citations stay plain text. Citations already linked to a source are left alone.

### Contributing with AI tools

Contributions co-authored with AI agents are welcome, but only if you have **fully reviewed both the code and the content** yourself and can stand behind them.

If a contribution amounts to running a single prompt, please consider posting the prompt or idea as an [issue](https://github.com/forrtproject/forrtproject.github.io/issues) instead. It is often faster for us to run it ourselves, with full knowledge of the project's coding conventions, than to review and integrate unverified, vibe-coded output.

### Content, Licensing & Fact-Checking

**Generated content:** `data/clusters_v4.json` and `content/clusters/cluster-N/index.md` are generated, so never edit them by hand. Correct the [Clusters v4.1 Google Doc](https://docs.google.com/document/d/1_TRh7z3Bv_tdxGqjdWMm4kfQerTYvYw3e4wvQLNpTDQ/edit), then run `python3 scripts/parse_clusters_to_sheet.py --json-only` and `python3 scripts/generate_cluster_pages.py`.

- Please **fact-check** anything you add and cite sources where relevant, so the site stays accurate and trustworthy.
- The repository is distributed under [CC BY-NC-SA 4.0](LICENSE.md). Make sure you have the right to contribute the material and retain attribution and source licence notices.
- Under the existing contribution policy, unless you tell us otherwise, contributions are assumed to be offered under [**CC BY 4.0**](https://creativecommons.org/licenses/by/4.0/).

---

## Deployment & Staging

The FORRT website uses a dual deployment strategy to ensure quality and enable collaborative review.

### Production

| Detail | Value |
|---|---|
| URL | [https://forrt.org](https://forrt.org) |
| Workflow | `.github/workflows/deploy.yaml` |
| Trigger | Push to `main` |
| Target | GitHub Pages (`gh-pages` branch) |

### Staging

| Detail | Value |
|---|---|
| URL | [https://staging.forrt.org](https://staging.forrt.org) |
| Workflow | `.github/workflows/staging-aggregate.yaml` |
| Trigger | Non-draft same-repository PR opened, updated, reopened or marked ready for review against `main`; 1st of each month; manual dispatch |
| Target | External repository (`forrtproject/webpage-staging`) |
| Purpose | Preview the combined state of all open, compatible PRs |

> Staging shows **aggregated** changes from all open PRs — not individual PR previews. Visit [https://staging.forrt.org](https://staging.forrt.org) to see the combined state. PRs with merge conflicts will not appear until those conflicts are resolved.

### How Staging Works

Automatic staging collects open, non-draft PRs targeting `main` and merges them in sequence onto a temporary branch. Automatic runs skip draft PRs, so mark your PR **Ready for review** when you want it previewed. Conflicting PRs are skipped and logged. Inclusion in staging does not mean a PR has passed review or been approved for merging. The workflow posts staging results to PRs and retains two recent staging branches.

**External forks cannot trigger their own staging deployment.** GitHub withholds repository secrets from fork-triggered runs, so those runs fail with an explanatory message instead of deploying. Fork PRs can still appear in the next aggregate build triggered by a same-repository PR or the monthly schedule. For an earlier preview, ask a maintainer in your PR. The maintainer runs **Actions → Staging Aggregate Deployment → Run workflow** from the upstream `main` branch and enters the PR number in `single_pr`. The workflow resolves the public fork automatically; the maintainer does not need to select the fork branch. This previews the selected PR rather than the full aggregate, and replaces the shared staging site until the next staging deployment.

### Monthly Reports

On the 1st of each month, an automated GitHub issue is created with:

- Total PRs processed
- Successfully merged PRs
- Skipped PR numbers (labelled as merge conflicts), when at least one attempted PR was included; the current report omits this list if all attempts fail
- Aggregate branch and deployment time

---

Thank you for contributing to FORRT and helping build a more open, reproducible, and inclusive research culture.
