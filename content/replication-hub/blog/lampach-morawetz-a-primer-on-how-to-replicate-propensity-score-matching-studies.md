---
title: "LAMPACH & MORAWETZ: A Primer on How to Replicate Propensity Score Matching Studies"
date: 2016-08-05
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Lampach"
  - "Morawetz"
  - "propensity score matching"
  - "PSM"
  - "replication"
draft: false
type: blog
---

###### Propensity Score Matching (PSM) approaches have become increasingly popular in empirical economics. These methods are intuitively appealing.  PSM procedures are available in well-known software packages such as R or Stata.

###### The fundamental idea behind PSM is that treated observations are compared with un-treated control observations only if the two observations are otherwise identical. This frees the researcher from having to specify a functional form explicitly relating outcomes to control variables.  In its place, PSM requires a matching algorithm. The choice of the best matching algorithm is, however an ongoing debate.

###### A quick tour through the literature is provided by a pair of articles from Dehejia and Wahba (2002, 1999), along with replications by Smith and Todd (2005) and Diamond and Sekhon (2013), which highlights different matching approaches.  As these studies use data from a randomized controlled trial (RCT) by LaLonde (1986), they provide an illuminating comparison between different variants of PSM. Other comparisons using data RCTs can be found in Peikes et al. (2008) and Wilde and Hollister (2007).  Huber et al. (2013) uses Monte Carlo experiments to compare the performance of different matching methods.

###### Two studies that replicate PSM research are Duvendack and Palmer (2012) and our own recent study, Lampach and Morawetz (2016).  Both reach a similar conclusion: the key issue is identification. Without the appropriate research design, matching will be misleading.

###### A good replication needs to do more than just check if the results are robust to an alternative matching algorithm.

###### How can one determine whether a given research design is appropriate? We find Chapter 1.2 “Cochran’s Basic Advice” in the classic book by Paul Rosenbaum (2010) helpful. He distinguishes between “Better observational studies” and “Poorer observational studies” by stressing the importance of four main points:

###### — Clearly defined treatments (including the starting point of a treatment), covariates and outcomes

###### — The treatment should be close to random

###### — Good comparability of treatment and control observations

###### — Explicit testing of plausible alternatives explanations for the measured effect.

###### Starting from here, researchers will also find helpful the guidelines by Caliendo and Kopeinig (2008) and Imbens (2015).

###### Researchers interested in replicating PSM studies may also find helpful our recent paper in *Applied Economics* (Lampach and Morawetz, 2016).  We provide a step-by-step guide for how to undertake a PSM study in the context of a replication by following Caliendo and Kopeinig (2008).  PSM studies are particularly rewarding studies to replicate because they incorporate many decisions during the process of implementing the research (even given an appropriate research design).  A replication of PSM studies will be illuminating both because it allows one to better appreciate the many decisions that must be made, and because it allows one to determine the robustness of the results to alternative choices in research design.

###### We learned a lot from our replication experience and are grateful to the authors of the original work to provide us with data and code, the authors who wrote the useful guidelines, the journal which made it possible to publish the article, and finally to the organizers of *The Replication Network* for inviting us to write this blog.

###### REFERENCES:

###### Caliendo, M., Kopeinig, S., 2008. Some Practical Guidance for the Implementation of Propensity Score Matching. J. Econ. Surv. 22, 31–72. doi:10.1111/j.1467-6419.2007.00527.x

###### Chemin, M., 2008. The Benefits and Costs of Microfinance: Evidence from Bangladesh. J. Dev. Stud. 44, 463–484. doi:10.1080/00220380701846735

###### Dehejia, R.H., Wahba, S., 2002. Propensity Score-Matching Methods for Nonexperimental Causal Studies. Rev. Econ. Stat. 84, 151–161. doi:10.1162/003465302317331982

###### Dehejia, R.H., Wahba, S., 1999. Causal Effects in Nonexperimental Studies: Reevaluating the Evaluation of Training Programs. J. Am. Stat. Assoc. 94, 1053–1062. doi:10.1080/01621459.1999.10473858

###### Diamond, A., Sekhon, J.S., 2013. Genetic Matching for Estimating Causal Effects: A General Multivariate Matching Method for Achieving Balance in Observational Studies. Rev. Econ. Stat. 95, 932–945. doi:10.1162/REST\_a\_00318

###### Duvendack, M., Palmer-Jones, R., 2012. High Noon for Microfinance Impact Evaluations: Re-investigating the Evidence from Bangladesh. J. Dev. Stud. 48, 1864–1880. doi:10.1080/00220388.2011.646989

###### Huber, M., Lechner, M., Wunsch, C., 2013. The performance of estimators based on the propensity score. J. Econom. 175, 1–21. doi:10.1016/j.jeconom.2012.11.006

###### Imbens, G.W., 2015. Matching Methods in Practice: Three Examples. J. Hum. Resour. 50, 373–419. doi:10.3368/jhr.50.2.373

###### Jena, P.R., Chichaibelu, B.B., Stellmacher, T., Grote, U., 2012. The impact of coffee certification on small-scale producers’ livelihoods: a case study from the Jimma Zone, Ethiopia. Agric. Econ. 43, 429–440. doi:10.1111/j.1574-0862.2012.00594.x

###### LaLonde, R.J., 1986. Evaluating the Econometric Evaluations of Training Programs with Experimental Data. Am. Econ. Rev. 76, 604–620.

###### Lampach, N., Morawetz, U.B., 2016. Credibility of propensity score matching estimates. An example from Fair Trade certification of coffee producers. Appl. Econ. 48, 4227–4237. doi:10.1080/00036846.2016.1153795

###### Peikes, D.N., Moreno, L., Orzol, S.M., 2008. Propensity Score Matching. Am. Stat. 62, 222–231. doi:10.1198/000313008X332016

###### Rosenbaum, P.R., 2010. Design of observational studies. Springer, New York.

###### Smith, J.A., Todd, P.E., 2005. Does matching overcome LaLonde’s critique of nonexperimental estimators? J. Econom., Experimental and non-experimental evaluation of economic policy and models 125, 305–353. doi:10.1016/j.jeconom.2004.04.011

###### Wilde, E.T., Hollister, R., 2007. How close is close enough? Evaluating propensity score matching using data from a class size reduction experiment. J. Policy Anal. Manage. 26, 455–477. doi:10.1002/pam.20262

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2016/08/05/lampach-morawetz-a-primer-on-how-to-replicate-propensity-score-matching-studies/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2016/08/05/lampach-morawetz-a-primer-on-how-to-replicate-propensity-score-matching-studies/?share=facebook)

Like Loading...