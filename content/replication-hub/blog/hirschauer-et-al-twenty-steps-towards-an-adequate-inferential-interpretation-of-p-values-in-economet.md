---
title: "HIRSCHAUER et al.: Twenty Steps Towards an Adequate Inferential Interpretation of p-Values in Econometrics"
date: 2019-03-22
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Inferential errors"
  - "Inverse probability error"
  - "Multiple testing"
  - "null hypothesis significance testing"
  - "p-values"
  - "Statistical inference"
draft: false
type: blog
---

###### *This blog is based on the homonymous paper by Norbert Hirschauer, Sven Grüner, Oliver Mußhoff, and Claudia Becker in the **[Journal of Economics and Statistics](https://www.degruyter.com/printahead/j/jbnst)**. It is motivated by prevalent inferential errors and the intensifying debate on p-values – as expressed, for example in the activities of the American Statistical Association including its p-value* ***[symposium](http://ww2.amstat.org/meetings/ssi/2017/index.cfm)*** *in 2017 and the March 19 Special Issue on **[Statistical inference in the 21st century: A world beyond P < 0.05](https://www.tandfonline.com/toc/utas20/73/sup1)**. A related petition in **[Nature](https://www.nature.com/articles/d41586-019-00857-9)** arguing that it is time to retire statistical significance was supported by more than **[800 scientists](https://www.nature.com/magazine-assets/d41586-019-00857-9/data-and-list-of-co-signatories)**. While we provide more details and practical advice, our 20 suggestions are essentially in line with this petition.*

###### Even if one is aware of the fundamental pitfalls of null hypothesis statistical testing (NHST), it is difficult to escape the categorical reasoning that is so entrancingly suggested by its dichotomous significance declarations. With a view to the *p*-value’s deep entrenchment in current research practices and the apparent need for a basic consensus on how to do things in the future, we suggest twenty immediately actionable steps to reduce widespread inferential errors.

###### Our propositions aim at fostering the logical consistency of inferential arguments, which is the prerequisite for understanding what we can and what we cannot conclude from both original studies and replications. They are meant to serve as a discussion base or even tool kit for editors of economics journals who aim at revising their guidelines to increase the quality of published research.

###### **Suggestion 1:** Refrain from using *p*-values if you have data of the *whole population of interest*. In this case, no generalization (inference) from the sample to the population is necessary. Do not use *p*-values either if you have a *non-random sample* that you chose for convenience reasons instead of using probability methods: *p*-values conceptually require a random process of data generation.

###### **Suggestion 2:** Distinguish the function of the *p*-value depending on the type of the data generating process. In the random sampling case, you are concerned with generalizing from the sample to the population (*external validity*). In the random assignment case, you are concerned with the causal treatment effects in an experiment with random assignment (*internal validity*).

###### **Suggestion 3:** When using *p*-values as an inferential aid in the random sampling case, provide convincing arguments that your sample represents at least approximately a random sample. To avoid misunderstandings, transparently state how and from which population the random sample was drawn and, consequently, *to which target population you want to generalize*.

###### **Suggestion 4:** Do use wordings that ensure that the *p*-value is understood as a *graded measure of the strength of evidence against the null*, and that *no* particular information is associated with a *p*-value being below or above some arbitrary threshold such as 0.05.

###### **Suggestion 5:** Do *not* insinuate that the *p*-value denotes an epistemic (posterior) probability of a scientific hypothesis given the evidence in your data. Stating that you found an effect with an “error probability” of *p* is misleading. It erroneously suggests that the *p*-value is the probability of the null – and therefore the probability of being “in error” when rejecting it.

###### **Suggestion 6:** Do *not* insinuate that a low *p*-value indicates a large or even practically relevant effect size. Use wordings such as “large” or “relevant” but refrain from using “significant” when discussing the effect size – at least as long dichotomous interpretations of *p*-values linger on in the scientific community.

###### **Suggestion 7:** Do *not* suggest that high *p*-values can be interpreted as an indication of no effect (“evidence of absence”). Do *not* even suggest that high *p*-values can be interpreted as “absence of evidence.” Doing so would negate the evident findings from your data.

###### **Suggestion 8:** Do *not* suggest that *p*-values below 0.05 can be interpreted as evidence in favor of the just-estimated coefficient. Formulations saying that you found a “statistically significant effect of size z” should be avoided because they mix up *estimating* and *testing*. The strength of evidence against the null cannot be translated into evidence in favor of the estimate that you happened to find in your sample.

###### **Suggestion 9:** Avoid the terms “hypothesis *testing*” and “*confirmatory* analysis,” or at least put them into proper perspective and communicate that it is impossible to infer from the *p*-value whether the null hypothesis or an alternative hypothesis is true. In any ordinary sense of the terms, a *p*-value cannot “test” or “confirm” a hypothesis, but only describe data frequencies under a certain statistical model including the null.

###### **Suggestion 10:** Restrict the use of the word “evidence” to the concrete findings in your data and clearly distinguish this *evidence* from your *inferential conclusions*, i.e., the generalizations you make based on your study and all other available evidence.

###### **Suggestion 11:** Do explicitly state whether your study is *exploratory* (i.e. aimed at generating new hypotheses) or whether you aim at producing new evidence for *pre-specified* (ex ante) hypotheses.

###### **Suggestion 12:** In *exploratory* search for potentially interesting associations, do never use the term “hypotheses *testing*” because you have no testable ex ante hypotheses.

###### **Suggestion 13:** If your study is (what would be traditionally called) “confirmatory” (i.e., aimed at producing evidence regarding *pre-specified* hypotheses), exactly report in your paper the hypotheses that you drafted as well as the model you specified *before* seeing the data. In the results section, clearly relate findings to these ex ante hypotheses.

###### **Suggestion 14:** When studying pre-specified hypotheses, clearly distinguish two parts of the analysis: (i) the description of the *empirical* *evidence* that you found in your study (What is the evidence in the data?) and (ii) the *inferential reasoning* that you base on this evidence (What should one reasonably believe after seeing the data?). If applicable, a third part should outline the recommendations or *decisions* that you would make all things considered, including the weights attributed to type I and type II errors (What should one do after seeing the data?).

###### **Suggestion 15:** If you fit your model to the data even though you are concerned with pre-specified hypotheses, explicitly demonstrate that your data-contingent model specification does *not* constitute “*hypothesizing after the results are known*.” When using *p*-values as an inferential aid, *explicitly* consider and comment on *multiple comparisons*.

###### **Suggestion 16:** Explicitly distinguish statistical and scientific inference. *Statistical* *inference* is about generalizing from a random sample to its parent population. This is only the first step of *scientific* *inference*, which is the totality of reasoned judgments (inductive generalizations) that we make in the light of the total body of evidence. Be clear that a *p*-value, can do *nothing* to assess the generalizability of results beyond a random sample’s parent population.

###### **Suggestion 17:** Provide information regarding the *size of your estimate*. In many regression models, a meaningful representation of magnitudes will require going beyond coefficient estimates and displaying marginal effects or other measures of effect size.

###### **Suggestion 18:** Do *not* use asterisks (or the like) to denote different levels of “statistical significance.” Doing so could instigate erroneous categorical reasoning.

###### **Suggestion 19:** Provide *p*-values if you use the graded strength of evidence against the null as an inferential aid (amongst others). However, do *not* classify results as being “statistically significant” or not. That said, avoid using the terms “statistically significant” and “statistically non-significant” altogether.

###### **Suggestion 20:** Provide *standard errors* for all effect size estimates. Additionally, provide *confidence intervals* for the focal variables associated with your pre-specified hypotheses.

###### While following these suggestions would prevent overconfident yes/no conclusions both in original and replication studies, we do not expect that all economists will endorse all of them at once. Some, such as providing effect size measures and displaying standard errors, are likely to cause little controversy. Others, such as renouncing dichotomous significance declarations and giving up the term “statistical significance” altogether, will possibly be questioned.

###### Opposition against giving up conventional yes/no declarations is likely to be fueled by the fact that no joint understanding and consensus has yet been reached as to which formulations are appropriate to avoid cognitive biases and communicate the correct but per se limited informational content of frequentist concepts such as *p*-values and confidence intervals. Such joint understandings and consensus regarding best practice are in dire need.

###### *Prof. **[Norbert Hirschauer](https://www.landw.uni-halle.de/prof/lu/?lang=en)**, Dr. **[Sven Grüner](https://www.landw.uni-halle.de/prof/lu/mitarbeiter___doktoranden/gruener/)**, and Prof. **[Oliver Mußhoff](https://www.uni-goettingen.de/en/66131.html)** are agricultural economists in Halle (Saale) and Göttingen, Germany. Prof. **[Claudia Becker](https://statistik.wiwi.uni-halle.de/personal/?lang=en)** is an economic statistician in Halle (Saale). The authors are interested in connecting with economists who have an interest to further concrete steps that help prevent inferential errors associated with conventional significance declarations in econometric studies.*

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2019/03/22/hirschauer-et-al-twenty-steps-towards-an-adequate-inferential-interpretation-of-p-values-in-econometrics/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2019/03/22/hirschauer-et-al-twenty-steps-towards-an-adequate-inferential-interpretation-of-p-values-in-econometrics/?share=facebook)

Like Loading...