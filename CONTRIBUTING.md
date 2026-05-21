# Contributing

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. Please read the relevant section before contributing — it makes things smoother for everyone. The community looks forward to your contributions. 🎉

> **Not ready to contribute code?** That's fine. You can still support FORRT by:
> - Starring the repository
> - Sharing FORRT on social media
> - Referencing FORRT in your project's readme
> - Mentioning FORRT at local meetups and to colleagues

## Table of Contents

- [I Have a Question](#i-have-a-question)
- [Legal Notice](#legal-notice)
- [Local Development Setup](#local-development-setup)
  - [Standard Setup (Git + Hugo)](#standard-setup-git--hugo)
  - [Dev Containers (VSCode)](#dev-containers-vscode)
  - [RStudio Setup](#rstudio-setup)
- [Contribution Workflow](#contribution-workflow)
- [Deployment & Staging](#deployment--staging)
  - [Production](#production)
  - [Staging](#staging)
  - [How Staging Works](#how-staging-works)
  - [Monthly Reports](#monthly-reports)

---

## I Have a Question

Before opening an issue, please:

1. Search existing [Issues](/issues) — your question may already be answered.
2. Join the FORRT Community on Slack [here](https://join.slack.com/t/forrt/shared_invite/zt-alobr3z7-NOR0mTBfD1vKXn9qlOKqaQ) and Ask.

If you still need help:

- Open a [new Issue](/issues/new).
- Provide as much context as you can about the problem.
- Include relevant versions (Hugo, OS, etc.).

We run on volunteer time, so please be patient — we'll get back to you as soon as we can.

---

## Legal Notice

When contributing to this project, you confirm that:

- You authored 100% of the content you are contributing.
- You have the necessary rights to that content.
- The content may be provided under the project's license.

---

## Local Development Setup

Choose the setup method that suits your workflow.

### Standard Setup (Git + Hugo)

**Prerequisites**

- [Git](https://git-scm.com/downloads)
- [Hugo](https://gohugo.io/getting-started/installing/)
- A text editor of your choice — [Visual Studio Code](https://code.visualstudio.com/) is recommended.

**Steps**

1. Clone the repository:

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

### Dev Containers (VSCode)

Run the project locally without installing Hugo on your host machine. Dev Containers use Docker to provide a consistent, reproducible environment.

**Prerequisites**

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/get-docker/)
  - Windows users: also install [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)
- [Visual Studio Code](https://code.visualstudio.com/) with the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension

**Steps**

1. Open `.devcontainer/devcontainer.json` in VSCode.
   - **Windows only:** open `.devcontainer\dev\devcontainer.json` and uncomment the line `"remoteUser": "root"` before continuing.
2. Open the Command Palette (`Ctrl+Shift+P`) and select **Dev Containers: Open Folder in Container**. Alternatively, click **Reopen in Container** in the pop-up that appears in the bottom-right corner.
3. Wait for the container to build. The bottom-left corner will show a green **Hugo Dev** badge when ready.
4. Start the server:

   ```bash
   hugo server -D
   ```

   The container forwards port 1313 to your host — open `http://localhost:1313` to preview the site.

---

### RStudio Setup

For R users who prefer to work entirely within RStudio.

**Prerequisites**

- [Git](https://git-scm.com/downloads)
- [Hugo](https://gohugo.io/getting-started/installing/)
- [R](https://cran.r-project.org/)
- [RStudio](https://www.rstudio.com/products/rstudio/download/)
- [blogdown](https://bookdown.org/yihui/blogdown/)

**Steps**

1. In RStudio, go to **File → New Project → Version Control → Git**.
   - Repository URL: `https://github.com/forrtproject/forrtproject.github.io.git`
   - Project directory name: `FORRT`
   - Choose a location with **Browse**.
2. Run the site locally using the **blogdown Addins** in RStudio, or run `hugo server -D` in the RStudio terminal.

> **Note:** RStudio is not designed for website development. For a smoother experience, consider the [Standard Setup](#standard-setup-git--hugo) or [Dev Containers](#dev-containers-vscode) instead.

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
