---
title: "REED: Post-Hoc Power Analyses:  Good for Nothing?"
date: 2017-05-23
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Daniel Lakens"
  - "Observed Power"
  - "Post-hoc Power"
  - "Power"
draft: false
type: blog
---

###### *Observed power (or post-hoc power) is the statistical power of the test you have performed, based on the effect size estimate from your data. Statistical power is the probability of finding a statistical difference from 0 in your test (aka a ‘significant effect’), if there is a true difference to be found. Observed power differs from the true power of your test, because the true power depends on the true effect size you are examining. However, the true effect size is typically unknown, and therefore it is tempting to treat post-hoc power as if it is similar to the true power of your study. In this blog, I will explain why you should never calculate the observed power (except for blogs about why you should not use observed power). Observed power is a useless statistical concept.*–Daniël Lakens from ***[his blog](http://daniellakens.blogspot.co.nz/2014/12/observed-power-and-what-to-do-if-your.html)*** “Observed power, and what to do if your editor asks for post-hoc power analyses” at *The 20% Statistician*

###### Is observed power a useless statistical concept?  Consider two researchers, each interested in estimating the effect of a treatment *T* on an outcome variable *Y*.  Each researcher assembles an independent sample of 100 observations.  Half the observations are randomly assigned the treatment, with the remaining half constituting the control group. The researchers estimate the equation *Y = a + bT + error*.

###### The first researcher obtains the results:

###### Equation1

###### The estimated treatment effect is relatively small in size, statistically insignificant, and has a p-value of 0.72.  A colleague suggests that perhaps the researcher’s sample size is too small and, sure enough, the researcher calculates a post-hoc power value of 5.3%.

###### The second researcher estimates the treatment effect for his sample, and obtains the following results:

![Equation2.jpg](/replication-network-blog/equation2.webp)

###### The estimated treatment effect is relatively large and statistically significant with a p-value below 1%.  Further, despite having the same number of observations as the first researcher, there is apparently no problem with power here, because the post-hoc power associated with these results is 91.8%.

###### Would it surprise you to know that both samples were drawn from the same data generating process (DGP): *Y = 1.984**×T  + e,* where *e ~* N(0, 5)?  The associated study has a true power of 50%.

###### The fact that post-hoc power can differ so substantially from true power is a point that has been previously made by a number of researchers (e.g., Hoenig and Heisey, 2001), and highlighted in Lakens’ excellent blog above.

###### The figure below presents a histogram of 10,000 simulations of the DGP, *Y = 1.984**×T  + e,* where *e ~* N(0, 5), each with 100 observations, and each calculating post-hoc power following estimation of the equation.  The post-hoc power values are distributed uniformly between 0 and 100%.

###### Distribution.jpg

###### So are post-hoc power analyses good for nothing?  That would be the case if a finding that an estimated effect was “underpowered” told us nothing more about its true power than a finding that it had high, post-hoc power.  But that is not the case.  In general, the expected value of a study’s true power will be lower for studies that are calculated to be “underpowered.”

###### Define “underpowered” as having a post-hoc power less than 80%, with studies having post-hoc power greater than or equal to 80% deemed to be “sufficiently powered.”  The table below reports the results of a simulation exercise where “*Beta*” values are substituted into the DGP,   *Y = Beta* *× T  + e, e ~* N(0, 5), such that true power values range from 10% to 90%.  A 1000 simulations for each *Beta* value were run and the percent of times recorded that the estimated effects were calculated to be “underpowered.”

![Table](/replication-network-blog/table.webp)

###### 

###### If studies were uniformly distributed across power categories, the expected power for an estimated treatment effect that was calculated to be “underpowered” would be approximately 43%.  The expected power for an estimated treatment effect that was calculated to be “sufficiently powered” would be approximately 70%.  More generally, E(true power| “underpowered”) ≥ E(true power|“sufficiently powered”).

###### At the extreme other end, if studies were massed at a given power level, say 30%, then E(true power|“underpowered”) = E(true power|“sufficiently powered”) = 30%, and there would be nothing learned from calculating post-hoc power.

###### Assuming that studies do not all have the same power, it is safe to conclude that E(true power| “underpowered”) > E(true power|“sufficiently powered”):  Post-hoc “underpowered” studies will generally have lower true power than post-hoc “sufficiently powered” studies.  But that’s it.  Without knowing the distribution of studies across power values, we cannot calculate the expected value of true power from post-hoc power.

###### In conclusion, it’s probably too harsh to say that post-hoc power analyses are good for nothing.  They’re just not of much practical value, since they cannot be used to calculate the expected value of the true power of a study.

###### *Bob Reed is Professor of Economics at the University of Canterbury in New Zealand and co-founder of The Replication Network.  He can be contacted at bob.reed@canterbury.ac.nz.*

###### REFERENCES

###### Hoenig, John M., & Heisey, Dennis M. (2001). The abuse of power: The pervasive fallacy of power calculations for data analysis. *The American Statistician*, Vol. 55, No. 1, pp. 19-24.

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2017/05/23/reed-post-hoc-power-analyses-good-for-nothing/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2017/05/23/reed-post-hoc-power-analyses-good-for-nothing/?share=facebook)

Like Loading...