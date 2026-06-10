# Contributing

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. Please read the relevant section before contributing — it makes things smoother for everyone. The community looks forward to your contributions. 🎉

You can support FORRT by:
> - Starring the repository
> - Sharing FORRT on social media
> - Referencing FORRT in your project's readme
> - Mentioning FORRT at local meetups and to colleagues

## Table of Contents

- [Questions, Ideas & Suggestions](#questions-ideas--suggestions)
- [Local Development Setup](#local-development-setup)
  - [Standard Setup](#standard-setup-git--hugo)
  - [RStudio Setup](#rstudio-setup)
- [Contribution Workflow](#contribution-workflow)
  - [Contributing with AI tools](#contributing-with-ai-tools)
  - [Content, Licensing & Fact-Checking](#content-licensing--fact-checking)
- [Deployment & Staging](#deployment--staging)
  - [Production](#production)
  - [Staging](#staging)
  - [How Staging Works](#how-staging-works)
  - [Monthly Reports](#monthly-reports)

---

## Questions, Ideas & Suggestions

Issues are the best place to raise a question, suggest an improvement, or propose a new resource. Conversations on Slack tend to get lost, whereas an issue stays visible and is easy for someone to pick up later.

- Have a quick look through the existing [Issues](https://github.com/forrtproject/forrtproject.github.io/issues) in case the same idea is already being discussed.
- Otherwise, [open a new Issue](https://github.com/forrtproject/forrtproject.github.io/issues/new) and go for it — a question, a rough idea, or a fully worked-out proposal are all welcome. Share whatever context is helpful.

FORRT is maintained by volunteers, so response times may vary. We appreciate your patience and your contribution.

---

## Local Development Setup

Choose the setup method that suits your workflow.

### Standard Setup (Git + Hugo)

**Prerequisites**

- [Git](https://git-scm.com/downloads)
- [Hugo](https://gohugo.io/getting-started/installing/)
- A text editor of your choice — [Visual Studio Code](https://code.visualstudio.com/) is recommended.

**Steps**

1. Fork and Clone the repository:

   ```bash
   git clone https://github.com/forrtproject/forrtproject.github.io.git
   cd forrtproject.github.io
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
- [Hugo](https://gohugo.io/getting-started/installing/)
- [R](https://cran.r-project.org/)
- [RStudio](https://www.rstudio.com/products/rstudio/download/)
- [blogdown](https://bookdown.org/yihui/blogdown/)
- [usethis](https://usethis.r-lib.org/) — recommended for PR management

**Steps**

1. In RStudio, go to **File → New Project → Version Control → Git**.
   - Repository URL: `https://github.com/forrtproject/forrtproject.github.io.git`
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

All proposed changes must be made on a feature branch and submitted via a Pull Request to `main`. We do not use a separate development branch.

1. **Fork and clone** — fork the repository to your account and clone it locally (if you haven't already).

2. **Create a feature branch** — use a short, descriptive name:

   ```bash
   git checkout -b fix-typo-contributing
   # or
   git checkout -b add-new-resource-page
   ```

3. **Make and test your changes** — run `hugo server -D` to preview the site locally and verify no errors appear.

4. **Commit with a clear message** — describe what you changed and why:

   ```bash
   git commit -m "Fix broken link in contributing guide"
   ```

5. **Push and open a Pull Request** — push your branch and open a PR targeting the `main` branch of `forrtproject/forrtproject.github.io`. Link any related issues and briefly summarise your changes.

For more on Git, see the [official documentation](https://docs.github.com/en/get-started/using-git/about-git).

### Contributing with AI tools

Contributions co-authored with AI agents are welcome — but only if you have **fully reviewed both the code and the content** yourself and can stand behind them.

If a contribution amounts to running a single prompt, please consider posting the prompt or idea as an [issue](https://github.com/forrtproject/forrtproject.github.io/issues) instead. It is often faster for us to run it ourselves — with full knowledge of the project's coding conventions — than to review and integrate unverified, vibe-coded output.

### Content, Licensing & Fact-Checking

- You don't need to be the sole author of a contribution. Collaboratively written text and openly licensed resources are welcome, as long as you have the right to share the content.
- Please **fact-check** anything you add and cite sources where relevant, so the site stays accurate and trustworthy.
- Unless you tell us otherwise, contributions are assumed to be offered under [**CC BY 4.0**](https://creativecommons.org/licenses/by/4.0/). Note that the site as a whole is published under [CC BY-NC-SA 4.0](LICENSE.md).

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
| Trigger | PR opened/updated against `main`; 1st of each month; manual dispatch |
| Target | External repository (`forrtproject/webpage-staging`) |
| Purpose | Preview the combined state of all open, compatible PRs |

> Staging shows **aggregated** changes from all open PRs — not individual PR previews. Visit [https://staging.forrt.org](https://staging.forrt.org) to see the combined state. PRs with merge conflicts will not appear until those conflicts are resolved.

### How Staging Works

When a PR is opened, synchronised, or reopened, the staging workflow:

1. **Aggregates open PRs** — collects all non-draft PRs targeting `main` and merges them in sequence onto a temporary branch.
2. **Handles conflicts gracefully** — PRs that merge cleanly are included; conflicting PRs are skipped and logged.
3. **Posts a deployment comment** on each PR:
   - ✅ Successfully included in staging
   - ⚠️ Skipped due to merge conflicts
4. **Manages concurrency** — builds are queued (not cancelled) with job timeouts of 10–20 minutes.
5. **Cleans up old branches** — keeps only the 5 most recent staging branches.

### Monthly Reports

On the 1st of each month, an automated GitHub issue is created with:

- Total PRs processed
- Successfully merged PRs
- Skipped PRs (with conflict details)
- Deployment statistics

---

Thank you for contributing to FORRT and helping build a more open, reproducible, and inclusive research culture.
