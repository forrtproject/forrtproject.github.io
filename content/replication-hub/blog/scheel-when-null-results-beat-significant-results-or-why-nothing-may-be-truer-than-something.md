---
title: "SCHEEL: When Null Results Beat Significant Results OR Why Nothing May Be Truer Than Something"
date: 2017-06-27
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Anne Scheel"
  - "Felix Schoenbrodt"
  - "John Ioannidis"
  - "null hypothesis significance testing"
  - "null results"
  - "PPV"
  - "Shiny app"
draft: false
type: blog
---

###### *[The following is an adaption of (and in large parts identical to) a* **[*recent blog post*](http://www.the100.ci/2017/06/01/why-we-should-love-null-results/)***by Anne Scheel that appeared on* **[*The 100% CI*](http://www.the100.ci/)** .]

###### Many, probably most empirical scientists use frequentist statistics to decide if a hypothesis should be rejected or accepted, in particular *null hypothesis significance testing* (NHST).

###### NHST works when we have access to all statistical tests that are being conducted. That way, we should at least in theory be able to see the 19 null results accompanying every statistical fluke (assuming an alpha level of 5%) and decide that effect X probably does not exist. But publication bias throws this off-kilter: When only or mainly significant results end up being published, whereas null results get p-hacked, file-drawered, or rejected, it becomes very difficult to tell false positive from true positive findings.

###### The number of true findings in the published literature depends on something significance tests can’t tell us: The base rate of true hypotheses we’re testing. If only a very small fraction of our hypotheses are true, we could always end up with more false positives than true positives (this is one of the main points of ***[Ioannidis’ seminal 2005 paper](http://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124)***).

###### When ***[Felix Schönbrodt](https://twitter.com/nicebread303)*** and ***[Michael Zehetleitne](http://www.psy.lmu.de/exp/people/former/zehetleitner/index.html)r*** released ***[this great Shiny app](http://shinyapps.org/apps/PPV/)*** a while ago, I remember having some vivid discussions with Felix about what the rate of true hypotheses in psychology may be. In his very nice ***[accompanying blog post](http://www.nicebread.de/whats-the-probability-that-a-significant-p-value-indicates-a-true-effec)***, Felix included a flowchart assuming that 30% of all tested hypotheses are true. At the time I found this grossly pessimistic: Surely our ability to develop hypotheses can’t be worse than a coin flip? We spent years studying our subject! We have theories! We are really smart! I honestly believed that the rate of true hypotheses we study should be at least 60%.

###### A few months ago, ***[this interesting paper](http://amstat.tandfonline.com/doi/pdf/10.1080/01621459.2016.1240079?needAccess=true)*** by Johnson, Payne, Want, Asher, & Mandal came out. They re-analysed 73 effects from the ***[Reproducibility Project: Psychology](https://en.wikipedia.org/wiki/Reproducibility_Project)*** and tried to model publication bias. I have to admit that I’m not maths-savvy enough to understand their model and judge their method, but they estimate that over 700 hypothesis tests were run to produce these 73 significant results. They assume that the statistical power for tests of true hypotheses was 75%, and that 7% of the tested hypotheses were true. *Seven percent.*

###### Er, ok, so not 60% then. To be fair to my naive 2015 self: this number refers to *all* hypothesis tests that were conducted, including p-hacking. That includes the one ANOVA main effect, the other main effect, the interaction effect, the same three tests without outliers, the same six tests with age as covariate, … and so on.

![Table1_PPV-NPV-FDR-FOR_table](/replication-network-blog/table1_ppv-npv-fdr-for_table.png)

###### Let’s see what these numbers mean for the rates of true and false findings. For this we will need the *positive predictive value* (PPV) and the *negative predictive value* (NPV). I tend to forget what exactly they and their two siblings, FDR and FOR, stand for and how they are calculated, so added the table above as a cheat sheet.

###### Ok, now we got that out of the way, let’s stick the numbers estimated by Johnson et al. into a flowchart. You see that the positive predictive value is shockingly low: Of all significant results, only 53% are true. Wow. I must admit that even after reading Ioannidis (2005) several times, this hadn’t quite sunk in. If the 7% estimate is anywhere near the true rate, that basically means that we can flip a coin any time we see a significant result to estimate if it reflects a true effect.

###### But I want to draw your attention to the *negative* predictive value. The chance that a non-significant finding is true is 98%! Isn’t that amazing and heartening? In this scenario, null results are vastly more informative than significant results.

![Figure1_PPV_NPV](/replication-network-blog/figure1_ppv_npv.png)

###### I know what you’re thinking: 7% is ridiculously low. Who knows what those statisticians put into their Club Mate when they calculated this? For those of you who are more like 2015 me and think psychologists are really smart, I plotted the PPV and NPV for different levels of power across the whole range of the true hypothesis rate, so you can pick your favourite one. I chose five levels of power: 21% (estimate for neuroscience by ***[Button et al., 2013](http://www.nature.com/nrn/journal/v14/n5/full/nrn3475.html)***), 75% (Johnson et al. estimate), 80% and 95% (common conventions), and 99% (upper bound of what we can reach).

![Figure2_PVplot](/replication-network-blog/figure2_pvplot.png)

###### The not very pretty but adaptive (you can chose different values for alpha and power) code is available ***[here](https://github.com/amscheel/PPV-NPV-FDR-FOR_plot/blob/master/PPV_NPV_FDR_FOR_looped.R)***.

###### The plot shows two vertical dashed lines: The left one marks 7% true hypotheses, as estimated by Johnson et al. The right one marks the intersection of PPV and NPV for 75% power: This is the point at which significant results become more informative than negative results. That happens when more than 33% of the studied hypotheses are true. So if Johnson et al. are right, we would need to up our game from 7% of true hypotheses to a whopping 33% to get to a point where significant results are as informative as null results!

###### There are a few things to keep in mind: First, 7% true hypotheses and 75% power are  simply an estimate, based on data from one replication project. I can certainly imagine that this isn’t far from the truth in psychology, but even if the estimate is accurate, it will vary at least slightly across different fields and probably across time.

###### Second, we have to be clear about what “hypothesis” means in this context: It refers to *any* statistical test that is conducted. A researcher could have one “hypothesis” in mind, yet perform twenty different *hypothesis tests* on their data to test this hypothesis, all of which would count towards the denominator when calculating the rate of true hypotheses. I personally believe that the estimate by Johnson et al. is so low because psychologists tend to heavily exploit so-called “researcher degrees of freedom” and test many more hypotheses than they themselves are aware of. Third, statistical power will vary from study to study and the plot above shows that this affects our conclusions. It is also important to bear in mind that power refers to a specific effect size: A specific study has different levels of power for large, medium, and small effects.

###### We can be fairly certain that most of our hypotheses are false (otherwise we would waste a lot of money by researching trivial questions). The exact percentage of true hypotheses remains unknown, but if it there is something to the estimate of Johnson et al., the fact that an effect is significant doesn’t tell us much about whether or not it is real. Non-significant findings, on the other hand, likely are correct most of the time in this scenario – maybe even 98% of the time! Perhaps we should start to take them more seriously.

###### *Anne Scheel is a PhD student in psychology at Ludwig-Maximilians-Universität, Munich (LMU).  She is co-moderator of the Twitter site **[@realsci\_DE](https://twitter.com/realsci_DE)** and co-blogger at **[The 100% CI](http://www.the100.ci/)**. She can be contacted at anne.scheel@psy.lmu.de.*

###### **References**

###### Button, K. S., Ioannidis, J. P. A., Mokrysz, C., Nosek, B. A., Flint, J., Robinson, E. S. J., & Munafò, M. R. (2013). Power failure: Why small sample size undermines the reliability of neuroscience. *Nature Reviews Neuroscience, 14*, 365–376.

###### Ioannidis, J. P. A. (2005). Why most published research findings are false. *PLOS Medicine, 2*(8), e124. doi: 10.1371/journal.pmed.0020124

###### Johnson, V. E., Payne, R. D., Wang, T., Asher, A., & Mandal, S. (2017). On the reproducibility of psychological science. *Journal of the American Statistical Association, 112*(517), 1-10. doi: 10.1080/01621459.2016.1240079

###### Open Science Collaboration (2015). Estimating the reproducibility of psychological science. *Science, 349*(6251), aac4716.

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2017/06/27/scheel-when-null-results-beat-significant-results-or-why-nothing-may-be-truer-than-something/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2017/06/27/scheel-when-null-results-beat-significant-results-or-why-nothing-may-be-truer-than-something/?share=facebook)

Like Loading...