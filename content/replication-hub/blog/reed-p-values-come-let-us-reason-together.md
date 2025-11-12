---
title: "REED: P-Values: Come, Let Us Reason Together"
date: 2019-05-14
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "American Statistical Association"
  - "Binary thinking"
  - "Dichotomous thinking"
  - "Journal policies"
  - "p-values"
  - "Statistical inference"
  - "The American Statistician"
draft: false
type: blog
---

###### Like many others, I was aware that there was controversy over null-hypothesis statistical testing. Nevertheless, I was shocked to learn that leading figures in the American Statistical Association (ASA) recently called for abolishing the term “statistical significance”.

###### In an editorial in the ASA’s flagship journal, *The American Statistician*, ***[Ronald Wasserstein, Allen Schirm, and Nicole Lazar write](https://www.tandfonline.com/doi/full/10.1080/00031305.2019.1583913)***: “*Based on our review of the articles in this special issue and the broader literature, we conclude that it is time to stop using the term ‘statistically significant’ entirely*.”

###### The ASA advertises itself as “***[the world’s largest community of statisticians](https://www.amstat.org/ASA/about/home.aspx?hkey=6a706b5c-e60b-496b-b0c6-195c953ffdbc)***”. For many who have labored through an introductory statistics course, the heart of statistics consists of testing for statistical significance. The fact that leaders of “the world’s largest community of statisticans” are now calling for abolishing “statistical significance” is jarring.

###### The fuel for this insurgency is an objection to dichotomous thinking: Categorizing results as either “*worthy*” or “*unworthy*”. P-values are viewed as complicit in this crime against scientific thinking because researchers use them to “*select which findings to discuss in their papers*.”

###### Against this the authors argue: “*No p-value can reveal the plausibility, presence, truth, or importance of an association or effect. Therefore, a label of statistical significance does not mean or imply that an association or effect is highly probable, real, true, or important. Nor does a label of statistical nonsignificance lead to the association or effect being improbable, absent, false, or unimportant. For the integrity of scientific publishing and research dissemination, therefore, whether a p-value passes any arbitrary threshold should not be considered at all when deciding which results to present or highlight.*”

###### Are *p*-values a gateway drug to dichotomous thinking? While the authors caution about the use of *p*-values, they stop short of calling for their elimination. In contrast, a number of prominent journals now ban their use (see ***[here](https://thenewstatistics.com/itns/2018/02/03/banning-p-values-the-journal-political-analysis-does-it/)*** and ***[here](https://www.sciencenews.org/blog/context/p-value-ban-small-step-journal-giant-leap-science)***). Like many controversies in statistics, the issue revolves around causality. Does the use of *p*-values cause dichotomous thinking, or does dichotomous thinking cause the use of *p*-values?

###### Like it or not, we live in a dichotomous world. Roads have forks in them. Limited journal space forces researchers to decide which results to report. Limited attention spans force readers to decide which results to focus on. To suggest that eliminating *p*-values will change the dichotomous world we live in is to confuse correlation with causation. The relevant question is whether *p*-values are a suitable statistic for selecting among empirical findings.

###### Are *p*-values “wrong”? Given all the bad press about *p*-values, one might think that there was something inherently flawed about *p*-values. As in, they mismeasure or misrepresent something. But nobody has ever accused *p*-values of being “wrong”. *P*-values measure exactly what they are supposed to. Assuming that (1) one has correctly modelled the data generating process (DGP) and associated sampling procedure, and (2) the null hypothesis is correct, *p*-values tell one how likely it is to have estimated a parameter value that is as far away, or farther, from the hypothesized value as the one observed. It is a statement about the likelihood of observing particular kinds of data conditional on the validity of given assumptions. That’s what *p*-values do, and to date nobody has accused *p*-values of doing that incorrectly.

###### Do the assumptions underlying *p*-values render then useless? The use of single-valued hypotheses (such as the null hypothesis) and parametric assumptions about the DGP certainly vitiate the validity and robustness of statistical inference, and *p*-values. However, this can’t be the main reason why *p*-values are objectionable. The major competitors to frequentist statistics, the likelihood paradigm and Bayesian statistics, also rely on single-valued hypotheses and parametric assumptions of the DGP. Further, for those bothered by the parametric assumptions underlying the DGP, non-parametric methods are available.

###### Do *p*-values answer the right question? Whether *p*-values are useful depends on the question one is trying to answer. Much, if not most, of estimation is concerned with estimating quantities, such as the size of the relationship between variables. In contrast, the most common use of *p*-values is to determine the existence of a relationship. However, the two are not unrelated. In measuring a quantity, it is natural to ask whether the relationship really exists or, alternatively, whether the observed relationship is the result of random chance.

###### It is precisely on the question of existence where the controversy over *p*-values enters. *P*-values are not well-suited to determine existence. Wasserstein, Schirm, and Lazar state: “*No p-value can reveal the plausibility, presence, truth, or importance of an association or effect.”*  Technically, *p*-values report probabilities about observing certain kinds of data conditional on an underlying hypothesis being correct. They do not report the probability that the underlying hypothesis is correct.

###### This is true. Kind of. And therein lies the rub. Consider the following thought experiment: Imagine you run two regressions. In the first regression, you regress Y on X1 and test whether the coefficient on X1 equals 0. You get a *p*-value of 0.02. In the second regression, you regress Y on X2 and test whether the coefficient on X2 equals 0. You get a *p*-value of 0.79. Which variable is more likely to have an effect on Y? X1 or X2?

###### If you respond by saying that you can’t answer that question because “*No p-value can reveal the plausibility, presence, truth, or importance of an association or effect”,* I am going to say that I don’t believe you really believe that. Yes – the *p*-value is a probability about the data, not the hypothesis. Yes – if the coefficient equals zero, you are just as likely to get a *p*-value of 0.02 as 0.79. Yes – the coefficient either equals zero or it doesn’t equal zero, and it almost certainly does not equal exactly zero, so both null hypotheses are wrong. But if you had to make a choice, even knowing all that, I contend that most researchers would choose X1. And not without reason.

###### In the long run, performing many tests, they are more likely to be correct if they choose the variable with the lower *p*-value. Further, experience tells them that variables with low *p*-values generally have more substantial effects than variables with high *p*-values. So while it is difficult to know exactly *what* *p*-values have to say about the tested hypothesis, they say *something*. In other words, *p*-values contain information about the probability that the tested hypothesis is true.

###### For purists who can’t bring themselves to admit this, consider some further arguments. In deciding between two competing hypotheses, Bayes factors are commonly used as evidence for/against the null hypothesis versus an alternative. But there is a one-to-one mapping between Bayes factors and *p*-values. Logic dictates that if Bayes factors contain evidentiary information about the null hypothesis, and *p*-values map one-to-one to Bayes factors, then *p*-values must also contain evidentiary information about the null hypothesis.

###### But wait, there’s more! A recent simulation study published in the journal *Meta-Psychology* used “signal detection theory” to compare a variety of approaches for distinguishing “signals” from “no signals”. It concluded: “…*p*-values were effective, though not perfect, at discriminating between real and null effects” (***[Witt, 2019](https://open.lnu.se/index.php/metapsychology/article/view/871)***). Consistent with that, recent studies on reproducibility have found that a strong predictor of replication success is the *p*-value reported in the original study (***[Center for Open Science, 2015](https://www.researchgate.net/publication/281286234_Estimating_the_Reproducibility_of_Psychological_Science)***; ***[Altmejd et al., 2019](https://osf.io/preprints/metaarxiv/zamry/)***).

###### Taken together, I believe the arguments above make a compelling case that *p*-values contain information in discriminating between real and spurious empirical findings, and that this information can be useful in selecting variables.

###### *P*-values are useful, but how useful? Unfortunately, while *p*-values contain information about the existence of observed relationships, the specific content of that information is not well defined. Not only is the information ill-defined, but the measure itself is a noisy one: In a given application, the range of observed *p*-values can be quite large. For example, if the null hypothesis is true, the distribution of *p*-values will be uniform over [0,1]. Thus one is just as likely to obtain a *p*-value of 0.02 as 0.79 if there is no effect.

###### Further complicating the interpretation of *p*-values is the fact that the computation of a *p*-value assumes a particular DGP, and this DGP is almost certainly never correct. For example, statistical inference typically assumes that the population effect is homogeneous. Specifically, it assumes the effect is the same for all the subjects in the sample, and the same for the subjects in the sample and the associated population. It is highly unlikely that this would ever be correct when human subjects are involved. If the underlying population effects are heterogeneous, ***[p-values will be “too small”, and so will the associated confidence intervals](https://replicationnetwork.com/2019/05/01/your-p-values-are-too-small-and-so-are-your-confidence-intervals/)***.

###### Conclusion. We live in a dichotomous world. Banning statistical inference will not change that. Limited journal space and limited attention spans mean that researchers will always be making decisions about which results to report, and which results to pay attention to. P-values can help researchers make those decisions.

###### That being said it, it should always be remembered that *p*-values are noisy indicators and should not be overly relied upon. The evidentiary value of a *p*-value = 0.04 is practically indistinguishable from a *p*-value = 0.06. In contrast, the evidentiary value against the null hypothesis is stronger for a *p*-value = 0.02 compared to a *p*-value = 0.79. How much stronger? That is not clear. Statistics can only take us so far.

###### *P*-values should be one part, but only one part, of a larger suite of estimates and analyses that researchers use to learn from data. Statisticians and their ilk could do us a real service by providing greater guidance on how best to do that. The discussion about statistical inference and *p*-values would profit by veering more in this direction.

###### *Bob Reed is a professor of economics at the University of Canterbury in New Zealand. He is also co-organizer of the blogsite The Replication Network. He can be contacted at*[*bob.reed@canterbury.ac.nz*](mailto:bob.reed@canterbury.ac.nz)*.*

###### 

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2019/05/14/reed-p-values-come-let-us-reason-together/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2019/05/14/reed-p-values-come-let-us-reason-together/?share=facebook)

Like Loading...