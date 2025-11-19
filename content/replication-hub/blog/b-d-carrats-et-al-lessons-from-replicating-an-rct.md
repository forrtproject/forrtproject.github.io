---
title: "BÉDÉCARRATS et al.: Lessons from Replicating an RCT"
date: 2019-04-30
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Al Amana"
  - "American Economic Journal: Applied Economics"
  - "Development Economics"
  - "IREE"
  - "Microcredit"
  - "Morocco"
  - "Randomized controlled trials (RCTs)"
  - "replication"
  - "Trimming"
  - "Verification tests"
draft: false
type: blog
---

###### In 2015, Crépon, Devoto, Duflo and Pariente (2015, henceforth CDDP), published the results of a randomized control trial (RCT) in a special issue of the *AEJ: Applied Economics*. CDDP evaluated the impact of a microcredit program conducted in Morocco with Al Amana, Morocco’s largest microcredit institution. Their total sample consisted of 5,551 households spread across 162 rural villages. They concluded that microcredit had substantial, significant impacts on self-employment assets, outputs, expenses and profits.

###### We replicated their paper and identified a number of issues that challenge their conclusions. In this blog, we briefly summarize the results of our analysis and then offer ten lessons learned from this research effort. Greater detail about our replication can be found in [***our recently published paper in the International Journal for the Re-Views of Empirical Economics***](https://www.iree.eu/publications/publications-in-iree/estimating-microcredit-impact-with-low-take-up-contamination-and-inconsistent-data-a-replication-study-of-crepon-devoto-duflo-and-pariente-american-economic-journal-applied-economics-2015/)**.**

###### **A Summary of Key Results from Our Replication**

###### We found that CDDP’s results depend heavily on how one trims the data. CDDP used two different trimming criteria for their baseline and endline samples. We illustrate the fragility of their results by showing that they are not robust to small changes in the trimming thresholds at endline. Using a slightly looser criterion produces insignificant results for self-employment outputs (sales and home consumption) and profits. Applying a slightly stricter criterion generates significant positive impacts on expenses, significant negative impacts on investment, and insignificant impacts on profits. The latter results defy a coherent interpretation.

###### We found substantial and significant imbalances in the baseline for a number of important variables, including on the outcome variables of this RCT.

###### Perhaps relatedly, we estimated implausible “treatment effects” on some variables: For example, we found significant “treatment effects” for household head gender and spoken language.

###### We documented numerous coding errors. The identified coding errors altered  approximately 80% of the observations. Correcting these substantially modify the estimated average treatment effects.

###### There were substantial inconsistencies between survey and administrative data. For example, the administrative data used by CDDP identified 435 households as clients, yet 241 of these said they had not borrowed from Al Amana. Another 152 households self-reported having a loan from Al Amana, but were not listed as borrowers in Al Amana’s records.

###### We found sampling errors. For example, the sex and age composition for approximately 20% of the households interviewed at baseline and supposedly re-interviewed at endline differs to such an extent that it is implausible that the same units were re-interviewed in these cases.

###### We show in our paper that correcting these data problems substantially affects CDDP’s results.

###### In addition, we found that CDDP’s sample characteristics differed in important ways from population characteristics, raising questions about the representativeness of the sample, and hence, external validity.

###### **Ten Lessons Learned**

###### The following are ten lessons that we learned as a result of our replication, with a focus on development economics.

###### 1) Peer review cannot be relied upon to prevent suspect data analyses from being published, even at top journals such as the *AEJ:AE*. While some of the data issues we document would be difficult to identify without a careful re-working of the data, others were more obvious and should have been spotted by reviewers.

###### 2) Replication, and more specifically, verification tests (Clemens, 2017), should play a more prominent role in research. Sukhtantar (2017) systematically reviewed development economics articles published in ten top-ranking journals since 2000. Of 120 RCTs, he found 15 had been replicated. Only two of these had been subjected to verification tests, in which the original data are examined for data, coding, and/or sampling flaws. This suggests that development economists generally assume that the data, sampling and programming code that underlie published research are reliable. A corollary is that multiple replications/verification tests may be needed to uncover problems in a study. For example, CDDP has been subject to two previous replications involving verification testing (Dahal & Fiala 2018; Kingi et al. 2018). These missed the errors we identified in our replication.

###### 3) The discipline should do more to encourage better data analysis, as separate from econometric methodology. Researchers rarely receive formal training in programming and data handling. However, generic recommendations exist (Wickham 2014; Peng 2011; Cooper et al. 2017). These should be better integrated into researcher training.

###### 4) Empirical studies should publish the *raw* data used for their analyses whenever possible. Our replication was feasible because the authors and the journal shared the data and code used to produce the published results. Although the *AEJ:AE* data availability policy[[1]](#_ftn1) states that raw data should be made available, this is not always the case. Raw data were available for just three of the six RCTs in the *AEJ:AE* 7(1) special issue on microcredit (Crépon et al. 2015; Attanasio et al. 2015; Augsburg et al. 2015). A subset of pre-processed data was available for two other RCTs (Banerjee et al. 2015; Angelucci, Karlan, & Zinman 2015). While the Banerjee et al. article included a URL link to the raw data, the corresponding website no longer exists.

###### 5) Survey practices for RCTs should be improved. Data quality and sampling integrity are systematically analyzed for standard surveys (such as the Demographic and Health Surveys and Living Standards Measurement Surveys) and are reported in the survey reports’ appendices. Survey methods and practices used for RCTs should be aligned with the quality standards established for household surveys conducted by national statistical systems (Deaton 1997; United Nations Statistical Division 2005). This implies adopting sound unit definitions (household, economic activity, etc.), drawing on nationally tried-and-tested questionnaire models, working with professional statisticians with experience of quality surveys in the same country (ideally nationals), properly training and closely supervising survey interviewers and data entry clerks, and analyzing and reporting measurement and sampling errors.

###### 6) RCT reviews should pay greater attention to imbalances at baseline. Many RCTs do not collect individual-level baseline surveys (4 in 6 did so in the *AEJ:AE* special issue on microcredit, Meager 2015), and some randomization proponents go so far as to recommend dropping baseline surveys to concentrate more on running larger endline surveys (Muralidharan 2017). RCTs need to include baseline surveys that offer the same statistical power as their endline surveys to ensure that results at endline are not due to sampling bias at baseline.

###### 7) RCT reviews should also pay close attention to implausible impacts at endline in order to detect sampling errors, such as the household identification errors observed in CDDP. This can also reveal flaws in experiment integrity, such as co-intervention and data quality issues.

###### 8) Best practice should be followed with respect to trimming. Deaton and Cartwright (A. Deaton & Cartwright 2016: 1) issued the following warning about trimming in RCTs, “*When there are outlying individual treatment effects, the estimate depends on whether the outliers are assigned to treatments or controls, causing massive reductions in the effective sample size. Trimming of outliers would fix the statistical problem, but only at the price of destroying the economic problem; for example, in healthcare, it is precisely the few outliers that make or break a programme.*” In general, setting fixed cut-offs for trimming lacks objectivity and is a source of bias, as it does not take into account the structure of the data distribution. Best practice for trimming experimental data consists of using a factor of standard deviation and, ideally, defining this factor based on sample size (Selst & Jolicoeur 1994).

###### 9) RCTs should place their findings in the context of related, non-RCT studies. In their article, CDDP cite 17 references: nine RCTs, four on econometric methodology, three non-RCT empirical studies from India and one economic theory paper. No reference is made to other studies on Morocco, microcredit particularities or challenges encountered with this particular RCT. This is especially surprising since this RCT was the subject of debate in a number of published papers prior to CDDP, all seeking to constructively comment on and contextualize this Moroccan RCT (Bernard, Delarue, & Naudet 2012; Doligez et al. 2013; Morvant-Roux et al. 2014). These references help explain a number of the shortcomings that we identified in our replication.

###### 10) RCTs are over-weighted in systematic reviews. Currently, RCTs dominate systematic reviews. The CDDP paper has already been cited 248 times and is considered a decisive contribution with respect to a long-standing debate on the subject (Ogden 2017). The substantial concerns we raise suggest that CDDP should not *a priori* be regarded as more reliable than the 154 non-experimental impact evaluations on microcredit that preceded it (Bédécarrats 2012; Duvendack et al. 2011).

###### [[1]](#_ftnref1) [www.aeaweb.org/journals/policies/data-availability-policy](http://www.aeaweb.org/journals/policies/data-availability-policy)

###### *Florent Bédécarrats works in the evaluation unit of the French Development Agency (AFD). Isabelle Guérin and François Roubaud are both senior research fellows of the French national Research Institute for Sustainable Development (IRD). Isabelle is a member of the Centre for Social Science Studies on the African, American and Asian Worlds and François is a member of the Joint Research Unit on Development, Institutions and Globalization (DIAL). Solène Morvant-Roux is Assistant Professor at the Institute of Demography and Socioeconomics at the University of Geneva. The opinions expressed are those of the authors and are not attributable to the AFD, the IRD or the University of Geneva. Correspondence can be directed to Florent Bédécarrats at [bedecarratsf@afd.fr](mailto:bedecarratsf@afd.fr)*

###### **References**

###### Angelucci, Manuela, Dean Karlan, Jonathan Zinman. 2015. « Microcredit impacts: Evidence from a randomized microcredit program placement experiment by Compartamos Banco ». *American Economic Journal: Applied Economics* 7 (1): 151-82 [***[available online](https://www.povertyactionlab.org/sites/default/files/publications/182_61%20Angelucci%20et%20al%20Mexico%20Jan2015.pdf)***].

###### Attanasio, Orazio, Britta Augsburg, Ralph De Haas, Emla Fitzsimons, Heike Harmgart. 2015. « The impacts of microfinance: Evidence from joint-liability lending in Mongolia ». *American Economic Journal: Applied Economics* 7 (1): 90-122 [***[available online](https://www.povertyactionlab.org/sites/default/files/publications/487%20Attanasio%20et%20al%20Mongolia%20Jan2015.pdf)***].

###### Augsburg, Britta, Ralph De Haas, Heike Harmgart, Costas Meghir. 2015. « The impacts of microcredit: Evidence from Bosnia and Herzegovina ». *American Economic Journal: Applied Economics* 7 (1): 183-203 [***[available online](https://www.ebrd.com/documents/oce/the-impacts-of-microcredit-evidence-from-bosnia-and-herzegovina.pdf)***].

###### Banerjee, Abhijit, Esther Duflo, Rachel Glennerster, Cynthia Kinnan. 2015. « The miracle of microfinance? Evidence from a randomized evaluation ». *American Economic Journal: Applied Economics* 7 (1): 22-53 [***[available online](https://economics.mit.edu/files/5993)***].

###### Bédécarrats, Florent. 2012. « L’impact de la microfinance : un enjeu politique au prisme de ses controverses scientifiques ». *Mondes en développement* 158: 127‑42 [***[available online](https://doi.org/10.3917/med.158.0127)***].

###### Bédécarrats, Florent, Isabelle Guérin, Solène Morvant-Roux, François Roubaud. 2019. « Estimating microcredit impact with low take-up, contamination and inconsistent data. A replication study of Crépon, Devoto, Duflo, and Pariente (American Economic Journal: Applied Economics, 2015) ». *International Journal for Re-Views in Empirical Economics* 3 (2019‑3) [***[available online](https://doi.org/10.18718/81781.12)***].

###### Bernard, Tanguy, Jocelyne Delarue, Jean-David Naudet. 2012. « Impact evaluations: a tool for accountability? Lessons from experience at Agence Française de Développement ». *Journal of Development Effectiveness* 4 (2): 314-327 [***[available online](https://doi.org/10.1080/19439342.2012.686047)***].

###### Clemens, Michael 2017. « The meaning of failed replications: A review and proposal ». *Journal of Economic Surveys* 31 (1): 326-342  [***[available online](http://ftp.iza.org/dp9000.pdf)***].

###### Cooper, Natalie, Pen-Yuan Hsing, Mike Croucher, Laura Graham, Tamora James, Anna Krystalli, Francois Michonneau. 2017. « A guide to reproducible code in ecology and evolution ». *British Ecological Society* [***[available online](https://www.britishecologicalsociety.org/wp-content/uploads/2017/12/guide-to-reproducible-code.pdf)***].

###### Crépon, Bruno, Florencia Devoto, Esther Duflo, William Parienté. 2015. « Estimating the impact of microcredit on those who take it up: Evidence from a randomized experiment in Morocco ». *American Economic Journal: Applied Economics* 7 (1): 123-50 [***[available online](https://economics.mit.edu/files/6659)***].

###### Dahal, Mahesh, Nathan Fiala. 2018. « What do we know about the impact of microfinance? The problems of power and precision ». Ruhr Economic Papers [***[available online](http://dx.doi.org/10.4419/86788880)***].

###### Deaton, Angus, Nancy Cartwright. 2016. « The limitations of randomized controlled trials ». *VOX: CEPR’s Policy Portal* (blog). 9 novembre 2016 [***[available online](https://voxeu.org/article/limitations-randomised-controlled-trials)***].

###### Deaton, Angus. 1997. *The Analysis of Household Surveys: A Microeconometric Approach to Development Policy*. Baltimore, MD: World Bank Publications [***[available online](http://documents.worldbank.org/curated/en/593871468777303124/The-Analysis-of-Household-Surveys-A-Microeconometric-Approach-to-Development-Policy)***].

###### Doligez, François, Florent Bédécarrats, Emmanuelle Bouquet, Cécile Lapenu, Betty Wampfler. 2013. « Évaluer l’impact de la microfinance : Sortir de la “double impasse” ». *Revue Tiers Monde*, no 213: 161‑78 [***[available online](https://doi.org/10.3917/rtm.213.0161)***].

###### Duvendack, Maren, Richard Palmer-Jones, James Copestake, Lee Hooper, Yoon Loke, Nitya Rao. 2011. *What is the Evidence of the Impact of Microfinance on the Well-Being of Poor People?* Londres: EPPI-University of London [***[available online](https://eppi.ioe.ac.uk/cms/Portals/0/PDF%20reviews%20and%20summaries/Microfinance%202011Duvendack%20report.pdf?ver=2011-10-28-162132-813)***].

###### Kingi, Hautahi, Flavio Stanchi, Lars Vilhuber, Sylverie Herbert. 2018. « The Reproducibility of Economics Research:  A Case Study ». presented at  Berkeley Initiative for Transparency in the Social Sciences Annual Meeting, Berkeley [***[available online](https://hdl.handle.net/1813/60838)***].

###### Meager, Rachael. 2015. « Understanding the Impact of Microcredit Expansions: A Bayesian Hierarchical Analysis of 7 Randomised Experiments ». *arXiv:1506.06669*[***[available online](https://arxiv.org/abs/1506.06669)***].

###### Morvant-Roux, Solène, Isabelle Guérin, Marc Roesch, Jean-Yves Moisseron. 2014. « Adding Value to Randomization with Qualitative Analysis: The Case of Microcredit in Rural Morocco ». *World Development* 56 (avril): 302‑12 [***[available online](http://hal.ird.fr/ird-01471911/document)***].

###### Muralidharan, Karthik. 2017. « Field Experiments in Education in Developing Countries ». In *Handbook of Economic Field Experiments*. Elsevier.

###### Ogden, Timothy. 2017. *Experimental Conversations: Perspectives on Randomized Trials in Development Economics*. Cambridge, Massachusetts: The MIT Press.

###### Peng, Roger. 2011. « Reproducible research in computational science ». *Science* 334 (6060): 1226-1227.

###### Selst, Mark Van, Pierre Jolicoeur. 1994. « A solution to the effect of sample size on outlier elimination ». *The quarterly journal of experimental psychology* 47 (3): 631-650.

###### United Nations Statistical Division. 2005. *Household Surveys in Developing and Transition Countries*. United Nations Publications [***[available online](https://unstats.un.org/UNSD/hhsurveys/)***].

###### Wickham, Hadley. 2014. « Tidy data ». *Journal of Statistical Software* 59 (10): 1-23 [***[available online](http://dx.doi.org/10.18637/jss.v059.i10)***].

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2019/04/30/bedecarrats-et-al-lessons-from-replicating-an-rct/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2019/04/30/bedecarrats-et-al-lessons-from-replicating-an-rct/?share=facebook)

Like Loading...