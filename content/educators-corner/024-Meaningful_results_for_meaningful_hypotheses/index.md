---
title: "Meaningful results for meaningful hypotheses"
subtitle: "A tutorial on hypothesis testing with Bayes factors using ROPEs"
summary: "Recent times have seen an increase of interest in Bayesian inference across the behavioral sciences. However, the process of testing hypotheses is often conceptually challenging or computationally costly. This tutorial provides an accessible, non-technical introduction to a technique that is both conceptually easy to understand and computationally cheap, and that also covers many common scenarios in the experimental sciences: Quantifying the relative evidence for a pair of interval-based hypotheses using Bayes factors through the Savage Dickey approximation."
authors: ['Timo B. Roettger','Michael Franke']
tags: []
categories: []
date: 2026-02-16T00:00:00-03:00
lastmod: 2026-02-16T00:00:00-03:00
featured: true
draft: false

# Featured image
# To use, add an image named `featured.webp/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: "Meaningful results for meaningful hypotheses"
  focal_point: "Center"
  preview_only: true

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---
![Meaningful results for meaningful hypotheses](./meaningful_r_for_m_hypotheses.webp)

## How to decide if an effect is meaningful in Bayesian inference?

After years of null hypothesis significance testing (NHST), you might have finally made the switch to Bayesian inference. You set priors, run the models you want to run, and estimate posterior distributions. Great. But what now? When writing up their Bayesian results, people often wonder how to decide on whether the results are meaningful or not. We have been there ourselves. 

Nowadays, more and more researchers move away from NHST toward Bayesian inference and are faced with the same conceptual hurdle because decision procedures are not an inherent part of the Bayesian workflow. There are several approaches to hypothesis testing within the Bayesian framework, of course. Unfortunately, many of them, such as various forms of calculating the Bayes Factor, are either conceptually challenging, computationally (too) costly, or both.

### A computationally feasible and intuitive way

In our [new tutorial](https://osf.io/preprints/psyarxiv/6zsx3_v2), we walk you through a lesser known form of Bayes Factor calculation using the Savage-Dickey approximation. This form of inference is not only conceptually intuitive and computationally slim, but it also allows us to tackle another conceptual issue with traditional hypothesis testing: Researchers coming from NHST tend to test whether differences between conditions are smaller or greater than exactly zero (i.e. testing point-0 hypotheses). But not every difference that is not zero is meaningful for either theoretical or practical purposes. In our tutorial, we use a data set on pitch perception by Korean speakers in formal and informal contexts. The researchers want to know if speakers use meaningfully higher or lower pitch in these two social contexts.

To test this hypothesis, we suggest the following workflow: 

1. We define the smallest effect size of interest (SESOI, see [Lakens 2017](https://doi.org/10.1177/1948550617697177) ) and implement it as a region of practical equivalence (ROPE, see [Kruschke 2018](https://journals.sagepub.com/doi/10.1177/2515245918771304) ). Defining a SESOI is not easy and requires a good quantitative understanding of the phenomena that we are dealing with. In our example, we define the ROPE in terms of the acoustic differences that lead to a certain accuracy performance in a forced-choice perception task (the so-called just-noticeable-difference, JND). The simplified idea is that if you cannot reliably hear a certain acoustic difference, then the difference should not matter for communication. 

2. For the difference between contexts, we quantify the proportion of posterior samples inside of the ROPE (i.e. the posteriors are practically equivalent to 0, so the effect is not meaningful) relative to the proportion of posteriors outside of the ROPE (i.e. the posteriors represent meaningful differences). We do this for both the posterior distributions before observing the data (i.e., priors only) and after observing the data (i.e., priors combined with the likelihood).

3. By relating these probabilities to each other, we can calculate how the evidence for a meaningful difference shifts when observing the data. This shift is the Bayes Factor, that lets us quantify evidence for and against a meaningful pitch difference between contexts.

The proposed workflow is not new ([Dickey & Lientz 1970, Wagenmakers et al. 2010](https://www.jstor.org/stable/2239734) ), but unfortunately not well known across the behavioral sciences. This computationally lightweight inferential decision procedure is conceptually intuitive and encourages us to critically reflect on what it means for an effect to be truly meaningful. Win-win.

### Where to start if you are new to Bayesian inference?

Our tutorial is basically a long awaited 2nd sequel (!?) of [Bodo Winter](https://www.bodo-winter.net/)'s original [introduction to linear mixed effects models](https://bodo-winter.net/tutorials.html) from 2013. This tutorial was widely shared and cited because it was one of the first very accessible introductions to linear mixed effects models within NHST. Six years later, we wrote a [sequel](https://osf.io/preprints/psyarxiv/cdxv3_v1) that used the original example problem and demonstrated how to implement it into a Bayesian workflow. Now, another 6 years later, we thought it was time to drop Part 3, sticking to the same phenomenon and data set as the original, finally bringing the trilogy to a “meaningful” conclusion.


## Contact information

<div style="display: flex; flex-wrap: wrap; gap: 2rem;">
  <div style="flex: 1; min-width: 250px;">
    <strong>Timo B. Roettger</strong><br>
    Email: <a href="mailto:timo.roettger@iln.uio.no">timo.roettger@iln.uio.no</a><br>
    Bluesky: <a href="https://bsky.app/profile/timoroettger.bsky.social">@timoroettger.bsky.social</a><br>
    LinkedIn: <a href="https://www.linkedin.com/in/timo-b-roettger/">linkedin.com/in/timo-b-roettger/</a><br>
    Website: <a href="https://timo-b-roettger.github.io/">timo-b-roettger.github.io</a><br>
    <br>
    <img src="./Timo_B_Roettger.webp" alt="Timo B. Roettger" style="max-width: 100%; height: auto; border-radius: 8px;">
  </div>

  <div style="flex: 1; min-width: 250px;">
    <strong>Michael Franke</strong><br>
    Email: <a href="mailto:mchfranke@gmail.com">mchfranke@gmail.com</a><br>
    Bluesky: <a href="https://bsky.app/profile/meanwhileina.bsky.social">@meanwhileina.bsky.social</a><br>
    Website: <a href="https://michael-franke.github.io/heimseite/">michael-franke.github.io/heimseite/</a><br>
    <br>
    <img src="./Michael_Franke.webp" alt="Michael Franke" style="max-width: 100%; height: auto; border-radius: 8px;">
  </div>
</div>
