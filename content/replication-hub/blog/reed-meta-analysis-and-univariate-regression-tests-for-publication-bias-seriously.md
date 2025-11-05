---
title: "REED: Meta-Analysis and Univariate Regression Tests for Publication Bias – Seriously?"
date: 2023-10-10
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Effect beyond bias"
  - "Egger's regression Test"
  - "FAT-PET-PEESE"
  - "Journal of Economic Surveys"
  - "Meta-analysis"
  - "publication bias"
draft: false
type: blog
---

[*This blog first appeared at the MAER-Net Blog under the title “Univariate Regression Tests for Publication Bias: Why Do We Do Them?”, **[see here](https://www.maer-net.org/post/univariate-regression-tests-for-publication-bias-why-do-we-do-them)**]*

**The FAT-PET Framework**: A standard meta-analysis article goes something like this (see, for example, Knaisch and Pöschel, 2023):

PART I: Introduction  
PART 2: Literature Review  
PART 3: Description of Data  
PART 4: Testing for Publication Bias  
PART 5: Explaining Heterogeneity  
PART 6: Best Practice Estimate  
PART 7: Conclusion  
  
(1) Estimated Effect = β0 + β1 SE + ε,  
  
where SE is the standard error of the estimated effect. β1 is used to test for the existence of publication bias. Statistical significance is interpreted as evidence of publication bias.

In economics, this is called the Funnel Asymmetry Test, or “FAT”. Elsewhere, it is more widely known as Egger’s regression test.

β0 provides an estimate of the overall mean effect after adjusting for publication bias. This is commonly referred to as “Effect Beyond Bias” and is nothing more than a prediction of the estimated effect when SE = 0.

The test of β0=0 is known as the Precision Effect Test (“PET”). (Hence “FAT-PET”.) If β0 is significant in Equation (1), Stanley & Doucouliagos (2012) recommend that SE be replaced by SE^2 and the associated estimate of the constant term be taken as the preferred “Effect Beyond Bias”. This is what turns FAT-PET into FAT-PET-PEESE.

**The Univariate FAT-PET**. To set the context, suppose a colleague of yours were to ask you to comment on a draft of a paper they had written estimating the effect of education on wages. They have access to a unique dataset with extensive information on worker and job/occupation characteristics. Yet their paper only reports a simple regression of wages on education.

Surely you would tell your colleague that they will never get their paper published. They need to hold the influence of other variables constant. They need to do a more extensive regression analysis before concluding anything about the returns to education.

Yet when it comes to testing for publication bias and estimating the overall mean effect, we give primacy to a simple regression of effect size on standard error — a practice we would typically regard as deficient in other applications.

**Best practice is univariate + multivariate FAT-PET, right?** A standard response to this criticism is that “best practice” says you should never just estimate a univariate regression. Rather, you should also include the SE/SE^2 variable in a regression specification with other variables that are thought to affect estimated effects. The good news is, at least at first glance, this does indeed appear to be what most meta-analyses in economics do.

I went through the *Journal of Economic Surveys* *(JOES)* and found the 20 most recently published meta-analyses. (The list of articles is given at the bottom of this blog.)

Of these, 19 do a univariate, FAT-PET-type regression. Of these nineteen, 17 go on to include a standard error variable in a more fully specified meta-regression. So it looks like good practice is mostly being followed in meta-analyses recently published in *JOES*. Interestingly, Aiello and Bonannno (2019) skip the univariate FAT-PET and go directly to a meta-regression with multiple explanatory variables.

**A problem with the univariate + multivariate FAT-PET approach**. One problem with the practice of doing both a univariate and a multivariate FAT-PET is that the multivariate MRA is rarely (never?) included in the section on publication bias. That is, when there is a separate section on publication bias, only the univariate version of the test is reported and used to draw a conclusion about the existence of publication bias.

This can be misleading. Especially when the univariate and multivariate regressions lead to different conclusions. This can occur whenever the SE variable is highly correlated with other study characteristics. In my experience, I have found that this is often the case.

For example, I presented a paper at last year’s MAER-Net on Social Capital and Economic Growth. There were 18 study characteristics in my meta-regression. A regression of SE on the 18 variables produced an R-squared of 53.8%.

Things were no better when I substituted sample size for SE. The respective R-squared was even higher, at 68.2%. (As an aside, substantial correlation of sample size with study characteristics is a problem when researchers use sample size as an IV for the standard error variable.) We should not be surprised when the multivariate FAT-PET produces a different conclusion than the univariate FAT-PET in these cases.

Two examples from my sample of 20 are Churchill et al. (2022) and Georgia et al. (2022). The respective FAT coefficients are reported in the table below, with standard errors in parentheses. In both cases, the univariate FAT estimates indicated the existence of publication bias, while the multivariate estimates did not.

[![](/replication-network-blog/image.webp)](https://replicationnetwork.com/wp-content/uploads/2023/10/image.webp)

In fact, the record regarding good practice is not as good as it seems. It is true that most meta-analyses in my sample estimated a meta-regression including both the SE variable and other study characteristics. However, not all used the multivariate meta-regression to test for publication bias. There are studies in my sample that estimate a univariate FAT-PET, conclude there is evidence of publication bias, later report a multivariate meta-regression with an insignificant SE variable, but never acknowledge this as evidence against publication bias.  
  
The univariate FAT-PET can be misleading about the existence of publication bias. Why report it at all? Why not do like Aiello and Bonannno (2019) and go straight to the multivariate FAT-PET?  
  
It seems to me that estimating the influence of publication bias is conceptually no different than estimating the returns to education. In both cases, one needs to control for other factors.  
  
**Another problem: Effect beyond bias**. If omitted variable bias affects β1 in Equation (1), then it also affects estimates of β0. If the SE coefficient is positively biased, “Effect beyond bias” will be underestimated (assuming an overall positive effect). If the SE coefficient is negatively biased, it will be overestimated. Obtaining an unbiased estimate of the effect of publication bias is essential for estimating “Effect beyond bias”.  
  
If good practice calls for estimating a multivariate FAT-PET version of Equation (1), good practice should also include a corresponding estimate of the overall mean effect. That is, there should be a multivariate analogue to “Effect beyond bias” that corresponds to the univariate “Effect beyond bias”.  
  
This is straightforward to do when the multivariate FAT-PET is estimated using OLS. When using a weighted estimator such as FE or RE, there are some nuanced issues, though these are not difficult to address. Yet this is rarely, if ever, done. None of the 20, most recently published meta-analyses in *JOES* calculate a multivariate “Effect beyond bias”.

To be fair, many meta-analyses report one or more “best practice” estimates. In my sample, 11 of the 20 meta-analyses predict the estimated effect size using “best study” characteristics. For example, best studies might include those based on randomized control studies, or that correct for endogeneity. Typically, they assume that SE = 0; i.e., no publication bias.  
  
“Best practice” estimates are good. But they are not the same thing as a multivariate analogue to the univariate FAT-PET regression. They predict the estimated effect size for a particular kind of study. They do not provide an estimate of the overall mean effect for all studies.  
  
In the absence of a multivariate “Effect beyond bias”, there is nothing to balance the “Effect beyond bias” estimates from the univariate regression. In that case, the univariate estimates will be given undue weight.  
  
In conclusion, I have two recommendations:  
  
***1) Meta-analysts should always include a multivariate FAT in the section of their paper that is devoted to testing for publication bias.***  
  
***2) Meta-analysts should always include a multivariate “Effect beyond bias” alongside the univariate “Effect beyond bias” estimate.***  
  
I am keen to hear what other meta-analysts think.  
  
*NOTE: Bob Reed is Professor of Economics and *the Director of*[***UCMeta***](https://www.canterbury.ac.nz/business-and-law/research/ucmeta/)*at the University of Canterbury.* He can be reached at* [*bob.reed@canterbury.ac.nz*](mailto:bob.reed@canterbury.ac.nz)*. Special thanks go to Weilun Wu for his research assistance for this project.*  
  
**REFERENCES**  
  
Aiello, F., & Bonanno, G. (2019). Explaining differences in efficiency: A meta‐study on local government literature. *Journal of Economic Surveys*, 33(3), 999-1027.  
  
de Batz, L., & Kočenda, E. (2023). Financial crime and punishment: A meta-analysis. *Journal of Economic Surveys*, <https://doi.org/10.1111/joes.12580>  
  
Brada, J. C., Drabek, Z., & Iwasaki, I. (2021). Does investor protection increase foreign direct investment? A meta‐analysis. *Journal of Economic Surveys*, 35(1), 34-70.  
  
Chletsos, M., & Sintos, A. (2023). Financial development and income inequality: A meta‐analysis. *Journal of Economic Surveys*, 37(4), 1090-1119.  
  
Churchill, S., Luong, H. M., & Ugur, M. (2022). Does intellectual property protection deliver economic benefits? A multi‐outcome meta‐regression analysis of the evidence. *Journal of Economic Surveys*, 36(5), 1477-1509.  
  
Donovan, S., de Graaff, T., de Groot, H. L., & Koopmans, C. C. (2022). Unraveling urban advantages—A meta‐analysis of agglomeration economies. *Journal of Economic Surveys*. <https://onlinelibrary.wiley.com/doi/10.1111/joes.12543>  
  
Ferreira‐Lopes, A., Linhares, P., Martins, L. F., & Sequeira, T. N. (2022). Quantitative easing and economic growth in Japan: A meta‐analysis. *Journal of Economic Surveys*, 36(1), 235-268.  
  
Filomena, M., & Picchio, M. (2023). Retirement and health outcomes in a meta‐analytical framework. *Journal of Economic Surveys*. 37(4), 1120–1155  
  
Giorgio, D. P., European Commission, & IZA. (2022). Studying abroad and earnings: A meta‐analysis. *Journal of Economic Surveys*, 36(4), 1096-1129.  
  
Gregor, J., Melecký, A., & Melecký, M. (2021). Interest rate pass‐through: A meta‐analysis of the literature. *Journal of Economic Surveys*, 35(1), 141-191.  
  
Hansen, C., Block, J., & Neuenkirch, M. (2020). Family firm performance over the business cycle: a meta‐analysis. *Journal of Economic Surveys*, 34(3), 476-511.  
  
Hirsch, S., Petersen, T., Koppenberg, M., & Hartmann, M. (2023). CSR and firm profitability: Evidence from a meta‐regression analysis. *Journal of Economic Surveys*, 37(3), 993-1032.  
  
Hubler, J., Louargant, C., Laroche, P., & Ory, J. N. (2019). How do rating agencies’decisions impact stock markets? A meta‐analysis. *Journal of Economic Surveys*, 33(4), 1173-1198.  
  
Knaisch, J., & Pöschel, C. (2023). Wage response to corporate income taxes: A meta-regression analysis. *Journal of Economic Surveys*, 00, 1–25. <https://doi.org/10.1111/joes.12557>  
  
Kočenda, E., & Iwasaki, I. (2022). Bank survival around the World: A meta‐analytic review. *Journal of Economic Surveys*, 36(1), 108-156.  
  
Malovaná, S., Hodula, M., Bajzík, J., & Gric, Z. (2023). Bank capital, lending, and regulation: A meta-analysis. *Journal of Economic Surveys*, 00, 1–29. <https://doi.org/10.1111/joes.12560>  
  
Polak, P. (2019). the euro’s trade effect: A meta‐analysis. *Journal of Economic Surveys*, 33(1), 101-124.  
  
Stanley, T. D., Doucouliagos, H., & Steel, P. (2018). Does ICT generate economic growth? A meta‐regression analysis. *Journal of Economic Surveys*, 32(3), 705-726.  
  
Vooren, M., Haelermans, C., Groot, W., & Maassen van den Brink, H. (2019). The effectiveness of active labor market policies: a meta‐analysis. *Journal of Economic Surveys*, 33(1), 125-149.

Xue, X., Cheng, M., & Zhang, W. (2021). Does education really improve health? A meta‐analysis. *Journal of Economic Surveys*, 35(1), 71-105.

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2023/10/10/reed-meta-analysis-and-univariate-regression-tests-for-publication-bias-seriously/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2023/10/10/reed-meta-analysis-and-univariate-regression-tests-for-publication-bias-seriously/?share=facebook)

Like Loading...