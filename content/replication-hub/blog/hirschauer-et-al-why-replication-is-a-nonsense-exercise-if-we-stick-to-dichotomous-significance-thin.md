---
title: "HIRSCHAUER et al.: Why replication is a nonsense exercise if we stick to dichotomous significance thinking and neglect the p-value’s sample-to-sample variability"
date: 2018-10-15
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Expost Power"
  - "p-values"
  - "Post-hoc Power"
  - "Power"
  - "replications"
  - "Reproducibility"
  - "significance testing"
draft: false
type: blog
---

###### *[This blog is based on the paper “**[Pitfalls of significance testing and p-value variability: An econometrics perspective](https://projecteuclid.org/euclid.ssu/1538618436)**” by Norbert Hirschauer, Sven Grüner, Oliver Mußhoff, and Claudia Becker, Statistics Surveys 12(2018): 136-172.]*

###### Replication studies are often regarded as *the* means to scrutinize scientific claims of prior studies. They are also at the origin of the scientific debate on what has been labeled “replication crisis.” The fact that the results of many studies cannot be “replicated” in subsequent investigations is seen as casting serious doubts on the quality of empirical research. Unfortunately, the interpretation of replication studies is itself plagued by two intimately linked problems: first, the conceptual background of different types of replication often remains unclear. Second, inductive inference often follows the rationale of conventional significance testing with its misleading dichotomization of results as being either “significant” (positive) or “not significant” (negative). A poor understanding of inductive inference, in general, and the *p*-value, in particular, will cause inferential errors in all studies, be they initial ones or replication studies.

###### Amalgamating taxonomic proposals from various sources, we believe that it is useful to distinguish three types of replication studies:

###### **1. Pure replication** is the most trivial of all replication exercises. It denotes a subsequent “study” that is limited to verifying computational correctness. It therefore uses the *same data (sample)* and the *same statistical model* as the initial study.

###### **2. Statistical replication** (or reproduction) applies the *same statistical model* as used in the initial study to *another random sample* of the *same population*. It is concerned with the random sampling error and statistical inference (generalization from a random sample to its population). Statistical replication is the very concept upon which frequentist statistics and therefore the *p*-value are based.

###### **3. Scientific replication** comprises two types of robustness checks: (i) The first one uses a *different statistical model* to reanalyze the *same sample* as the initial study (and sometimes also *another random sample* of the *same* *population*). (ii) The other one extends the perspective beyond the initial population and uses the *same statistical model* for analyzing a *sample* from a *different population*.

###### **Statistical replication** is probably the most immediate and most frequent association evoked by the term “replication crisis.” It is also the focus of this blog in which we illustrate that re-finding or not re-finding “statistical significance” in statistical replication studies does not tell us whether we fail to replicate a prior scientific claim or not.

###### In the wake of the 2016 ASA-statement on *p*-values, many economists realized that *p*-values and dichotomous significance declarations do not provide a clear rationale for statistical inference. Nonetheless, many economists seem still to be reluctant to renounce dichotomous yes/no interpretations; and even those who realize that the *p*-value is but a graded measure of the strength of evidence against the null are often not fully aware that an informed inferential interpretation of the *p*-value requires considering its sample-to-sample variability.

###### We use two simulations to illustrate how misleading it is to neglect the *p*-value’s sample-to-sample variability and to evaluate replication results based on the positive/negative dichotomy. In each simulation, we generated 10,000 random samples (statistical replications) based on the linear “reality” *y =* 1 + *βx + e*, with *β =* 0.2. The two realities differ in their error terms: *e~N*(0;3), and *e~N*(0;5). Sample size is *n =* 50, with *x* varying from 0.5 to 25 in equal steps of 0.5. For both the *σ* = 3 and *σ* = 5 cases, we ran OLS-regressions for each of the 10,000 replications, which we then ordered from the smallest to the largest *p*-value.

###### Table 1 shows selected *p*-values and their cumulative distribution *F(p)* together with the associated coefficient estimates b and standard error estimates s.e. (and their corresponding *Z* scores under the null).The last column displays the power estimates based on the naïve assumption that the coefficient *b* and the standard error s.e. that we happened to estimate in the respective sample were true.

###### Table 1: *p*-values and associated coefficients and power estimates for five out of 10,000 samples (*n =* 50 each)†

###### Capture

###### Our simulations illustrate one of the most essential features of statistical estimation procedures, namely that our best unbiased estimators estimate correctly *on average*. We would therefore need *all* estimates from frequent replications – *irrespective* of their *p*-values and their being large or small – to obtain a good idea of the population effect size. While this fact should be generally known, it seems that many researchers, cajoled by statistical significance language, have lost sight of it. Unfortunately, this cognitive blindness does not seem to stop short of those who, insinuating that replication implies a reproduction of statistical significance, lament that many scientific findings cannot be replicated. Rather, one should realize that each well-done replication adds an additional piece of knowledge. The very dichotomy of the question whether a finding *can be* *replicated* or *not*, is therefore grossly misleading.

###### Contradicting many neat, plausible, and wrong conventional beliefs, the following messages can be learned from our simulation-based statistical replication exercise:

###### 1. While conventional notation abstains from advertising that the *p*-value is but a summary statistic of a noisy random sample, the *p*-value’s variability over statistical replications can be of considerable magnitude. This is paralleled by the variability of estimated coefficients. We may easily find a large coefficient in one random sample and a small one in another.

###### 2. Besides a single study’s *p*-value, its variability –and, in dichotomous significance testing, the statistical power (i.e., the zeroth order lower partial moment of the *p*-value distribution at 0.05) – determines the repeatability in statistical replication studies. One needs an assumption regarding the true effect size to assess the *p*-value’s variability. Unfortunately, economists often lack information regarding the effect size prior to their own study.

###### 3. If we rashly claimed a coefficient estimated in a single study to be true, we would not have to be surprised at all if it cannot be “replicated” in terms of re-finding statistical significance. For example, if an effect size and standard error estimate associated with a *p*-value of 0.05 were real, we would *necessarily* have a mere 50% probability (statistical power) of finding a statistically significant effect in replications in a one-sided test.

###### 4. Low *p*-values do not indicate results that are more trustworthy than others. Under reasonable sample sizes and population effect sizes, it is the *abnormally* large sample effect sizes that produce “highly significant” *p*-values. Consequently, even in the case of a highly significant result, we cannot make a direct inference regarding the true effect. And by averaging over “significant” replications only, we would necessarily overestimate the effect size because we would right-truncate the distribution of the *p*-value which, in turn, implies a left-truncation of the distribution of the coefficient over replications.

###### 5. In a single study, we have no way of identifying the *p*-value below which (above which) we overestimate (underestimate) the effect size. In the *σ* = 3 case, a *p*-value of 0.001 was associated with a coefficient estimate of 0.174 (underestimation). In the *σ* = 5 case, it was linked to a coefficient estimate of 0.304 (overestimation).

###### 6. Assessing the replicability (trustworthiness) of a finding by contrasting the tallies of “positive” and “negative” results in replication studies has long been deplored as a serious fallacy (“vote counting”) in meta-analysis. Proper meta-analysis shows that finding non-significant but same-sign effects in a large number of replication studies may represent overwhelming evidence for an effect. Immediate intuition for this is provided when looking at confidence intervals instead of *p*-values. Nonetheless, vote counting seems frequently to cause biased perceptions of what is a “replication failure.”

###### *Prof. **[Norbert Hirschauer](https://www.landw.uni-halle.de/prof/lu/?lang=en)**, Dr. **[Sven Grüner](https://www.landw.uni-halle.de/prof/lu/mitarbeiter___doktoranden/gruener/)**, and Prof. **[Oliver Mußhoff](https://www.uni-goettingen.de/en/66131.html)** are agricultural economists in Halle (Saale) and Göttingen, Germany. Prof. **[Claudia Becker](https://statistik.wiwi.uni-halle.de/personal/?lang=en)** is an economic statistician in Halle (Saale). The authors are interested in connecting with economists who have an interest to further concrete steps that help prevent inferential errors associated with conventional significance declaration in econometric studies. Correspondence regarding this blog should be directed to Prof. Hischauer at norbert.hirschauer@landw.uni-halle.de.*

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2018/10/15/hirschauer-et-al-why-replication-is-a-nonsense-exercise-if-we-stick-to-dichotomous-significance-thinking-and-neglect-the-p-values-sample-to-sample-variability/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2018/10/15/hirschauer-et-al-why-replication-is-a-nonsense-exercise-if-we-stick-to-dichotomous-significance-thinking-and-neglect-the-p-values-sample-to-sample-variability/?share=facebook)

Like Loading...