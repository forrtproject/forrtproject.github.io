---
title: "EBERHARDT: Revisiting the Causal Effect of Democracy on Long-run Development"
date: 2019-05-03
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Democracy"
  - "Development"
  - "Economic Growth"
  - "Heterogeneous effects"
  - "replication"
  - "Robustness checks"
  - "Sample selection"
draft: false
type: blog
---

###### *[This Guest Blog is a repost of a blog by Markus Eberhardt, published at **[Vox – CEPR Policy Portal](https://voxeu.org/article/revisiting-causal-effect-democracy-long-run-development)**]*

###### *Recent evidence suggests that a country switching to democracy achieves about 20% higher per capita GDP over subsequent decades. This column demonstrates the sensitivity of these findings to sample selection and presents an implementation which generalises the empirical approach. If we assume that the democracy– growth nexus can differ across countries and may be distorted by common shocks or network effects, the average long-run effect of democracy falls to 10%.*

###### In a recent paper, Acemoglu et al. (2019), henceforth “ANRR”, demonstrated a significant and large causal effect of democracy on long-run growth. By adopting a simple binary indicator for democracy, and accounting for the dynamics of development, these authors found that a shift to democracy leads to a 20% higher level of development in the long run.1

###### The findings are remarkable in three ways:

###### – Previous research often emphasised that a simple binary measure for democracy was perhaps “too blunt a concept” (Persson and Tabellini 2006) to provide robust empirical evidence.

###### – Positive effects of democracy on growth were typically only a “short-run boost” (Rodrik and Wacziarg 2005).

###### – The empirical findings are robust across a host of empirical estimators with different assumptions about the data generating process, including one adopting a novel instrumentation strategy (regional waves of democratisation).

###### ANRR’s findings are important because, as they highlight in a[column on Vox](https://voxeu.org/article/democracy-and-growth-new-evidence), there is “a belief that democracy is bad for economic growth is common in both academic political economy as well as the popular press.” For example, Posner (2010) wrote that “[d]ictatorship will often be optimal for very poor countries”.

###### The simplicity of ANRR’s empirical setup, the large sample of countries, the long time horizon (1960 to 2010), and the robust positive – and remarkably stable – results across the many empirical methods they employ send a very powerful message against such doubts that democracy does cause growth.

###### I agree with their conclusion, but with qualifications. My investigation of democracy and growth (Eberhardt 2019) captures two important aspects that were assumed away in ANRR’s analysis:

###### **–****Different countries may experience different relationships between democracy and growth**. Existing work (including by ANRR) suggests that there may be thresholds related to democratic legacy, or level of development, or level of human capital, or whether the democratisation process was peaceful or violent. All may lead to differential growth trajectories.2

###### **–****The world is a network**. It is subject to common shocks that may affect countries differently. The Global Crisis is one example, as are spillovers across countries (Acemoglu et al. 2015, in the case of financial networks).

###### **Robustness of ANRR’s findings**

###### One way in which these features could manifest themselves in ANRR’s findings would be if their democracy coefficient differed substantially across different samples. I carried out two sample reduction exercises:

###### – Since their panel is highly unbalanced, I drop countries by observation count, first those countries which possess merely five observations, then those with six, and so on.

###### – I adopt a standard strategy from the time series literature, shifting the end year of the sample. I drop 2010, then 2009-2010, and so on. This strategy is also justified because the Global Crisis and its aftermath, the biggest global economic shock since the 1930s, occurs towards the end of ANRR’s sample. Clearly it may affect the data on the democracy-growth nexus.3

###### Figures 1a and 1b present the findings from these exercises for four parametric models, using the preferred specification of ANRR.

###### **Figure 1. Robustness of ANRR’s findings**

###### (a) Sample reduction by minimum observation count

###### TRN1(20190503)

###### (b) Sample reduction by end yearTRN2(20190503)

###### *Notes*: All estimates are for the specification with four lags of GDP (and four lags of the instrument for 2SLS) preferred by ANRR. The left-most estimates in panel (a) replicate the results in ANRR’s Table 2, column (3) for 2FE, (7) for AB, and (11) for HHK (Hahn et al. 2001), and Table 6, column (2) Panel A for 2SLS (two-stage least squares). The left-most estimates in panel (b) replicate the results in ANRR’s Table 2, column (3) for 2FE, (7) for AB (Arellano and Bond 1991), and (11) for HHK, and Table 6, column (2) Panel A for 2SLS.

###### Taking, for instance, the IV results in Figure 1a,4 it can be seen that long-run democracy estimates are initially statistically significant (indicated by a filled circle), in excess of 30% in magnitude, and stable – note that the left-most estimate is the full sample one which replicates the result of ANRR.

###### However, once I exclude any country with fewer than 21 time series observations, the long-run coefficient turns statistically insignificant (indicated by a hollow circle). Further sample reduction results in a substantial drop in the coefficient magnitude. The results for all other estimators, and those in Figure 1b, can be read in the same way, although in Figure 1b moving to the right means moving the sample end year forward in time.

###### We can conclude that the fixed effects estimates are stable. But those of all other estimators vary substantially, typically dropping off towards (or even beyond) zero as the sample is constrained. Of course empirical results change when the sample changes, but the omitted observations are relatively unsubstantial, relative to the overall sample size. For the IV results:

###### – dropping either 3% (Figure 1b) or 7% (Figure 1a) of observations leads to an insignificant long-run coefficient;5

###### – dropping either 18% (Figure 1a) or 27% (Figure 1b) of observations leads to a long-run coefficient on democracy below 5% in magnitude (the full sample coefficient is 31.5%).

###### If we purposefully mine the sample for influential observations, and omit Turkmenistan (never a democracy), the Ukraine (democratic in 17 out of 20 sample years), and Uzbekistan (never a democracy), which provide 60 observations or 0.95% of the full ANRR sample, this yields a statistically insignificant long-run democracy coefficient for the IV implementation.

###### However, we can also substantially boost the IV estimate by adopting the balanced panel employed in a separate exercise by Chen et al. (2019). These authors study the FE and Arellano and Bond (1991) implementations by ANRR, and conclude that correcting for the known biases afflicting these estimators does not substantially change the long-run democracy coefficient. If I estimate ANRR’s IV estimator for the same balanced panel the long-run democracy coefficient is almost 180%, roughly six times that of the full sample result.

###### **New findings**

###### These exercises highlight that ANRR’s results are sensitive to sample selection. I argue that spillovers between – or heterogeneous democracy-growth relationships across – countries are at the source of this fragility. This violates the basic assumptions of the set of methods used by ANRR, and so it calls for different empirical estimators.

###### I therefore employ recently developed estimators from the impact evaluation literature (Chan and Kwok 2018) that study the effect of democratisation in the sub-sample of countries for which the democracy indicator changed during the sample period. Chan and Kwok’s approach accounts for endogenous selection into democracy, as well as uncommon and stochastic trends, by including cross-section averages of the subsample of countries that *never* experienced democracy in the estimation equation.

###### Since ANRR’s results are all based on dynamic specifications (models including lags of the dependent variable) I adjust the methodology to incorporate this feature, and present long-run democracy estimates, as ANRR did. Subjecting this methodology to the same sample reduction exercises as above gives the results in Figure 2.

###### **Figure 2. Employing heterogeneous parameter estimators**

###### (a) Sample reduction by minimum observation countTRN3(20190503)

###### (b) Sample reduction by end yearTRN4(20190503)

###### Comparing the results of the preferred specification from Chan and Kwok (incorporating covariates – the teal-coloured line and circles in the figures) and of ANRR’s IV estimation my findings suggest that the full sample average long-run democracy effect across countries is more modest than that found in ANRR, at around 12% compared to 31.5%. Although Chan and Kwok’s estimates vary when the sample is reduced, the democracy coefficient remains statistically significant, the magnitude substantial, and, at least for the first exercise in Figure 2a, remarkably stable.6

###### **The democratic dividend**

###### The implicit conclusion from pooled empirical analysis as presented in ANRR is that the 20% democratic dividend applies to any country. This interpretation was perhaps not even intended by the authors but, as my empirical exercises demonstrate, their empirical implementations are compromised if the growth effect of democracy differs across countries.

###### Once we shift to a heterogeneous model, the long-run democracy effect averaged across countries is more modest. The most important question for future research is what drives the differential magnitude of this effect across countries. My initial investigations suggest that democratic legacy is not a prerequisite for a positive democracy effect, but the relationship between the democratic dividend and initial levels of literacy (as a proxy for human capital) appears to follow a U-shape.

###### *Markus Eberhart is an Associate Professor in the School of Economics, University of Nottingham, and a Research Affiliate at the Center for Economic and Policy Research (CEPR).*

###### **References**

###### Acemoglu, D, S Naidu, P Restrepo, and J A Robinson (2019), “Democracy Does Cause Growth”,*Journal of Political Economy*127(1): 47-100.

###### Acemoglu, D, A Ozdaglar, and A Tahbaz-Salehi (2015), “Systemic risk and stability in financial networks”, *American Economic Review*105(2): 564–608.

###### Aghion, P, A Alesina, and F Trebbi (2008), “Democracy, Technology, and Growth”, in E Helpman (ed,) *Institutions and Economic Performance*, Harvard University Press.

###### Arellano, M, and S R Bond (1991), “Some tests of specification for panel data: Monte Carlo evidence and an application to employment equations”,*Review of Economic Studies* 58(2): 277-297.

###### Cervellati, M, and U Sunde (2014), “Civil Conflict, Democratization, and Growth: Violent Democratization as Critical Juncture”, *Scandinavian Journal of Economics* 116(2): 482-505.

###### Chan, M K, and S Kwok (2018), “***[Difference-in-Difference when Trends are Uncommon and Stochastic”](http://dx.doi.org/10.2139/ssrn.3125890)***, available at SSRN.

###### Chen, S, V Chernozhukov and I Fernandez-Val (2019), “***[Causal Impact of Democracy on Growth: An Econometrician’s Perspective](https://www.aeaweb.org/conference/2019/preliminary/paper/H3zAn6KA)***“, paper presented at the 2019 ASSA meetings in Atlanta, GA.

###### Eberhardt, M (2019), “***[Democracy Does Cause Growth: Comment](https://cepr.org/active/publications/discussion_papers/dp.php?dpno=13659)***“, CEPR Discussion Paper 13659.

###### Eberhardt, M, and F Teal (2011), “Econometrics for grumblers: a new look at the literature on cross-country growth empirics”, *Journal of Economic Surveys* 25(1): 109-155

###### Gerring, J, P Bond, W T Barndt, and C Moreno (2005), “Democracy and economic growth: A historical perspective”, *World Politics* 57(3): 323-364.

###### Hahn, J, J A Hausman, and G Kuersteiner (2001), “Bias Corrected Instrumental Variables Estimation for Dynamic Panel Models with Fixed Effects”, MIT Department of Economics Working Paper 01-24.

###### Madsen, J B, P A Raschky, and A Skali (2015), “Does democracy drive income in the world, 1500- 2000?”, *European Economic Review* 78: 175-195.

###### Papaioannou, E, and G Siourounis (2008), “Democratisation and growth’, *Economic Journal*118(532): 1520-1551.

###### Persson, T, and G Tabellini (2006), “Democracy and development: The devil in the details”, *American Economic Review, Papers & Proceedings* 96(2): 319-324.

###### Posner, R (2010), “***[Autocracy, Democracy, and Economic Welfare](https://www.becker-posner-blog.com/2010/10/autocracy-democracy-and-economic-welfareposner.html)***“, The Becker-Posner blog, 10 October.

###### Rodrik, D, and R Wacziarg (2005), “Do democratic transitions produce bad economic outcomes?’, *American Economic Review, Papers & Proceedings* 95(2): 50-55.

###### Endnotes

###### [1] I follow the practice of ANRR in using ‘growth’ as a short-hand for economic development (the level of per capita GDP). The term ‘cross-country growth regression’ is a misnomer, given that the standard specification represents a dynamic model of the levels of per capita GDP; see Eberhardt and Teal (2011) for a more detailed discussion of growth empirics.

###### [2] Gerring, et al (2005) for democracy legacy, Aghion, et al (2008) and Madsen, et al (2015) for thresholds, finally Cervellati and Sunde (2014) for concerns related to democratisation scenarios.

###### [3] Note that shifting the start year of the sample does not result in any substantial changes in ANRR’s result: it is the experience of the post-2000 period which drives their results.

###### [4] The AB and HHK results are arguably less robust than the IV results to sample restrictions.

###### [5] For comparison, in related work on democratisation and growth Papaioannou and Siourounis (2008) show the robustness of their findings using a cut-off equivalent to 12% of their full sample.

###### [6] One would expect that the temporal sample reduction as presented in Figure 4 would slowly chip away at the magnitude of the coefficient.

###### 

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2019/05/03/eberhardt-revisiting-the-causal-effect-of-democracy-on-long-run-development/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2019/05/03/eberhardt-revisiting-the-causal-effect-of-democracy-on-long-run-development/?share=facebook)

Like Loading...