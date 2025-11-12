---
title: "REED: EiR* – How to Measure the Importance of Variables in Regression Equations"
date: 2019-07-15
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Ceteris Paribus Importance"
  - "Economic Growth"
  - "Economic importance"
  - "Effect size"
  - "Non-Ceteris Paribus Importance"
  - "Olivier Sterck"
  - "R-squared"
  - "Regression"
  - "Standardized Beta Coefficient"
draft: false
type: blog
---

###### *[\* EiR = Econometrics in Replications, a feature of TRN that highlights useful econometrics procedures for re-analysing existing research. The material for this blog is drawn from a recent working paper, “*[***On the measurement of importance***](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3386218)*” by Olivier Sterck.]*

###### *NOTE: The files (Stata) necessary to produce the results in the tables below are posted at Harvard’s Dataverse: **[click here](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/OHOWDU)**.*

###### Researchers are often interested in assessing practical, or economic, importance when doing empirical analyses. Ideally, variables are scaled in such a way that interpreting a variable’s effect is straightforward. For example, a common variable in cross-country, economic growth equations is average annual temperature. Accordingly, one can gauge the effect of a 10-degree increase in temperature on economic growth, ceteris paribus.

###### However, sometimes variables do not allow a straightforward interpretation. This is true, for example, for index variables. It is also true for variables that are otherwise difficult to relate to, such as measures of “terrain ruggedness” or “genetic diversity”, both of which have been employed in growth studies.

###### Problems can still arise even when coefficients are straightforward. For example, a variable may have a large effect, but differ only slightly across observations, so that it explains very little of the variation in the dependent variable.

###### Further, a researcher may be interested in assessing the relative importance of variables.  For example, the coefficients on average annual temperature and percentage of fertile soil may be straightforward to interpret, but a researcher may be interested knowing which is “more important” for explaining differences in growth rates across countries.

###### The most common approach for measuring importance in these latter cases is to calculate *Standardized Beta Coefficients*. These are obtained by standardizing all the variables in an equation, including the dependent variable, and re-running the regression with the standardized variables. However, this measure has serious shortcomings.

###### As we shall show below, the nominal value of the *Standardized Beta Coefficient* does not lend itself to a straightforward interpretation. Further, it has difficulty handling nonlinear specifications of a variable, such as when both a variable and its square is included in an equation. And it is unable to assess groups of variables. For example, a researcher may include regional variables such as North America, Latin America, Middle East, etc., and wish to determine if the regional variables are collectively important.

###### A recent paper by Olivier Sterck identifies shortcomings of existing measures of importance (such as the *Standardized Beta Coefficient*) and proposes two new measures: *Ceteris Paribus Importance* and *Non-Ceteris Paribus Importance*. Both are measured in percentages and have straightforward interpretations. They can be implemented with a new Stata command (“importance”) that can be downloaded from [***the author’s website***](https://oliviersterck.wordpress.com/). The two measures address different aspects of importance and are intended as complements.

###### ***Ceteris Paribus Importance***

###### Let the relationship between a variable of interest, *y*, and a set of explanatory variables be given by

###### (1) *yi =* *b0 + ∑**i* *bixi +* *εi*

###### It follows that the variance of *y* is

###### (2) *Var(y) = ∑**i=1/n Var(**bixi) + 2∑**i=1/n-1**∑j=i+1/n Cov(bixi,bjxj) Var(**ε) .*

###### A key challenge is how to allocate the *Cov(**bixi,**bjxj)* terms between *xi* and *xj* for all *i* ≠ *j.* The first measure, *Ceteris Paribus Importance*, denoted *qi-squared*, addresses this problem by ignoring these terms:

###### (3) *qi-squared = Var(**bixi) / [∑**i=1/n Var(**bixi) + Var(**ε)]*

###### *Ceteris Paribus Importance* takes values between 0 and 1 and can be understood as a percentage. Specifically, it is the percent of variation in *y* attributed to a given variable, holding the other variables constant. Note that the sum of the individual *q-squared* terms, including *q-squared* for the error term, equals one: *∑**i=1/n**qi-squared + q-squared(**ε) = 1.* Further, in the special case when *∑**i=1/n-1**∑j=i+1/n Cov(bixi,bjxj)**= 0,* as when all the explanatory variables are uncorrelated with each other, *∑**i=1/n**qi-squared**= R2.*

###### **A comparison of *Ceteris Paribus Importance* with *Standardized Beta Coefficient***

###### Consider two data generating processes (DGPs).

###### DGP1: *y1i = x1i +* *ε1i* ,  where *x1i,* *ε1i ~ N*(0,1);

###### DGP2: *y2i = x2i +* *ε2i* ,  where *x2i ~ 2**·N*(0,1) and *ε1i ~ N*(0,1).

###### In the first DGP, the coefficient on *x1i* is 1 and *x1i* and *ε1i* each contribute 50% to the variance of *y*. The second DGP is identical to the first, except that *x* now contributes 80% of the variance of *y*. The table below reports coefficient estimates for both models from simulated samples of 10,000 observations. It also reports the corresponding *Ceteris Paribus Importance* (*qi-squared*) and *Standardized Beta Coefficient* measures.

###### TRN1(20190713)

###### Recall that *Ceteris Paribus Importance* measures the contribution of the *x* variable to the variance of *y*. Since there is only one explanatory variable in both DGPs, the covariance terms in equation (3) drop out, and *qi-squared = R-squared.* Accordingly, in DGP1, where both *x* and *ε* contribute equally to the variance of *y, Ceteris Paribus Importance* equals 50%. When the variance of *x* increases fourfold, so that *x* contributes 4/5s of the variance of *y*, *Ceteris Paribus Importance* rises to 80%. In both cases, *Ceteris Paribus Importance* has a straightforward interpretation as a percent of the variance of *y* contributed by *x* (holding other variables constant).

###### The corresponding *Standardized Beta Coefficients* for the two models are 0.714 and 0.894. While the *Standardized Beta Coefficient* is larger in the second model, there is no straightforward interpretation of its numerical value.

###### ***Non-Ceteris Paribus Importance***

###### Sterck’s second measure, *Non-Ceteris Paribus Importance,* accommodates the fact that variables are likely to be correlated when working with observational data. It allocates the covariance terms in equation (2) equally across the two variables and is defined as follows:

###### (4a) *Ei = [Var(**b**i**xi) / Var(y)] + [**∑**j**≠**i/n* *Cov(**b**i**xi,**b**j**xj) / Var(y)].*

###### This can be expressed alternatively as

###### (4b) *Ei = [**∂**Var(y)/Var(y)] / [**∂**Var(**b**i**xi)/Var(**b**i**xi)] .*

###### Despite its seemingly nonintuitive appearance, *Non-Ceteris Paribus Importance* has two characteristics that make it appealing. First,*∑**i=1/n Ei = R-squared.* Thus, it decomposes *R-squared* across the respective variables. As shown by equation (4.b), the individual components can be expressed as elasticities. In particular, they measure how a marginal change in the variance of *b**i**xi* affects the variance of *y.*

###### The second characteristic is that *Non-Ceteris Paribus Importance* can take both positive and negative values. The first term in equation (4), *[Var(**bixi) / Var(y)],* will always be positive, of course. However, the second term captures the association of *xi* with the other explanatory variables. In particular, if *xi* is strongly negatively correlated with other variables, the overall effect of increases in the variance of *bixi* can be to decrease the variance of *y.*

###### *Non-Ceteris Paribus Importance* serves as a complement to *Ceteris Paribus Importance.* The latter focuses on the direct effect of *x* on the variance of *y*. In contrast, *Non-Ceteris Paribus Importance* incorporates the covariance of *xi* with other variables. It provides a measure of the extent to which *xi* works to reinforce, or counteract, the effects of the other explanatory variables.

###### **An application to growth empirics**

###### Sterck provides an empirical example of the two importance measures using income data from 155 countries. He employs OLS to estimate a regression of the log of per capita GDP in 2000 on 18 variables that have been used by other researchers of economic growth.

###### Table 2 classifies the variables in five groups. Category 1 consists of stand-alone variables. Category 2 consists of a quadratic specification for the variable *Predicted genetic diversity*. Categories 3 through 5 consist of groupings of dummy variables (religion, legal foundations, regions).

###### Note that *Standardized Beta Coefficients* are unable to collectively evaluate Categories 2 through 5. For example, one can calculate a *Standardized Beta Coefficient* for the linear and quadratic forms of the *Predicted genetic diversity* variable, but not for their combined importance. Likewise, one can calculate *Standardized Beta Coefficients* for the individual religion dummies, but one cannot use this measure to obtain an overall measure of the importance of religion.

###### TRN2(20190713)

###### Table 3 reports importance measures for the 5 categories of variables (where the stand-alone variables of Category 1 are lumped together for convenience).

###### TRN3(20190713)

###### Column (1) displays *Ceteris Paribus Importance (qi-squared*). Note that the importance of the individual categories plus the residuals sum to 100 percent of the variance of *y.* Corporately, the stand-alone variables account for approximately 45% of the variance of *y,* with the religion and regional variables next in importance at 13% and 10%, respectively.

###### Column (2) reports *Non-Ceteris Paribus Importance* *(Ei).* This measure accounts for the interactions of variables across categories. The individual shares sum to the *R-squared* of the respective OLS regression (84.4%).

###### Columns (3) and (4) divide *Non-Ceteris Paribus Importance* into two components. The *Variance* and *Covariance* components correspond to the first and second terms in equation (4.a) above. In most cases, variables within a category reinforce the effects of variables in other categories. However, note that the *Covariance* term for the regional variables is negative. This indicates that the regional dummies counteract the effect of some of the variables in other categories, reducing the variation of *y* that would otherwise result. Nevertheless, overall, regional variables positively contribute to the variance of incomes across countries.

###### The above provides an example of how *Ceteris Paribus* and *Non-Ceteris Paribus Importance* can be calculated for OLS regressions. An option in the corresponding do file also allows one to calculate importance measures for 2SLS regressions. Additional details are provided in ***[Sterck’s paper](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3386218)***.

###### *Bob Reed is a professor of economics at the University of Canterbury in New Zealand. He is also co-organizer of the blogsite The Replication Network. He can be contacted at bob.reed@canterbury.ac.nz.*

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2019/07/15/reed-eir-how-to-measure-the-importance-of-variables-in-regression-equations/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2019/07/15/reed-eir-how-to-measure-the-importance-of-variables-in-regression-equations/?share=facebook)

Like Loading...