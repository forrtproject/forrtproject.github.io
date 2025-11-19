---
title: "COUPÉ: Why You Should Add a Specification Curve Analysis to Your Replications – and All Your Papers!"
date: 2024-05-09
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Garden of Forking Paths"
  - "Many analyst projects"
  - "Specification curve analysis"
  - "War and happiness"
draft: false
type: blog
---

When making a conclusion based on a regression, we typically need to assume that the specification we use is the ‘correct’ specification. That is, we include the right control variables, use the right estimation technique, apply the right standard errors, etc. Unfortunately, most of the time theory doesn’t provide us with much guidance about what is the correct specification. To address such ‘model uncertainty’, many papers include robustness checks that show that conclusions remain the same whatever changes one makes to the main specification.

While when reading published papers, it’s rare to see specifications that do not support the main conclusions of a paper, many people who analyse data themselves quickly realize regression results often are much more fragile than what the published literature seems to suggest. For some, this even might lead to existential questions like “Why do I never get clean results, while everybody else does?”.

The recent literature based on ***[‘many-analyst’ projects](https://www.iza.org/publications/dp/13233/the-influence-of-hidden-researcher-decisions-in-applied-microeconomics)*** confirms however that when different researchers are given the same research question and the same dataset, they often will come to different conclusions. Sometimes you can even observe such many-analyst project in real life: ***[in a recent paper](https://dataisdifficult.github.io/PAPERLongTermImpactofWaronLifeSatisfaction.html)***, my co-authors and I replicate several published papers that all use data from the same “Life in Transition Survey’ to estimate the long-term impact of war on life satisfaction. But while one paper concludes that there is a positive and significant effect, another concludes that there is a negative and significant effect, while a third one concludes there is no significant effect.

Interestingly, we can replicate the findings of these three papers so these differing findings cannot be explained by coding errors. Instead, it’s how these authors choose to specify their model that drove these differing results.

To illustrate the impact of specification choices on outcomes we use the [s](https://github.com/masurp/specr)***[pecr R-package](https://github.com/masurp/specr)***.  To use specr, you indicate what are reasonable choices for your dependent variable, for your independent variable of interest, for your control variables, for your estimation model and for your sample restrictions.  The general format is given below.

[![](/replication-network-blog/image-2.webp)](https://replicationnetwork.com/wp-content/uploads/2024/05/image-2.webp)

After specifying this snippet of code, specr will run all possible combinations and present them in two easy-to-understand graphs. For example, in our paper, we used 2 dependent variables (life satisfaction on a scale from 1-10 and life satisfaction on a scale from 1 to 5),  one main variable of interest (injured or having relatives injured or killed during World War II), 5 models (based on how fixed effects and clusters were defined in 5 different published papers), 8 sets of controls (basic controls, additional war variables, income variables, other additional controls, etc.) and 4 datasets (the full dataset, respondents under 65 years old, those living in countries heavily affected by World War II, and under 65s living in heavily affected countries). This gave a total of 320 regression specifications.

The first graph produced by specr plots the specification curve, a curve showing all estimates of impact of the variable-of-interest on the outcome, and the standard errors, ordered from smallest to largest, giving an idea of the extent to which model uncertainty affects outcomes.

[![](/replication-network-blog/image-1.webp)](https://replicationnetwork.com/wp-content/uploads/2024/05/image-1.webp)

In the case of our paper, the specification curve showed a wide range of estimates of the impact of experiencing war on life satisfaction (from -0.5 to +0.25 on a scale of 1 to 5/10), with negative estimates often being significant (significant estimates are in red, grey is insignificant).

The second graph shows estimates by each specification-choice, illustrating what drives the heterogeneity in outcomes. In the case of our paper, we found that from the moment we controlled for a measure of income the estimate of war on life satisfaction became less negative and insignificant!

[![](/replication-network-blog/image-3.webp)](https://replicationnetwork.com/wp-content/uploads/2024/05/image-3.webp)

Given the potential importance of choices the researchers make on outcomes, it makes sense, when replicating a paper, to not just exactly replicating the authors specifications. Robustness checks in papers typically check how changing the specification in one dimension affects the outcome. A specification curve, however, allows to illustrate what happens if we look at all possible combinations of the robustness checks done in a paper.  Moreover, programs like specr allow to easily check what happens if one adds other variables, include fixed effects or clusters at different level of aggregation, or restricts the sample in this or that way. In other words, you can illustrate the effects of model uncertainty in a much more comprehensive way than is typically done in a paper.

And why restrict this to replication papers only? Why not add a comprehensive specification curve to all your papers, showing the true extent of robustness in your own analysis too? In the process, you will perform a great service to many researchers, showing that they are not the only one getting estimates that are all over the place; and help science, by providing a more accurate picture of how sure we can be about what we know and what we do not know.

*Tom Coupé is a Professor of Economics at the University of Canterbury, New Zealand. He can be contacted at tom.coupe@canterbury.ac.nz*.

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2024/05/09/coupe-why-you-should-add-a-specification-curve-analysis-to-your-replications-and-all-your-papers/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2024/05/09/coupe-why-you-should-add-a-specification-curve-analysis-to-your-replications-and-all-your-papers/?share=facebook)

Like Loading...