---
title: "DUAN & REED: How Are Meta-Analyses Different Across Disciplines?"
date: 2021-05-18
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Disciplines"
  - "Effect size"
  - "Estimation"
  - "Fixed Effects"
  - "Journals"
  - "Meta-analysis"
  - "Random Effects"
draft: false
type: blog
---

**INTRODUCTION**

Recently, one of us gave a workshop on how to conduct meta-analyses. The workshop was attended by participants from a number of different disciplines, including economics, finance, psychology, management, and health sciences. During the course of the workshop, it became apparent that different disciplines conduct meta-analyses differently. While there is a vague awareness that this is the case, we are unaware of any attempts to quantify those differences. That is the motivation for this blog.

We collected recent meta-analyses across a number of different disciplines and recorded information on the following characteristics:

– Size of meta-analysis sample, measured both by number of studies and number of estimated effects included in the meta-analysis

– Type of effect size

– Software package used

– Procedure(s) used to estimate effect size

– Type of tests for publication bias

– Frequency that meta-analyses report (i) funnel plots, (ii) quantitative tests for publication bias, and (iii) meta-regressions.

Unfortunately, given the large number of meta-analyses, and large number of disciplines that do meta-analyses, we were unable to do an exhaustive analysis. Instead, we chose to identify the disciplines that publish the most meta-analyses, and then analyse the 20 most recent meta-analyses published in those disciplines.

**LITERATURE SEARCH**

To conduct our search, we utilized the library search engine at our university, the University of Canterbury. This search engine, while proprietary to our university, allowed us to simultaneously search multiple databases by discipline (see below).

[![](/replication-network-blog/trn120210518.webp)](https://replicationnetwork.com/wp-content/uploads/2021/05/trn120210518.webp)

We conducted our search in January 2021. We used the keyword “meta-analysis”, filtering on “Peer-reviewed” and “Journal article”, and restricted our search depending on publication date. A total of 58 disciplines were individually searchable, including Agriculture, Biology, Business, Economics, Education, Engineering, Forestry, Medicine, Nursing, Physics, Political Science, Psychology, Public Health, Sociology, Social Welfare & Social Work, and Zoology.

Of the 58 disciplines we could search on, 18 stood out as publishing substantially more meta-analyses than others. These are listed below. For each discipline, we then searched for all meta-analyses/”Peer-reviewed”/”Journal article” that were published in January 2021, sorted by relevance. We read through the title and abstract until we found 20 meta-analyses. If January 2021 produced less than meta-analyses for a given discipline, we extended the search back to December 2020. In this manner, we constructed a final sample of 360 meta-analyses. The results are reported below.

**NUMBER OF STUDIES**

TABLE 1 below reports mean, median, and minimum number of studies for each sample of 20 meta-analyses corresponding to the 18 disciplines. Maximum values are indicated by green shading. Minimum values are indicated by blue.

The numbers indicate wide differences across disciplines in the number of studies included in a “typical” meta-analysis. Business meta-analysis tend to have the largest number of studies with mean and median values of 87.6 and 88 studies, respectively. Ecology and Economics also typically include large numbers of studies.

On the other side, disciplines in the health sciences (Dentistry, Diet & Clinical Nutrition, Medicine, Nursing, and Pharmacy, Therapeutics & Pharma) include relatively few studies. The mean and median number of studies included in meta-analyses in Diet & Clinical Nutrition are 13.9 and 11; and 14.8 and 10 for Nursing, respectively. We even found a meta-analysis in Dentistry that only included [***2 studies***](https://onlinelibrary.wiley.com/doi/full/10.1111/idh.12477).

[![](/replication-network-blog/table120210518.webp)](https://replicationnetwork.com/wp-content/uploads/2021/05/table120210518.webp)

**NUMBER OF EFFECTS**

Meta-analyses differ not only in number of studies, but the total number of observations/estimated effects they include. In some fields, it is common to include a representative effect, or the average effect from that study. Other disciplines include extensive robustness checks, where the same effect is estimated multiple times using different estimation procedures, variable specifications, and subsamples. Similarly, there may be multiple measures of the same effect, sometimes included in the same equation, and these produce multiple estimates.

Measured by number of estimated effects, Agriculture has the largest meta-analyses with mean and median sample sizes of 934 and 283. Not too far behind are Economics and Business. These three disciplines are characterized by substantially larger samples than other disciplines. As with number of studies, the disciplines with the smallest number of effects per study are health-related fields such as Dentistry, Diet & Clinical Nutrition, Medicine, Nursing, Pharmacy, Therapeutics & Pharma, and Public Health.

[![](/replication-network-blog/table220210518.webp)](https://replicationnetwork.com/wp-content/uploads/2021/05/table220210518.webp)

**MEASURES OF EFFECT SIZE**

Disciplines also differ in the effects they measure. We identified four main types of effects: (i) Mean Differences, including standardized mean differences, Cohen’s d, and Hedge’s g; (ii) Odds-Ratios; (iii) Risk Ratios, including Relative Risk, Response Ratios, and Hazard Ratios; (iiia) Correlations, including Fisher’s z; (iiib) Partial Correlations, and (iv) Estimated Effects.

We differentiate correlations from partial correlations because the latter primarily appear in Economics. Likewise, Economics is somewhat unique because the range of estimated effects vary widely across primary studies, with studies focusing on things like elasticities, various treatment effects, and other effects like fiscal multipliers or model parameters. The table below lists the most common and second most common effect sizes investigated by meta-analyses across the different disciplines.

[![](/replication-network-blog/table320210518.webp)](https://replicationnetwork.com/wp-content/uploads/2021/05/table320210518.webp)

We might ask why does it matter that meta-analyses differ in their sizes and estimated effects? In a recent study, ***[Hong and Reed (2021)](https://onlinelibrary.wiley.com/doi/full/10.1002/jrsm.1467)*** present evidence that the performance of various estimators depends on the size of the meta-analyst’s sample. They provide an ***[interactive ShinyApp](https://hong-reed.shinyapps.io/HongReedInteractiveTables/)*** that allows one to filter performance measures by various study characteristics in order to identify the best estimator for the specific research situation. Performance may also depend on the type of effect being estimated (***[see here](https://ideas.repec.org/p/cbt/econwp/20-08.html)*** for some tentative experimental evidence on partial correlations).

**ESTIMATION – Estimators**

One way in which disciplines are very similar is on their reliance on the same estimators to estimate effect sizes. TABLE 4 reports the two most common estimators by discipline. Far and away the most common estimator is the Random Effects estimator that allows for heterogeneous effects across studies.

The second most common estimator is the Fixed Effects estimator, which is built on the assumption of a single population effect, whereby studies produce different estimated effects due only to sampling error. A close relative of the Fixed Effects estimator common in Economics is the ***[Weighted Least Squares estimator](https://onlinelibrary.wiley.com/doi/full/10.1002/sim.6481?casa_token=K9xDceRWgAUAAAAA%3ARlsUBjb13M-vT99SEw8MnHtgbc3_QJjIrQetu9xJbfiHbi2wz5TPGsSoK0R_uLgkiidZ5P4_RhumbeEf)*** of Stanley and Doucouliagos. This estimator produces coefficient estimates identical to the Fixed Effects estimator, but with different standard errors. Despite being the most common estimator, ***[Hong and Reed (2021)](https://onlinelibrary.wiley.com/doi/full/10.1002/jrsm.1467)*** show that Random Effects frequently underperforms relative to other meta-analytic estimators.

[![](/replication-network-blog/table420210518.webp)](https://replicationnetwork.com/wp-content/uploads/2021/05/table420210518.webp)

**SOFTWARE PACKAGES**

Another way in which disciplines differ is with respect to the software packages they use. These include a number of standalone packages such as ***[MetaWin](https://psycnet.apa.org/record/1997-09001-000)***, ***[RevMan](https://training.cochrane.org/online-learning/core-software-cochrane-reviews/revman)*** (for Review Manager), and ***[CMA](https://www.meta-analysis.com/)*** (for Comprehensive Meta-Analysis); as well as packages designed to be used in conjunction with comprehensive software programs such as R and Stata.

A frequently used R package is ***[metafor](https://www.metafor-project.org/doku.php)***. Stata has a built-in meta-analysis suite called ***[meta](https://www.stata.com/manuals/meta.pdf)***. In addition to these packages, many researchers have customized their own programs to work with R or Stata. As an example, in economics, Tomas Havránek has published a wide variety of meta-analyses using customized Stata programs. These can be viewed ***[here](http://meta-analysis.cz/)***.

TABLE 5 reports the most common software packages used by the studies in our sample. It is clear that R and Stata are the packages of choice for most researchers when estimating effect sizes.

[![](/replication-network-blog/image.webp)](https://replicationnetwork.com/wp-content/uploads/2021/05/image.webp)

**ESTIMATION – Tests for Publication Bias**

Another area where there is much commonality among disciplines is statistical testing for publication bias. While disciplines differ in how frequently they report such tests (see below), when they do, they usually rely on some measure of the relationship between the estimated effect size and its standard error or variance.

Egger’s test is the most common statistical test for publication bias. It consists of a regression of the effect size on the standard error of the effect size. Closely related is the FAT-PET (or its extension, FAT-PET-PEESE). FAT-PET stands for Funnel Asymmetry Test – Precision Effect Test. This is essentially the same as an Egger regression except that the regression is also used to obtain a publication-bias adjusted estimate of the effect size (“PET”, since this effect is commonly estimated in a specification where the mean effect size is measured by the coefficient on the effect size precision variable).

The rank correlation test, also known as Begg’s test or the Begg and Mazumdar rank correlation test, works very similarly except rather than a regression, it rank correlates the estimated effect size with its variance. Other tests, such as Trim and fill, Fail-safe N, and tests based on selection models, are less common.

[![](/replication-network-blog/table620210518.webp)](https://replicationnetwork.com/wp-content/uploads/2021/05/table620210518.webp)

**OTHER META-ANALYSIS FEATURES**

In addition to the characteristics identified above, disciplines also differ by how commonly they report information in addition to estimates of the effect size. Three common features are funnel plots, publication bias tests, and meta-regressions.

Funnel plots can be thought of as a qualitative Egger’s test. Rather than a regression relating the estimated effect size to its standard error, a funnel plot plots the relationship, providing a visual impression of potential publication bias. As is apparent from TABLE 6, not all meta-analyses report funnel plots. They appear to be particularly scarce in Agriculture, where only 15% of our sampled meta-analyses reported a funnel plot. For most disciplines, roughly half of the meta-analyses reported funnel plots. Funnel plots were most frequent in Medicine, with approximately 4 out of 5 meta-analyses showing a funnel plot.

TABLE 6 reports the most common statistical tests for publication bias conditional on such tests being carried out. While not all meta-analyses test for publication bias, most do. 15 of the 18 disciplines had a reporting rate of at least 50% when it comes to statistical tests of publication bias. Anatomy & Physiology and Diet & Clinical Nutrition had the highest rates, with 85% of meta-analyses reporting tests for publication bias. Agriculture had the lowest at 30%.

The last feature we focus on is meta-regression. A meta-regression is a regression where the dependent variable is the estimated effect size and the explanatory variables consist of various study, data, and estimation characteristics that the researcher believes may influence the estimated effect size. Technically speaking, an Egger regression is a meta-regression. However, here we restrict it to studies that attempt to explain differences in estimated effects across studies by relating them to characteristics of those studies beyond the standard error of the effect size.

Meta-regressions are very common in Economics, with almost 9 out of 10 meta-analyses including them. They are less common in other disciplines, with most disciplines having a reporting rate less than 50%. None of the 20 Agriculture meta-analyses in our sample reported a meta-regression.

Nevertheless, there are other ways that meta-analyses can explore systematic differences in effect sizes. Many studies perform subgroup analyses. For example, a study of the effect of a certain reading program may break out the full sample according to the predominant racial or ethnic characteristics of the school jurisdiction to determine whether there these characteristics are related to the effectiveness of the program.

[![](/replication-network-blog/table720210518.webp)](https://replicationnetwork.com/wp-content/uploads/2021/05/table720210518.webp)

**CONCLUSION**

While our results are based on a limited sampling of meta-analyses, the results indicate that there are important differences in meta-analytic research practices across disciplines. Researchers can benefit from this knowledge by appropriately accommodating their research if they are considering submitting their work to interdisciplinary journals. Likewise, being familiar with another discipline’s norms enables one to provide a fairer, more objective review when one is called to referee meta-analyses from journals outside one’s discipline.

As noted above, estimator performance may also be impacted by study and data characteristics. While some research has explored this topic, this is largely unexplored territory. Recognizing that meta-analyses from different disciplines have different characteristics should make one sensitive that estimators and practices that are optimal in one field may not be well suited in others. We hope this study encourages more research in this area.

*Jianhua (Jane) Duan is a post-doctoral fellow in the Department of Economics at the University of Canterbury. She is being supported by a grant from the Center for Open Science. Bob Reed is Professor of Economics and the Director of* ***[UCMeta](https://www.canterbury.ac.nz/business-and-law/research/ucmeta/)*** *at the University of Canterbury. They can be contacted at* [*jianhua.duan@pg.canterbury.ac.nz*](mailto:jianhua.duan@pg.canterbury.ac.nz) *and* [*bob.reed@canterbury.ac.nz*](mailto:bob.reed@canterbury.ac.nz)*, respectively.*

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2021/05/18/duan-reed-how-are-meta-analyses-different-across-disciplines/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2021/05/18/duan-reed-how-are-meta-analyses-different-across-disciplines/?share=facebook)

Like Loading...