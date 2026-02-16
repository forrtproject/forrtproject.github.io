# FORRT GitHub Workflows

This document describes the GitHub Actions workflows used in the FORRT website repository.

## Workflow Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ data-processing │────▶│     deploy      │────▶│    gh-pages     │
│   (daily)       │     │  (production)   │     │   (forrt.org)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              ▲
                              │ (master push)
                              │
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Pull Request  │────▶│staging-aggregate│────▶│  staging.forrt  │
│                 │     │   (staging)     │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Deployment Workflows

### [deploy.yaml](workflows/deploy.yaml)
**Production deployment to forrt.org**

| Trigger | Target | Schedule |
|---------|--------|----------|
| Push to `master` | forrt.org | On push |
| Manual dispatch | forrt.org | Manual |
| Data update event | forrt.org | Triggered by data-processing |

Builds the Hugo site and deploys to GitHub Pages (`gh-pages` branch).

### [staging-aggregate.yaml](workflows/staging-aggregate.yaml)
**Staging deployment for pull requests**

| Trigger | Target | Schedule |
|---------|--------|----------|
| PR to `master` | staging.forrt.org | On PR events |
| Monthly schedule | staging.forrt.org | 1st of month |
| Manual dispatch | staging.forrt.org | Manual |

Features:
- Aggregates all open PRs into a single staging build
- `single_pr` option to deploy only one PR
- Queues builds instead of canceling (concurrency)
- Auto-cleans old staging branches (keeps 2)

## Data Workflows

### [data-processing.yml](workflows/data-processing.yml)
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

### [spell-check.yaml](workflows/spell-check.yaml)
**Spelling validation using codespell**

| Trigger | Runs on |
|---------|---------|
| Pull requests | PR branches |



### [check_images.yaml](workflows/check_images.yaml)
**Image validation in PRs**

| Trigger | Runs on |
|---------|---------|
| Pull requests | PR branches |

Validates image files and references.

## Repository Maintenance

### [cleanup-branches.yml](workflows/cleanup-branches.yml)
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

Protected branches (never deleted): `master`, `gh-pages`

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
