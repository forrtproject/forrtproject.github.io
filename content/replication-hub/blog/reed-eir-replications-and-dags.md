---
title: "REED: EiR* — Replications and DAGs"
date: 2020-03-10
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Causal effects"
  - "Causal interpretation"
  - "DAGitty"
  - "DAGs"
  - "Directed Acyclic Graphs"
  - "Observational data"
draft: false
type: blog
---

###### *[\* EiR = Econometrics in Replications, a feature of TRN that highlights useful econometrics procedures for re-analysing existing research.]*

###### In recent years, DAGs (Directed Acyclic Graphs) have received increased attention in the medical and social sciences as a tool for determining whether causal effects can be estimated. A brief introduction can be found ***[here](https://cran.r-project.org/web/packages/ggdag/vignettes/intro-to-dags.html)***. While DAGs are commonly used to guide model specification, they can also be used in the post-publication assessment of studies.

###### Despite widespread recognition of the dangers of drawing causal inferences from observational studies, and with general, nominal acknowledgement that “correlation does not imply causation”, it is still standard practice for researchers to discuss estimated relationships from observational studies as if they represent causal effects.

###### In this blog, we show how one can apply DAGs to previously published studies to assess whether implied claims of causal effects are justified. For our example, we use the [***Mincer earnings regression***](https://en.wikipedia.org/wiki/Mincer_earnings_function), which has appeared in hundreds, if not thousands, of economic studies. The associated wage equation relates individuals’ observed wages to a number of personal characteristics:

###### *ln(wage) =* *b**0* *+* *b**1* *Educ +* *b**2* *Exp +* *b**3* *Black +* *b**4* *Female + error**,*

###### where *ln(wage)* is the natural log of wages, *Educ* is a measure of years of formal education, *Exp* is a measure of years of labor market experience, and *Black* and *Female* are dummy variables indicating an individual’s race (black) and sex.

###### The parameters *b1* and *b2* are comonly interpreted as the rate of return to education and labor market experience, respectively. The coefficients on *Black* and *Female* are commonly interpreted as measuring labor market discrimination against blacks and women.

###### Suppose one came across an estimated Mincer wage regression like the one above in a published study. Suppose further that the author of that study attached causal interpretations to the respective estimated parameters. One could use DAGs to determine whether those interpretations were justified.

###### To do that, one would first hypothesize a DAG that summarized all the common cause relationships between the variables. By way of illustration, consider the DAG in the figure below, where *U* is an unobserved confounder.1

###### TRN (20200310)

###### In this DAG, *Educ* affects *Wage* through a direct channel, *Educ -> Wage*, and an indirect channel, *Educ -> Exp -> Wage*. The Mincerian regression specification captures the first of these channels. However, it omits the second because the inclusion of *Exp* in the specification blocks the indirect channel. Assuming both channels carry positive associations, the estimated rate of return to education in the Mincerian wage regression will be downwardly biased.

###### We can use the same DAG to assess the other estimated parameters. Consider the estimated rate of return on labor market experience. The DAG identifies both a direct causal path (*Exp -> Wage*) and a number of non-causal paths. *Exp <- Female -> Wage* is one non-causal path, as is *Exp <- Educ -> Wage.* Including the variables *Educ* and *Female* in the regression equation blocks these non-causal paths. As a result, the specification solely estimates the direct causal effect, and thus provides an unbiased estimate of the rate of return of labor market experience on wages.

###### In a similar fashion, one can show that given the DAG above, one cannot interpret the estimated values of *b**3* and *b**4* as estimates of the causal effects of labor market and sex discrimination.

###### DAGs also have the benefit of suggesting tests that allow one to assess the validity of a given DAG. In particular, the DAG above implies the following independences:2

###### 1) *Educ* ⊥ *Female*

###### 2) *Exp* ⊥ *Black* | *Educ*

###### 3) *Female* ⊥ *Black*

###### Rejection of one or more of these would indicate that the DAG is not supported by the data.

###### In practice, there are likely to be many possible DAGs for a given estimated equation. If a replicating researcher can obtain the data and code for an original study, he/she could then posit a variety of DAGs that seemed appropriate given current knowledge about the subject.

###### For each DAG, one could determine whether the conditions exist such that the estimated specification allows for a causal interpretation of the key parameters. If so, one could then use the model implications to assess whether the DAG was “reasonable”, as evidenced by non-conflicting data.

###### If no DAGs can be found that support a causal interpretation, or if adequacy tests cause one to eliminate all such DAGs, one could then request that the original author provide a DAG that would support their causal interpretations. In this fashion, existing studies could be assessed to determine if there is an evidentiary basis for causal interpretation of the estimated effects.

###### 1 This DAG is taken from Felix Elwert’s course, ***[Directed Acyclic Graphs for Causal Inference](https://statisticalhorizons.com/seminars/public-seminars/directed-acyclic-graphs-for-causal-inference-fall19)***, taught through ***[Statistical Horizons](https://statisticalhorizons.com/)***.

###### 2 A useful, free online tool for drawing and assessing DAGs, is DAGitty, which can be found ***[here](http://dagitty.net/)***.

###### *Bob Reed is a professor of economics at the University of Canterbury in New Zealand. He is also co-organizer of the blogsite The Replication Network. He can be contacted at bob.reed@canterbury.ac.nz.*

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2020/03/10/reed-eir-replications-and-dags/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2020/03/10/reed-eir-replications-and-dags/?share=facebook)

Like Loading...