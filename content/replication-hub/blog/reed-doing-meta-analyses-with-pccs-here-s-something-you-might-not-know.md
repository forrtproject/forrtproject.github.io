---
title: "REED: Doing Meta-Analyses with PCCs? Here’s Something You Might Not Know"
date: 2023-12-15
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Bias"
  - "Chris Doucouliagos"
  - "Inverse variance weighting"
  - "maer-net"
  - "Meta-analysis"
  - "Partial Correlation Coefficients"
  - "PCC"
  - "Robbie van Aert"
  - "Tom Stanley"
  - "Variance"
  - "Weighted Least Squares"
draft: false
type: blog
---

[*This blog first appeared at the MAER-Net Blog under the title “Something I Recently Learned About PCCs That Maybe You Also Didn’t Know”,****[see here](https://www.maer-net.org/post/something-i-recently-learned-about-pccs-that-maybe-you-also-didn-t-know)****]*

While TRN is primarily dedicated to replications in economics, I also do research on meta-analysis. As such, I try to attend the Meta-Analysis in Economics Research Network (MAER-Net) Colloquium every year. It is a great place to learn from the best and have my many questions answered.

In 2022, the colloquium was held in Kyoto, Japan. That year I went with an especially large number of questions that I was hoping to have answered.  In fact, I used my presentation at the colloquium as an opportunity to take my questions to the MAER-Net “brain trust”. Below is a slide from the presentation I gave in Kyoto:

[![](/replication-network-blog/image.webp)](https://replicationnetwork.com/wp-content/uploads/2023/12/image.webp)

Here is the background: My presentation was on “The Relationship Between Social Capital and Economic Growth: A Meta-Analysis.” Because measures of social capital and economic growth vary widely across studies, we transformed the estimates from the original studies into partial correlation coefficients (PCCs).

As is standard in economics, we used the following expression for the sampling variance of PCC:

1) s.e.(PCC)^2 = (1-PCC^2) / df

In the course of our analysis, one of the co-authors on this project, Robbie van Aert (Tilburg University) said we were using the wrong expression for the sampling variance of PCC. He said the correct expression was:

2) s.e.(PCC)^2 = (1-PCC^2)^2 / df

Notice the difference in the numerators.

This was pretty shocking to me, as I had published several meta-analyses with PCCs using Equation (1). As had many other economists.

Indeed, Robbie was right. Economists were using the wrong sampling variance! As a result of this experience, he published a note in *Research Synthesis Methods* (see below).

[![](/replication-network-blog/image-1.webp)](https://replicationnetwork.com/wp-content/uploads/2023/12/image-1.webp)

Unfortunately, I wasn’t able to get much of a response from those attending MAER-Net in Kyoto so I left confused about what I should do in my research.

However, the answer to my question was not long in coming. In March of this year I learned of an article by Tom Stanley and Chris Doucouliagos that addressed the issue of the “correct” sampling variance of PCC (see below).

[![](/replication-network-blog/image-2.webp)](https://replicationnetwork.com/wp-content/uploads/2023/12/image-2.webp)

To cut to the chase, the answer to my question if economists were using the wrong s.e.(PCC) is twofold:

1) Yes, economists are using the wrong sampling variance of PCC

2) Economists should continue using the wrong sampling variance because it produces better estimates

The reason why the “wrong” sampling variance is better than the “correct” sampling variance is enlightening. It raises issues about PCCs that I never appreciated. I thought if I was unaware of these issues, maybe others were too. Hence the motivation for this blog.

First, a reminder about why meta-analysis uses inverse variance weighting. Given heteroskedasticity, it is well known that weighted least squares (WLS) will produce estimates with least variance. Ceteris paribus, that argues in favor of using the “correct” sampling variance of PCC.

However, ceteris paribus doesn’t hold because the “correct” sampling variance of PCC is a function of PCC (see Equation 1).

In particular, as PCC increases, s.e.(PCC) decreases. As a result, inverse variance weighting favors larger values of PCC. This introduces bias in the estimation of the overall mean.

Doesn’t the “wrong” sampling variance also have a bias problem (cf. Equation 2)? Yes, it does. But the bias is not as bad.

Stanley and Doucouliagos demonstrate this in a series of simulations reported in their paper. In the table below, S1^2 is the “correct” sampling variance, and S2^2 is the “wrong” sampling variance commonly used by economists. In every case, bias is less using S2^2.

[![](/replication-network-blog/image-3.webp)](https://replicationnetwork.com/wp-content/uploads/2023/12/image-3.webp)

Does that mean that somehow WLS isn’t relevant for PCCs? Not at all. It is still the case that inverse weighting with the “correct” sampling variance produces estimates with smaller variance.

However, its advantage in variance is outweighed by its disadvantage in bias. As a result, inverse variance weighting using the “wrong” sampling variance is more efficient. This is demonstrated in the table where root mean squared error (RMSE) for S2^2 is smaller than for S1^2.

In summary, the “correct” sampling variance of PCC produces estimates with smaller variance. The “wrong” sampling variance produces estimates with smaller bias.

As Stanley and Doucouliagos show, the “wrong” sampling variance makes a better bias-variance trade-off and is thus more efficient. Accordingly, they recommend that economists continue to use the “wrong” sampling variance of PCC in inverse variance weighting.

Before reading Stanley and Doucouliagos’ article, I was unaware that inverse variance weighting with PCCs involved a bias-variance trade-off. Perhaps others were also unaware and will find this blog useful.

**REFERENCES**

Stanley, T. D., & Doucouliagos, H. (2023). Correct standard errors can bias meta‐analysis. *Research Synthesis Methods*, 14(3), 515-519.

van Aert, R. C., & Goos, C. (2023). A critical reflection on computing the sampling variance of the partial correlation coefficient. *Research Synthesis Methods*, 14(3), 520-525.

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2023/12/15/reed-doing-meta-analyses-with-pccs-heres-something-you-might-not-know/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2023/12/15/reed-doing-meta-analyses-with-pccs-heres-something-you-might-not-know/?share=facebook)

Like Loading...