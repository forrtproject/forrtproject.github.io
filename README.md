# FORRT

[![Hugo CICD](https://github.com/forrtproject/forrtproject.github.io/actions/workflows/deploy.yaml/badge.svg?branch=master)](https://github.com/forrtproject/forrtproject.github.io/actions/workflows/deploy.yaml)
[![pages-build-deployment](https://github.com/forrtproject/forrtproject.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/forrtproject/forrtproject.github.io/actions/workflows/pages/pages-build-deployment)
[![Website](https://img.shields.io/website?down_color=red&down_message=offline&label=forrt.org&up_color=blue&up_message=online&url=https%3A%2F%2Fforrt.org%2F)](https://forrt.org)

This is repository for the website of **FORRT - the Framework for Open and Reproducible Research Training**.

## Welcome!

First and foremost, Welcome! 🎉 Willkommen! 🎊 Bienvenue! 

This document is a hub to give you some information about the FORRT project. The term ‘onboarding’ refers to the process of integrating new arrivals into the organization and its culture - where one can acquire the necessary knowledge, skills, and behaviors in order to become an effective organizational member.

### The problem

* Recently, the scientific community took steps to reflect a widespread awareness of, and call for, improved practices ushering in the “credibility revolution” including higher standards of evidence, preregistration, direct replication, transparency, and openness.
Structurally, three pillars were proposed to carry social sciences towards academic utopia:  opening scientific communication, restructuring incentives and practices, and collaborative and crowdsourced science. 
* However, ongoing attempts have neglected an essential aspect of the academic machinery: students. And indeed, current norms for the teaching and mentoring in higher-education are rooted in obsolete practices of bygone eras.

### The solution

* In our view, a scientific utopia has a fourth pillar, whose principal goal is to familiarize students, who are future consumers of science and perhaps themselves knowledge producers, with the intricacies of the process of science. 
* We believe the teaching and mentoring of reproducible and open research practices is the clearest indicator of the degree to which institutions and/or departments embody principles of credible science.
* This demonstration goes beyond paying lip service to best practices, and ensures that students are trained to engage in these practices wheresoever.

**FORRT** - *a framework for open and reproducible research training* - aims to provide a didactic and pedagogical infrastructure designed to recognize and support the teaching and mentoring of open and reproducible research in tandem with prototypical subject matters in higher education.

### What do we need?

**You!** (In whatever way you can help).

We need expertise in website construction, fundraising, proofing, user experience design, transferring knowledge across platforms, experts in pedagogy/didactics in higher education, database maintenance (for cataloguing and classifying resources), documentation, technical writing and project management.

We'd love your feedback along the way.
Our primary goal is to support teachers and mentors trying to bridge the gap between modern and current norms in higher education. And hopefully, making this rather new OS revolution sustainable by promoting the adoption of Open and Reproducible tenets to the teaching and mentoring of prototypical subject matters in higher education.

And while FORRT is aimed at concerned teachers and mentors, we're excited to plug another hole in the leaky pipeline by supporting the professional development of any and all of our contributors. If you're looking to learn to code, try out working collaboratively, get some experience writing grant applications or translate your skills to the digital domain, we're here to help.

### Get involved

If you think you can help in any of the areas listed above (and we bet you can) or in any of the many areas that we haven't yet thought of (and here we're sure you can!) then please check out our [contributors' guidelines](https://docs.google.com/document/d/1Yd1LrAd96MCfr01wIubEGz4iO92_Qr_OY2qWrle3Vro/edit?usp=sharing) and [join FORRT’s Slack](https://join.slack.com/t/forrt/shared_invite/zt-alobr3z7-NOR0mTBfD1vKXn9qlOKqaQ) with a message at FORRT telling how you think you can help: 

> “Hi everyone, I'm a ___ (i.e., professional status: grad student, postdoc, AP) in ____ (i.e., field of study) at ____(i.e., institution) and would be happy to help out with _____. Feel free to contact me.” 
 
There, we can direct you towards relevant documents and tasks. 

- But if you are interested in contributing to the **FORRT manuscript**, a google doc version can be found here: https://tinyurl.com/FORRTworkingDOC. 
- If you are interested in contributing to the **Website**, see specific instructions below, and please check out FORRT’s Github [to-do](https://github.com/forrtproject/forrt/projects/1) and [open issues](https://github.com/forrtproject/forrt). 

Please note that it's very important to us that we maintain a positive and supportive environment for everyone who wants to participate. When you join us we ask that you follow our code of conduct in all interactions both on and offline.

#### FORRT Website on Github

This is the website for the **Framework for Open and Reproducible Research Training (FORRT)**, built with [hugo](https://gohugo.io/), and deployed with [Github Actions](https://docs.github.com/en/actions). You can find the website at [forrt.org](https://forrt.org/). See CONTRIBUTING.md for more information on how to contribute.

## Deployment & Staging

The FORRT website uses a dual deployment strategy to ensure quality and enable collaborative testing:

### Production Deployment

- **URL**: [https://forrt.org](https://forrt.org)
- **Workflow**: `.github/workflows/deploy.yaml`
- **Trigger**: Pushes to `master` branch
- **Target**: GitHub Pages (`gh-pages` branch)
- **Purpose**: Serves the live, production website

### Staging Deployment

- **URL**: [https://staging.forrt.org](https://staging.forrt.org)
- **Workflow**: `.github/workflows/staging-aggregate.yaml`
- **Trigger**: Pull requests to `master`, monthly schedule (1st of each month), or manual dispatch
- **Target**: External repository (`forrtproject/webpage-staging`)
- **Purpose**: Preview combined changes from all open PRs
- **Note**: Staging always deploys aggregated changes from all open PRs. There is currently no option to deploy a single PR in isolation to staging.

#### How Staging Works

The staging deployment uses an **aggregation strategy** to provide a unified preview environment:

1. **Automatic Aggregation**: When any PR is opened, synchronized, or reopened, the workflow:
   - Collects all open, non-draft PRs targeting `master`
   - Creates a temporary aggregation branch from `master`
   - Attempts to merge each PR in sequence
   
2. **Conflict Handling**: 
   - PRs that merge cleanly are included in the staging build
   - PRs with merge conflicts are skipped but logged
   - The deployment continues with all compatible PRs
   
3. **Deployment Comments**: Each PR receives an automated comment indicating:
   - ✅ Successfully deployed (for PRs without conflicts)
   - ⚠️ Skipped due to conflicts (for conflicting PRs)
   - Deployment timestamp and staging URL
   
4. **Queuing & Timeouts**:
   - Workflow uses concurrency control to queue builds (not cancel)
   - Job timeouts (10-20 minutes) prevent indefinite blocking
   - Draft PRs are filtered out to avoid unnecessary builds

5. **Branch Cleanup**: 
   - Keeps only the 5 most recent staging branches
   - Automatically cleans up older staging-aggregate branches

#### Viewing Staging Changes

- Visit [https://staging.forrt.org](https://staging.forrt.org) to see the combined state of all open, compatible PRs
- Note: Staging shows aggregated changes from **all** open PRs, not individual PR changes
- PRs with merge conflicts won't appear in staging until conflicts are resolved

#### Manual Single-PR Deployment

**Currently Not Supported for Staging**: There is no option to deploy a single PR in isolation to the staging environment. All staging deployments include all compatible open PRs.

**Workaround for Testing Individual PRs**:
- The `deploy.yaml` workflow supports manual dispatch with a `pr_number` input
- However, this deploys directly to **production** (forrt.org), not staging
- Use with extreme caution - only for emergency fixes or when you're certain the changes are ready for production
- For regular PR testing, rely on the aggregated staging deployment or test locally

#### Monthly Reports

On the 1st of each month, an automated deployment report is created as a GitHub issue with:
- Total PRs processed
- Successfully merged PRs
- Skipped PRs (with conflict information)
- Deployment statistics

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
