---
title: "REED: Using the R Package “specr” To Do Specification Curve Analysis"
date: 2024-11-05
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Happiness"
  - "Specification curve analysis"
  - "specr"
  - "Tom Coupé"
  - "War"
draft: false
type: blog
---

*NOTE: The data (“COUPE.Rdata”) and code (“specr\_code.R”) used for this blog can be found here: <https://osf.io/e8mcf/>*

**A Tutorial on “specr”**

In a recent ***[post](https://replicationnetwork.com/2024/05/09/coupe-why-you-should-add-a-specification-curve-analysis-to-your-replications-and-all-your-papers/)***, Tom Coupé encouraged readers to create specification curves to represent the robustness of their results (or lack thereof). He illustrated how this could be done using the R package “**specr**” (Masur & Scharkow. 2020).

In this blog, I provide instructions that allow one to reproduce Coupé’s results using a modified version of his code. In providing a line-by-line explanation of the code that reproduces Coupe’s results, it is hoped that the reader will have sufficient understanding to enable them to use the “**specr**” package for their own applications. Later, in a follow-up blog, I will do the same using Stata’s “**speccurve**” program.

**Specification Curve Analysis**

Specification curve analysis (Simonsohn, Simmons & Nelson, 2020), also known as multiverse analysis (Steegen et al., 2016) is used to investigate the “garden of forking paths” inherent in empirical analysis. As everyone knows, there is rarely a single, best way to estimate the relationship between a dependent variable y and a causal or treatment variable x. Researchers can disagree about the estimation procedure, control variables, samples, and even the specific variables to best represent the treatment and the outcome of interest.

When the list of equally plausible alternatives (Del Giudice & Gangestad, 2021) is relatively short, it is an easy task to estimate, and report, all alternatives. But suppose the list of equally plausible alternatives is long? What can one do then?

Specification curve analysis provides a way of estimating all reasonable alternatives and presenting the results in a way that makes it easy to determine the robustness of one’s conclusions.

**The Coupé Study**

In Coupé’s post, he studied five published articles, all of which investigated the long-term impact of war on life satisfaction. Despite using  the same dataset (the “Life in Transition Survey” dataset), the five articles came to different conclusions about both the sign and statistical significance of the relationship between war and life satisfaction.

Complicating their interpretation, the five studies used different estimation methods, different samples, different measures of life satisfaction, and different sets of control variables. Based on these five studies, Coupé identified 320 plausible alternatives. He then produced the following specification curve.

[![](/replication-network-blog/image.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image.webp)

FIGURE 1 sorts the estimates from lowest to highest. Point estimates are indicated by dots, and around each dot is a 95% confidence interval. Red dots/intervals indicate the point estimate is statistically significant. Grey dots/ intervals indicate statistical insignificance.

This specification curve vividly demonstrates the range of point estimates and statistical significances that are possible depending on the combination of specification characteristics. One clearly sees three sets of results: negative and significant, negative and insignificant, and positive and insignificant.

“**specr**” also comes with a feature that allows one to connect results to specific combinations of specification characteristics.

[![](/replication-network-blog/image-1.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-1.webp)

FIGURE 2 identifies the individual specification characteristics: There is one “x” variable (“WW2injury”). There are two “y” variables (“lifesatisfaction15” and “lifesatisfaction110”). There are five general estimation models corresponding to the five studies (“NikolovaSanfey2016”, “Kjewski2020”, “Ivlevs2015”, “Djankoveta2016”, and “ChildsNikolova2020”). There are 8 possible combinations of the variable sets “War Controls”, “Income”, and “Other Controls”. And there are four possible samples. This yields 1x2x5x8x4 = 320 model specifications.

The figure allows one to visually connect results to characteristics, with red (blue) markers indicating significant (insignificant) estimates, and estimates increasing in size as one moves from left to right in the figure. However, to investigate further, one needs to do a proper multivariate analysis.

Coupé chose to do this by estimating a linear regression, establishing one specification as the reference category and representing the other model characteristics with dummy variables. The reference case was defined as Model = ChildsNikolova2020, Subset = All, Controls = Income controls, and Dependent Variable  = lifesatisfaction110.[[1]](#_ftn1)

Because the model covariates are all dummy variables, the estimated coefficients can be directly compared. From TABLE 1 below (which is Table III in Coupé’s paper) we observe that specifications that include “Income Controls” are associated with larger (less negative, more positive) estimates of the effect of war injury on life satisfaction.

[![](/replication-network-blog/image-2.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-2.webp)

**Using “specr”**

Now that we know what specification curve analysis can do, the next step is to go over the code that produced these results. The following provides line-by-line explanations of the code ([***provided here***](https://osf.io/e8mcf/)) used to reproduce the two figures and the table above.

First, create a folder and place the dataset COUPE.RData in it. COUPE.RData is a dataset that I created using datasets from Coupé’s github site (***[see here](https://github.com/dataisdifficult/war/blob/main/README.md)****)*.

Open R and start a new script by setting the working directory equal to that folder.

[![](/replication-network-blog/image-3.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-3.webp)

Use the library command to read in all the packages you need to run the program. Install any packages that you do not currently have installed.

[![](/replication-network-blog/image-4.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-4.webp)

The following command discourages R from reporting results using scientific notation.

[![](/replication-network-blog/image-5.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-5.webp)

Now we read in the dataset, COUPE, an R dataset.

[![](/replication-network-blog/image-6.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-6.webp)

**The “setup” command**

The heart of the “**specr**” package is the “**setup**” command.  It lays out the individual components that will combined to produce a given specification. The syntax for the “**setup**” command is given below ([***documentation here***](https://masurp.github.io/specr/reference/setup.html)):

[![](/replication-network-blog/image-7.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-7.webp)

It involves specifying the dataset, the treatment variable(s) (“x”), the dependent variable(s) (“y”), the sets of control variables (“controls”), and the different subsets (“subsets”). The “add\_to\_formula” option identifies a constant set of control variables that are included in every specification.

You will have noticed that I skipped over “model”. This is where the different estimation procedures are identified. In Coupé’s analysis, he specified five different models, each representing one of the five papers in his study. This is the most complicated part of the “**setup**” command, which is why I saved it for last.

Coupé named each of his models after the paper they represents. Here is how the model for Kijewski2020 is defined:

[![](/replication-network-blog/image-8.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-8.webp)

Kijewski2020 is a customized function that has three components. “formula” is defined by the combination of characteristics that define a particular specification. “data” is the dataset identified in the “**setup**” command, and the third line indicates that Kijewski2020 used a two-level, mixed effects models. To estimate this model, Coupé uses the R function “**lmer**”. The only twist here is the addition of “+(1|country)” that lets “**lmer**” know to include random effects at the country level.

The other studies are represented similarly. Below is how the model for ChildsNikolova2020 is defined:

[![](/replication-network-blog/image-9.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-9.webp)

Rather than estimating a multi-level model, ChildsNikolova2020 estimates a fixed effects, OLS model. The component “|Region1” adds regional dummy variables to the variable specification. The “cluster” and “weights” options compute cluster robust standard errors (CR1-type) and allow for weighting, designed to give each country in the sample an equal weight.

The other models are defined similarly.

[![](/replication-network-blog/image-10.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-10.webp)

Having defined the individual models, we can now assemble the individual specification components in the “**setup**” command.

[![](/replication-network-blog/image-11.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-11.webp)

The first several lines should be easy to interpret, having been discussed above. “subset” identifies two subsets: “sample15” = “Heavily affected countries only”; “under65” = “Under sixty-five”. “**specr**” turns this into four samples: (i) “sample15”, (ii) under65”, (iii) “sample15” & “under65”, and (iv) the full sample (“all”).

“controls” identifies three sets of controls. I have separated the three sets of controls  to make them easier to identify. The first is what Coupé calls “Other controls”. The second is what he calls “War controls”; and the third, “Income Controls”. In combination with the option “simplify = FALSE”, “**specr**” turns this into 8 sets of control variables, which is equal to all possible combinations of the three sets of control variables (none, each individually, each combination between each variable, all variables). If simplify = TRUE”, had been selected, only five sets of control variables would have been included (no covariates, each individually, and all covariates).

The last element in “**setup**” command is “add\_to\_formula”. This identifies variables that are common to every specification. This option allows one to list these variables once, rather than repeating the list for each set of control variables.

**FIGURE 1**

Together, the “**setup**” command creates an object called “**specs**”. In turn, “**specr**” takes this object and creates another object, “**results**”, which is then fed into subsequent “**specr**” functions.

[![](/replication-network-blog/image-12.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-12.webp)

And just like that, we can now use the command “**plot**” to produce our specification curve.

[![](/replication-network-blog/image-13.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-13.webp)

**FIGURE 2**

Moving on to FIGURE 2, the next set of six commands renames the respective sets of control variables and sample subsets for more convenient representation in subsequent outputs. As it is not central to running “**specr**”, but is only done to make the output more legible, I will only give a cursory explanation.

[![](/replication-network-blog/image-14.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-14.webp)

The “**specr**” command produces an object called “results$data” (see below). Inside it are contained many columns, including “x”, “y”, “model”, “controls”, “subsets”, etc. It has 320 rows, with each row containing details about the respective model specifications.

[![](/replication-network-blog/image-15.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-15.webp)

“results$data$controls” reports the variables used for each of the model specifications. Each of the six renaming commands replaces the contents of “controls” with shorter descriptions.

For example, the command below creates a temporary dataset called “**tom**” which is a copy of “results$data$controls”.

[![](/replication-network-blog/image-16.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-16.webp)

It looks for the text in the 10th row of “**tom**”, tom[10]  = “recentwarmoved+recentwarinjury+recentwarHHinjury+ WW2moved”. Every time it sees that text in “**tom**” it replaces it with “War Controls”. It then substitutes “**tom**” back into “results$data$controls”.

The other five renaming commands all do something similar.

With the variable names cleaned up for legibility, we’re ready to produce FIGURE 2.

[![](/replication-network-blog/image-17.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-17.webp)

**TABLE 1**

The last task is to produce TABLE 1. The estimates in TABLE 1 come from a standard OLS regression, which we again call “**tom**” (I don’t know where Coupé comes up with these names!).

[![](/replication-network-blog/image-18.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-18.webp)

The only thing unusual about this regression is that the dependent variable “estimate” and the explanatory variables (“model”, “subsets”, etc.) come from the dataset “results$data” described above.

We could have printed out the regression results from “**tom**” using the familiar “**summary**” command, but the output is very messy and hard to read.

Instead, we take the regression results from “**tom**” and use the “**stargazer**” package to create an attractive table. Note, however, we had to first look at the regression results from “**tom**” to get the correct order for naming the respective factor variables.

[![](/replication-network-blog/image-19.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-19.webp)

You can now go to the OSF site given at the top of this blog, download the data and code there, and produce the results in this blog (and Coupé’s paper). That should enable you to do your own specification curve analysis.

To learn more about “specr”, and see some more examples, [***go here***](https://masurp.github.io/specr/index.html).

*NOTE: Bob Reed is Professor of Economics and the Director of [**UCMeta**](https://www.canterbury.ac.nz/business-and-law/research/ucmeta/) at the University of Canterbury. He can be reached at*[*bob.reed@canterbury.ac.nz*](mailto:bob.reed@canterbury.ac.nz)*.*

---

[[1]](#_ftnref1) Personally, I would have omitted the constant term and included all the model characteristics as dummy variables.

**REFERENCES**

Del Giudice, M., & Gangestad, S. W. (2021). A traveler’s guide to the multiverse: Promises, pitfalls, and a framework for the evaluation of analytic decisions. Advances in Methods and Practices in Psychological Science, 4(1), 1-15.

Masur, Philipp K., and Michael Scharkow. 2020. “Specr: Conducting and Visualizing Specification Curve Analyses (Version 1.0.1).” [https://CRAN.R-project.org/package=specr](https://cran.r-project.org/package=specr).

Simonsohn, U., Simmons, J. P., & Nelson, L. D. (2020). Specification curve analysis. *Nature Human Behaviour*, 4(11), 1208-1214.

Steegen, S., Tuerlinckx, F., Gelman, A., & Vanpaemel, W. (2016). Increasing transparency through a multiverse analysis. *Perspectives on Psychological Science*, 11(5), 702-712.

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2024/11/05/reed-using-the-r-package-specr-to-do-specification-analysis/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2024/11/05/reed-using-the-r-package-specr-to-do-specification-analysis/?share=facebook)

Like Loading...