# FORRT GitHub Workflows

This document describes the GitHub Actions workflows used in the FORRT website repository.

## Workflow Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ data-processing │────▶│     deploy      │────▶│    gh-pages     │
│   (daily)       │     │  (production)   │     │   (forrt.org)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              ▲
                              │ (main push)
                              │
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Pull Request  │────▶│staging-aggregate│────▶│  staging.forrt  │
│                 │     │   (staging)     │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Deployment Workflows

### [deploy.yaml](deploy.yaml)
**Production deployment to forrt.org**

| Trigger | Target | Schedule |
|---------|--------|----------|
| Push to `main` | forrt.org | On push |
| Manual dispatch | forrt.org | Manual |
| Data update event | forrt.org | Triggered by data-processing |

Builds the Hugo site and deploys to GitHub Pages (`gh-pages` branch).

### [staging-aggregate.yaml](staging-aggregate.yaml)
**Staging deployment for pull requests**

| Trigger | Target | Schedule |
|---------|--------|----------|
| PR to `main` | staging.forrt.org | On PR events |
| Monthly schedule | staging.forrt.org | 1st of month |
| Manual dispatch | staging.forrt.org | Manual |

Features:
- Aggregates all open PRs and builds Hugo in the same checkout
- Fetches full commit history only for `main` and selected PR refs, with file contents fetched on demand; Git-derived page dates remain available
- `single_pr` option to deploy only one PR
- Queues builds instead of canceling (concurrency)
- Auto-cleans old staging branches (keeps 2)

### [rebrand-preview.yaml](rebrand-preview.yaml)
**Preview of the Doors redesign, while it is in progress**

| Trigger | Target | Schedule |
|---------|--------|----------|
| Push to `rebrand-doors` | forrt.org/rebrand-doors/ (`forrtproject/rebrand-doors`) | On push |
| PR into `rebrand-doors` | Checks only, no deployment | On PR events |

Features:
- Uses the same data and announcement artifacts as `deploy.yaml`, with noindex and no analytics
- Compares each build with its merge base with `main`: URL list, structured data, SEO tags and internal links. See `scripts/rebrand/README.md`
- A failed check marks the run red but still updates the preview
- Delete this workflow when the redesign launches

## Data Workflows

### [data-processing.yml](data-processing.yml)
**Fetches and processes external data sources**

| Trigger | Schedule |
|---------|----------|
| Daily | Midnight UTC |
| Manual dispatch | Manual |

Processes:
- Curated resources
- Google Analytics data
- Contributor analysis (monthly)

**Failure Reporting:**
- Automatically creates GitHub issues when critical data processing steps fail
- Each issue includes:
  - Failed step name
  - Error details
  - Workflow run URL for debugging
  - Automated labels: `bug`, `data-processing`, `automated`
- Monitored steps include: Contributor Analysis, Curated Resources, GA Data, FReD Citation, Google Scholar, and more

Triggers `deploy.yaml` after successful processing via `repository_dispatch`.

## Quality Checks

### [spell-check.yaml](spell-check.yaml)
**Spelling validation using codespell**

| Trigger | Runs on |
|---------|---------|
| Pull requests | PR branches |



### [check_images.yaml](check_images.yaml)
**Image validation in PRs**

| Trigger | Runs on |
|---------|---------|
| Pull requests | PR branches |

Validates image files and references.

## Repository Maintenance

### [cleanup-branches.yml](cleanup-branches.yml)
**Automated branch cleanup**

| Trigger | Schedule |
|---------|----------|
| Weekly | Sundays at midnight UTC |
| Manual dispatch | Manual |

Cleans up:
| Type | Action |
|------|--------|
| `ga-data-update-*` | Keep 1 most recent |
| `staging-aggregate-*` | Keep 2 most recent |
| Merged branches | Delete all |
| Stale (1+ month, no PR) | Delete |

Protected branches (never deleted): `main`, `gh-pages`

> Note: `staging-aggregate-*` branches are auto-generated and cleaned up separately (keeping 2 most recent).

## Disabled Workflows

| File | Status | Reason |
|------|--------|--------|
| `reminder-check.yml_OLD` | Disabled | Not used, too many action runs |
| `reminder-create.yml_OLD` | Disabled | Not used, too many action runs |
| `mark-stale.yml_OLD` | Disabled | Not in use, can be restored with better rules |
| `labeler.yaml_OLD` | Disabled | Not in use, can be restored with better rules |
| `link-check.yaml_OLD` | Disabled | Broken, can be restored if fixed. |

## Manual Triggers

All workflows support `workflow_dispatch` for manual execution via GitHub Actions UI.

### Common Options

| Workflow | Option | Description |
|----------|--------|-------------|
| `cleanup-branches` | `dry_run` | Preview deletions without executing |
| `staging-aggregate` | `force_deploy` | Deploy even with no PRs |
| `staging-aggregate` | `single_pr` | Deploy only specified PR number |
| `data-processing` | `skip_deploy` | Skip triggering production deploy |
