---
title: "CAMPBELL: Is the AER Replicable? And is it Robust? Evidence from a Class Project"
date: 2016-12-27
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "AER"
  - "American Economic Review"
  - "Douglas Campbell"
  - "Edlin factor"
  - "Geography"
  - "Macroeconomics"
  - "reanalysis"
  - "replication"
  - "robustness"
draft: false
type: blog
---

###### As part of a major replication and robustness project of articles in the American Economic Review, this fall I assigned students in my Masters Macro course at the New Economic School (Moscow) to replicate and test robustness for Macro papers published in the AER. In our sample of AER papers, 66% had full data available online, and the replicated results were exactly the same as in the paper 72% of the time. However, in all the remaining cases where the data and code were available were the results in the replication approximately the same.  The robustness results were a bit less sanguine: students concluded that 65% of the papers were robust (primarily doing ***[reanalysis](https://replicationnetwork.com/2016/10/27/goldstein-more-replication-in-economics/)*** rather than extensions), while t-scores fell by 31% on average in the robustness checks.  While this work should be seen as preliminary (students had to work under tight deadlines), the results suggest that more work needs to be done on replication and robustness, which should be an integral part of the scientific process in economics.

###### **The Assignment**

###### First, each student could choose their own paper and try to replicate the results. The students were allowed to switch papers for any reason, such as if the data was not available or the code didn’t work. Then they had to write referee reports on their papers, suggesting robustness checks. Lastly, after a round of comments and suggestions from myself, students were to implement their robustness checks and report their results. They were also required to submit their data and code.

###### **Replication Results**

###### 24 papers had the full data available, while 12 did not, for an impressive two-thirds ratio (similar to what ***[Chang and Li](https://www.federalreserve.gov/econresdata/feds/2015/files/2015083pap.pdf)***, who test whether economics research is replicable, find, 23/35 in their case). Unfortunately, this is almost certainly an upper-bound estimate, as there may be selection given that students likely chose papers which looked easy to replicate.  In addition, seven students switched away from their first-choice papers without necessarily reporting why in the google spreadsheet, and others likely switched between several papers just before the deadline in search of papers which were easy to replicate.

###### Next, in 23 out of 32 cases, when there was full or partial data available, the replication results were exactly the same. In the other nine cases, the results were “approximately” the same, for a fairly impressive 100% replicability ratio. While this is encouraging, a pessimist might note that in just 18 out of 32 papers was there full data and code available that gave exactly the same results as were found in the published version of the paper, and in 24/32 cases were there approximately the same results and full data.

###### **Robustness Results**

###### While virtually all the tables that had data replicated well, it cannot necessarily be said that the results proved particularly robust. Of the troopers in my class who made it through a busy quarter to test for robustness and filled in their results in the google sheet, just 15 out of 23 subjectively called the results of the original AER “robust”, with the average t-score falling by 31% (similar to an ***[Edlin factor](http://andrewgelman.com/2014/02/24/edlins-rule-routinely-scaling-published-estimates/)***).

###### While, admittedly, some students might have felt incentivized to overturn papers by hook or crook, for example by running hundreds of robustness tests, this does not appear to be what happened. This is particularly the case since many of the robustness checks were premeditated in the referee reports. On average, students who reversed their results reported doing so on the 8th attempt.

###### If anything, with an exception of one or two cases, students seemed to be cautious about claiming studies were non-robust. One diligent student found a regression in a paper’s .do file – not reported in the main paper — in which the results were not statistically significant. However, the student also noted that the sample size in that particular regression shrank by one-third, and thus still gave the paper the benefit of the doubt. Other students often found that their papers’ had clearly heterogenous impacts by subsample, and yet were cautious enough to still conclude that the key results were robust on the full sample, even if not on subsamples. And, indeed, having insignificant results on a subsample may or may not be problematic, but at a minimum suggests further study is warranted.

###### **“Geographic” Data Papers: Breaking Badly?**

###### For papers that have economic data arranged geographically, such as papers which look at local labor market effects of a particular shock, or cross-country data, or data from individuals in different areas, the results appeared to be more grim. It often happened that different geographic regions would yield quite different results (not unlike ***[this example](http://andrewgelman.com/2015/12/19/a-replication-in-economics-does-genetic-distance-to-the-us-predict-development/)*** from the QJE). Thus if one splits the sample, and then tests out-of-sample on the remaining data, the initial model often does not validate well. It might not be that the hypothesis is wrong, but it does make one wonder how well the results would test out of sample. The problem here seems to be that geography is highly-nonrandom, so that regressing any variable y (say, cat ownership) on any other variable x (marijuana consumption), one will find a correlation. (This is likely the force which gave rise to the rainfall IV.) However, often these correlations will reverse signs on different regions. Having a strong intuitive initial hypothesis here is important.

###### For example, one student chose a paper which argued for a large causal effect of inherited *trust* on economic growth – which *a priori* sounded to me like a dubious proposition. The student found that a simple dummy for former communist countries eliminated the significance of the result when added to one of the richer specifications in the paper.

###### Concluding Thoughts

###### Would this result, that 65% of the papers in the AER are robust, replicate? One wonders if the students had had more time, particularly enough time to do extensions in addition to reanalaysis, or if the robustness checks had been carried out by experienced professionals in the field, whether as many papers would have proven robust. In addition, students were probably more likely to choose famous papers – which may or may not be more likely than others to replicate. Thus, in the future we would like to do a random selection of papers to test robustness. In addition, I suspected from the beginning that empirical macro papers are likely to be relatively low-hanging fruit in terms of the difficulty of critiquing the methodology. This suspicion proved correct. While some papers were hard to find faults in, other papers were missing intuitive fixed effects or didn’t cluster, and one paper ran a panel regression in levels of trending variables without controlling for panel-specific trends (which changed the results).

###### I do believe this is a good exercise for students, conditioned on not overburdening them, a mistake I believe I made. The assignment requires students to practice the same skills – coding, thinking hard about identification, and writing – that empirical researches use when doing actual research.

###### On the whole, research published in the AER appears to replicate well, but it is still an open jury as to how robust the AER is. In my view, a robustness ratio of 15/23 = 65% is actually very good, and is a bit better than my initial priors. The evidence from this Russian study does seem to suggest, however, that research using geographic data published in the American Economic Review is no more robust than the American electoral process. This is an institution in need of further fine-tuning.

###### *Douglas Campbell is an Assistant Professor at the New Economic School in Moscow. His webpage can be found at **<http://dougcampbell.weebly.com/>**.*

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2016/12/27/campbell-is-the-aer-replicable-and-is-it-robust-evidence-from-a-class-project/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2016/12/27/campbell-is-the-aer-replicable-and-is-it-robust-evidence-from-a-class-project/?share=facebook)

Like Loading...