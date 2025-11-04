---
title: "REED & LOGCHIES: Calculating Power After Estimation – No Programming Necessary!"
date: 2024-08-15
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "American Economic Journal: Applied Economics"
  - "Chris Doucouliagos"
  - "economics"
  - "Ioannidis et al. (2017)"
  - "Partial Correlation Coefficients (PCCs)"
  - "post hoc power analysis"
  - "Power Curve"
  - "ShinyApp"
  - "Tian et al. (2024)"
draft: false
type: blog
---

**Introduction.** Your analysis produces a statistically insignificant estimate. Is it because the effect is negligibly different from zero? Or because your research design does not have sufficient power to achieve statistical significance? Alternatively, you read that “The median statistical power [in empirical economics] is 18%, or less” (***[Ioannidis et al., 2017](https://academic.oup.com/ej/article-abstract/127/605/F236/5069452?login=false)***) and you wonder if the article you are reading also has low statistical power. By the end of this blog, you will be able to easily answer both questions. Without doing any programming.

**An Online App**. In this post, we show how to calculate statistical power post-estimation for those who are not familiar with R. To do that, we have created a Shiny App that does all the necessary calculating for the researcher ([***CLICK HERE***](https://w87avq-bob-reed.shinyapps.io/post_hoc_power_app/)). We first demonstrate how to use the online app and then showcase its usefulness.

**How it Works.** The input window requires researchers to enter four numbers: (i) The alpha value corresponding to a two-tailed test of significance; (ii) the degrees of freedom of the regression equation; (iii) the standard error of the estimated effect; and (iv) the effect size for which the researcher wants to know the corresponding statistical power.

The input window comes pre-filled with four values to guide how researchers should enter their information. (The numbers in the table are taken from an example featured in the previous TRN blog). Once the respective information is entered, one presses the “Submit” button.

[![](/replication-network-blog/image.png)](https://w87avq-bob-reed.shinyapps.io/post_hoc_power_app/)

The app produces two outputs. The first is an estimate of statistical power that corresponds to the “Effect size” entered by the researcher. For example, for the numbers in the input window above, the app reports the following result: “Post hoc power corresponding to an effect size of 4, a standard error of 1.5, and df of 50 = 74.3%” (see below).

[![](/replication-network-blog/image-1.png)](https://w87avq-bob-reed.shinyapps.io/post_hoc_power_app/)

In words, this regression had a 74.3% probability of producing a statistically significant (5%, two-tailed) coefficient estimate if the true effect size was 4.

The second output is a power curve (see below).

[![](/replication-network-blog/image-2.png)](https://w87avq-bob-reed.shinyapps.io/post_hoc_power_app/)

The power curve illustrates how power changes with effect size. When the effect size is close to zero, it is unlikely that the regression will produce a statistically significant estimate. When the effect size becomes large, the probability increases, eventually asymptoting to 100%.

The power curve plot also includes two vertical lines: “Effect size” and “80% power”. The former translates the “Calculation Result” from above and places it within the plot area. The latter plots the effect size that corresponds to 80% power as a reference point.

**Useful when Estimates are Statistically Insignificant.** One application of post-hoc power is that it can help distinguish when statistical insignificance is due to a negligible effect size versus when it is the result of a poorly powered research design.

[***Tian et al. (2024)***](https://onlinelibrary.wiley.com/doi/full/10.1111/rode.13130), on which this blog is based, give the example of a randomized controlled trial that was designed to have 80% power for an effect size of 0.060, where 0.060 was deemed sufficiently large to represent a meaningful economic effect. Despite estimating an effect of 0.077, the study found that the estimated effect was statistically insignificant (degrees of freedom = 62). In fact, the power of the research design *as it was actually implemented* was only 20.7%.

We can illustrate this case in our online app. First, we enter the respective information in the input window:

[![](/replication-network-blog/image-3.png)](https://w87avq-bob-reed.shinyapps.io/post_hoc_power_app/)

This produces the following “Calculation Result”,

[![](/replication-network-blog/image-4.png)](https://w87avq-bob-reed.shinyapps.io/post_hoc_power_app/)

and associated Power Curve:

[![](/replication-network-blog/image-5.png)](https://w87avq-bob-reed.shinyapps.io/post_hoc_power_app/)

As it was implemented, the estimated regression model only had a 20.7% probability of producing a statistically significant estimate for an effect size (0.060) that was economically meaningful. Clearly, it would be wrong to interpret statistical insignificance in this case as indicating that the true effect was negligible.

**How About When it is Difficult to Interpret Effect Sizes?**  The example above illustrates the case where it is straightforward to determine an economically meaningful effect size for calculating power. When it is not possible to do this, the online Post Hoc Power app can still be of use by converting estimates to “partial correlation coefficients” (*PCCs*).

*PCCs* are commonly used in meta-analyses to convert regression coefficients to a common effect size. All one needs is the estimated *t*-statistic and the regression equation’s degrees of freedom (*df*):

[![](/replication-network-blog/image-6.png)](https://replicationnetwork.com/wp-content/uploads/2024/08/image-6.png)
[![](/replication-network-blog/image-15.png)](https://replicationnetwork.com/wp-content/uploads/2024/08/image-15.png)

The advantage of converting regression coefficients to *PCCs* is that there exist guidelines for interpreting the associated economic sizes of the effects. First, though, we demonstrate how converting the previous example to a *PCC* leads to a very similar result.

To get the *t*-statistics for the previous example, we divide the estimated effect (0.077) by its standard error (0.051) to obtain *t* = 1.176. Given *df* = 62, we obtain *PCC* = 0.148 and *se(PCC)* = 0.124. We input these parameter values into the input window (see below).

[![](/replication-network-blog/image-9.png)](https://w87avq-bob-reed.shinyapps.io/post_hoc_power_app/)

The output follows below:

[![](/replication-network-blog/image-10.png)](https://w87avq-bob-reed.shinyapps.io/post_hoc_power_app/)

[![](/replication-network-blog/image-11.png)](https://w87avq-bob-reed.shinyapps.io/post_hoc_power_app/)

A comparison of FIGURES 3B and 2B and FIGURES 3C and 2C confirms that the conversion to *PCC* has produced very similar power calculations.

**Calculating Power for the Most Recent issue of the *American Economic Journal: Applied Economics***. For our last demonstration of the usefulness of our online app, we investigate statistical power in the most recent issue of the ***[American Economic Journal: Applied Economics](https://www.aeaweb.org/issues/767)*** (July 2024, Vol. 16, No.3).

There are a total of 16 articles in that issue. For each article, we selected one estimate that represented the main effect. Five of the articles’ did not provide sufficient information to calculate power for their main effects, usually because they clustered standard errors but did not report the number of clusters. That left 11 articles/estimated effects.

To determine statistical power, we converted all the estimates to *PCC* values and calculated their associated *se(PCC)* values (see above). We then calculated power for three effect sizes.

To select the effect sizes, we turned to a very useful paper by Chris Doucouliagos entitled “***[How Large is Large? Preliminary and relative guidelines for interpreting partial correlations in economics](https://www.deakin.edu.au/__data/assets/pdf_file/0003/408576/2011_5.pdf)”***, Doucouliagos collected 22,000 estimated effects from the economics literature and converted them to *PCCs*. He then rank-ordered them from smallest to largest. Reference points for “small”, “medium” and “large” were set at the 25th, 50th, and 75th percentile values. For the full dataset, the corresponding *PCC* values were 0.07, 0.17, and 0.33.

Our power analysis will calculate statistical power for these three effect sizes. Specifically, we want to know how much statistical power each of the studies in the most recent issue of the *AEJ: Applied Economics* had to produce significant estimates for effect sizes corresponding to “small”, “medium”, and “large”. The results are reported in the table below.

[![](/replication-network-blog/image-13.png)](https://replicationnetwork.com/wp-content/uploads/2024/08/image-13.png)

We can use this table to answer the question: Are studies in the most recent issue of the  *AEJ: Applied Economics* underpowered? Based on a very limited sample, our answer would be some are, but most are not. The median power of the 11 studies we investigated was 81.8% for a “small” effect. These results differ substantially from what Ioannidis et al. (2017) found. Why the different conclusions? We have some ideas, but they will have to wait for a more comprehensive analysis. However the point of this example was not to challenge Ioannidis et al.’s conclusion. It is merely to show how useful, and easy, calculating post hoc power can be. Everybody should do it!

*NOTE: Bob Reed is Professor of Economics and the Director of **[UCMeta](https://www.canterbury.ac.nz/research/about-uc-research/research-groups-and-centres/ucmeta)** at the University of Canterbury. He can be reached at*[*bob.reed@canterbury.ac.nz*](mailto:bob.reed@canterbury.ac.nz)*. Thomas Logchies is a Master of Commerce (Economics) student at the University of Canterbury. He was responsible for creating the Shiny App for this blog. His email address is thomas.logchies@pg.canterbury.ac.nz .*

**REFERENCE**

[*Tian, J., Coupé, T., Khatua, S., Reed, W. R., & Wood, B. D. K. (2024). Power to the researchers: Calculating power after estimation. Review of Development Economics, 1–35. https://doi.org/10.1111/rode.13130*](https://onlinelibrary.wiley.com/doi/full/10.1111/rode.13130)

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2024/08/15/reed-logchies-calculating-power-after-estimation-no-programming-required/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2024/08/15/reed-logchies-calculating-power-after-estimation-no-programming-required/?share=facebook)

Like Loading...