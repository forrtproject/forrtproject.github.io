---
title: "REED: Do a DAG Before You Do a Specification Curve Analysis"
date: 2024-11-18
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "DAGs"
  - "Del Giudice & Gangestad (2021)"
  - "Directed Acyclic Graphs"
  - "Multiverse"
  - "Principled equivalence"
  - "Principled nonequivalence"
  - "SCA"
  - "Specification curve analysis"
  - "Type E"
  - "Type N"
  - "Type U"
draft: false
type: blog
---

My previous two blogs focused on how to do a specification curve analysis (SCA) using the R package “specr” (***[here](https://replicationnetwork.com/2024/11/05/reed-using-the-r-package-specr-to-do-specification-analysis/)***) and the Stata program “speccurve” ([***here***](https://replicationnetwork.com/2024/11/16/reed-using-the-stata-package-speccurve-to-do-specification-curve-analysis/)). Both blogs provided line-by-line explanations of code that allowed one to reproduce the specification curve analysis in Coupé (***[see here](https://replicationnetwork.com/2024/05/09/coupe-why-you-should-add-a-specification-curve-analysis-to-your-replications-and-all-your-papers/)***).

Coupé included 320 model specifications for his specification curve analysis. But why 320? Why not 220? Or 420? And why the specific combinations of models, samples, variables, and dependent variables that he chose?

To be fair, Coupé was a replication project, so it took as given the specification choices made by the respective studies it was replicating. But, in general, how DOES one decide which model specifications to include?

**Del Giudice & Gangestad (2021)**

In their seminar article, “[***Mapping the Multiverse: A Framework for the Evaluation of Analytic Decisions***](https://journals.sagepub.com/doi/pdf/10.1177/2515245920954925)”, Del Giudice & Gangestad (2021), henceforth DG&G, provide an excellent framework for how to choose model specifications for SCA. They make a persuasive argument for using Directed Acyclic Graphs (DAGs).

The rest of this blog summarizes the key points in their paper and uses it as a template for how to select specifications for one’s own SCA.

**Using a DAG to Model the Effect of Inflammation on Depression**

DG&G’s focus their analysis on a hypothetical example: a study of the effect of inflammation on depression. Accordingly, they present the DAG below to represent the causal model relating inflammation (the treatment variable) to depression (the outcome variable).

[![](/replication-network-blog/image-57.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-57.webp)

**The Variables**

In this DAG, “Inflammation” is assumed to have a direct effect on “Depression”. It is also assumed to have an indirect effect on “Depression” via the pathway of “Pain”.

 “Inflammation” is measured in multiple ways. There are four, separate measures of inflammation, “BM1”-“BM4” that may or may not be correlated.

“Age” is a confounder. It affects both “Inflammation” and “Depression”.

“Fatigue” is a collider variable. It affects neither “Inflammation” nor “Depression”. Rather, it is affected by them. “Pain” and “Age” also affect “Fatigue”.

Lastly, “Pro-inflammatory genotype” represents the effect that one’s DNA has on their predisposition to inflammation.

One way to build model specifications is to combine all possible variables and samples. There are four different measures of the treatment variable “Inflammation” (“BM1”-“BM4”).

There are four “control” variables: “Pro-inflammatory Genotype”, “Pain”, “Fatigue”, and “Age”.

The authors also identify three different ways of handling outliers.

In the end, DG&G arrive at 1,216 possible combinations of model characteristics. Should a SCA include all of these?

**Three Types of Specifications**

To answer this question, DG&G define three types of model specifications: (i) Principled Equivalence (“Type E”), (ii) Principled Non-equivalence (“Type N”), and (iii) Uncertainty (“Type U”).

Here is how they describe the three categories:

“In *Type E decisions* (principled equivalence), the alternative specifications can be expected to be practically equivalent, and choices among them can be regarded as effectively arbitrary.”

“In *Type N decisions* (principled nonequivalence), the alternative specifications are nonequivalent according to one or more nonequivalence criteria. As a result, some of the alternatives can be regarded as objectively more reasonable or better justified than the others.”

“…in *Type U decisions* (uncertainty), there are no compelling reasons to expect equivalence or nonequivalence, or there are reasons to suspect nonequivalence but not enough information to specify which alternatives are better justified.”

**Using Type E and Type N to Select Specifications for the SCA**

I next show how these three types guide the selection of specifications for SCA in the “Inflammation”-“Depression” study example.

First, we need to identify the effect we are interested in estimating. Are we interested in the direct effect of “Inflammation” on “Depression”? If so, then we want to include the variable “Pain” and thus separate the direct from the indirect effect.

Specifications with “Pain” and without “Pain” are not equivalent. They measure different things. Thus, equivalent (“Type E”) specifications of the direct effect of “Inflammation” on “Depression” should always include “Pain” in the model specification.

Likewise, for the variable “Age”. “Age” is a confounder. One needs to control its independent effect on “Inflammation” and “Depression”. Accordingly, “Age” should always be included in the specification. Variable specifications that do not include “Age” will be biased. They are “Type N” specifications. Specifications that do not include “Age” should not be included in the SCA.

How about “Fatigue”? “Fatigue” is a collider variable. “Inflammation” and “Depression” affect “Fatigue”, but “Fatigue” does not affect them. In fact, including “Fatigue” in the specification will bias estimates of “Inflammation’s” direct effect. To see this, suppose “Fatigue” = “Inflammation” + “Depression”.

If “Inflammation” increases, and “Fatigue” is held constant by including it in the regression, “Depression” must necessarily decrease. Including “Fatigue” would induce a negative bias in estimates of the effect of “Inflammation” on “Depression”. Thus, specifications that include “Fatigue” are Type N specifications and should not be included in the SCA.

What do DG&G’s categories have to say about “Pro-inflammatory Genotype” and the multiple measures of the treatment variable (“BM1”-“BM4”)? As “Pro-inflammatory Genotype” has no effect on “Depression”, the only effect of including it in the regression is to reduce the independent variance of “Inflammation”.

While this leaves the associated estimates unbiased, it diminishes the precision of the estimated treatment effect. As a result, specifications that include “Pro-inflammatory Genotype” are inferior (“Type N”)  to those that omit this variable.

Finally, there are multiple ways to use the four measures, “BM1” to “BM4”. One could include specifications with each one separately. One could create composite measures, that additively combine the individual biomarkers; such as “BM1+BM2”, “BM1+BM3”,…, “BM1+BM2+BM3+BM4”.

Should all of the corresponding specifications be included in the SCA? DG&G state that “composite measures of a construct are usually more valid and reliable than individual indicators.” However, “if some of the indicators are known to be invalid, composites that exclude them will predictably yield higher validities.”

Following some preliminary analysis that raised doubts about the validity of BM4, DG&G concluded that only the composites “BM1+BM2+BM3+BM4” and “BM1+BM2+BM3” were “principled equivalents” and should be included in the SCA.

The last element in DG&G’s analysis was addressing the problem of outliers. They considered three alternative ways of handling outliers. All were considered to be “equivalent” and superior to using the full sample.

In the end, DG&G cut down the number of specifications in the SCA from 1,216 to six, where the six consisted of specifications that allowed two alternative composite measures of the treatment variable, and three alternative samples corresponding to each of the three ways of handling outliers. All specifications included (and only included) the control variables, “Age” and “Pain”.

**Type U**

The observant reader might note that we did not make use of the third category of specifications, Type U for “Uncertainty”. DG&G give the following DAG as an example.

[![](/replication-network-blog/image-58.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-58.webp)

In Figure 2b, “Fatigue” is no longer a collider variable. Instead, it is a mediator variable like “Pain”. Accordingly, DG&G identify six specifications for this DAG, with two alternative composite measures of “Inflammation”, three ways of addressing outliers, and all specifications including (and only including), the control variables, “Pain”, “Fatigue”, and “Age”.

DG&G argue that it would be wrong to include these six specifications with the previous six specifications. The associated estimates of the treatment effect are likely to be hugely different depending on whether “Fatigue” is a collider or a mediator.

But how can we know which DAG is correct? DG&G argue that we can’t. The true model is “uncertain”, so DG&G recommend that we should conduct separate SCAs, one for the DAG in Figure 2a, and one for the DAG in Figure 2b.

**DG&G Conclude**

DG&G conclude their paper by addressing the discomfort that researchers may experience when doing a SCA that only has six, or a relatively small number of model specifications:

“Some readers may feel that, no matter how well justified, a multiverse of six specifications is too small, and that a credible analysis requires many more models—perhaps a few dozen or hundreds at a minimum. We argue that this intuition should be actively resisted. If a smaller, homogeneous multiverse yields better inferences than a larger one that includes many nonequivalent specifications, it should clearly be preferred.”

**Extensions**

There are many scenarios that DG&G do not address in their paper, but in principle the framework is easily extended. Consider alternative estimation procedures. If the researcher does not have strong priors that one estimation procedure is superior to the other, then both could be assumed to be “equivalent” and should be included.

Consider another scenario: Suppose the researcher suspects endogeneity and uses instrumental variables to correct for endogeneity bias. In this case, one might consider IV methods to be superior to OLS, so that the two methods were not “equivalent” and only IV estimates should be included in the SCA.

Alternatively, suppose there is evidence of endogeneity, but the instruments are weak so that the researcher cannot know which is the “best” method. As IV and OLS are expected to produce different estimates, one might argue that this is conceptually similar to the “Fatigue” case above. Following DG&G, this would be considered a Type U scenario, and separate SCAs should be performed for each of the estimation procedures.

**Final Thoughts**

It’s not all black and white. In the previous example, since the researcher cannot determine whether OLS or IV is better, why not forget Type U and combine the specifications in one SCA?

This highlights a tension between two goals of SCA. One goal is to narrow down the set of specifications to those most likely to identify the “true” effect, and then observe the range of estimates within this set.

Another goal is less prescriptive about the “best” specifications. Rather, it is interested in identifying factors associated with the heterogeneity among estimates. A good example of this approach is TABLE 1 in the “specr” and “speccurve” blogs identified at the top of this post.

Despite this subjectivity, DAGs provide a useful approach for identifying sensible specifications for a SCA. Everybody should do a DAG before doing a specification curve analysis!

*NOTE: Bob Reed is Professor of Economics and the Director of*[***UCMeta***](https://www.canterbury.ac.nz/business-and-law/research/ucmeta/)*at the University of Canterbury. He can be reached at*[*bob.reed@canterbury.ac.nz*](mailto:bob.reed@canterbury.ac.nz)*.*

**REFERENCES**

[Del Giudice, M., & Gangestad, S. W. (2021). A traveler’s guide to the multiverse: Promises, pitfalls, and a framework for the evaluation of analytic decisions. *Advances in Methods and Practices in Psychological Science*, *4*(1), 2515245920954925](https://journals.sagepub.com/doi/pdf/10.1177/2515245920954925).

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2024/11/18/reed-do-a-dag-before-you-do-a-specification-curve-analysis/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2024/11/18/reed-do-a-dag-before-you-do-a-specification-curve-analysis/?share=facebook)

Like Loading...