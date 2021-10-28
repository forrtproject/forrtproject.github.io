+++
# A Demo section created with the Blank widget.
# Any elements can be added in the body: https://sourcethemes.com/academic/docs/writing-markdown-latex/
# Add more sections by duplicating this file and customizing to your requirements.

widget = "blank"  # See https://sourcethemes.com/academic/docs/page-builder/
headless = true  # This file represents a page section.
active = true  # Activate this widget? true/false
weight = 10  # Order that this section will appear.

title = "Reversals"
subtitle = ""

[design]
  # Choose how many columns the section has. Valid values: 1 or 2.
  columns = "1"

[design.background]
  # Apply a background color, gradient, or image.
  #   Uncomment (by removing `#`) an option to apply it.
  #   Choose a light or dark text color by setting `text_color_light`.
  #   Any HTML color name or Hex value is valid.

  # Background color.
  # color = "#fefdf6"
  # color = "#69b3a2" # greenish

  # Background gradient.
  # gradient_start = "DeepSkyBlue"
  # gradient_end = "SkyBlue"

  # Background image.
  # image = "headers/bubbles-wide.jpg"  # Name of image in `static/img/`.
  # image_darken = 0.6  # Darken the image? Range 0-1 where 0 is transparent and 1 is opaque.
  # image_size = "cover"  #  Options are `cover` (default), `contain`, or `actual` size.
  # image_position = "center"  # Options include `left`, `center` (default), or `right`.
  # image_parallax = true  # Use a fun parallax-like fixed background effect? true/false

  # Text color (true=light or false=dark).
  text_color_light = false

[design.spacing]
  # Customize the section spacing. Order is top, right, bottom, left.
  padding = ["60px", "0", "60px", "0"]

[advanced]
 # Custom CSS.
 css_style = ""

 # CSS class.
 css_class = ""
+++

<br>

## Overview

<br>

<p style="text-align: right">
<em>[What I propose] is not a reform of significance testing as currently practiced in soft-psych. We are making a more heretical point… We are attacking the whole tradition of null-hypothesis refutation as a way of appraising theories… Most psychology uses conventional Ho refutation in appraising the weak theories of soft psychology… [is] living in a fantasy world of “testing” weak theories by feeble methods.</em></p>


<p style="text-align: right">
– <a href="https://www.tandfonline.com/doi/abs/10.1207/s15327965pli0102_1">Paul Meehl</a> (1990)</p>


A [medical reversal](https://en.wikipedia.org/wiki/Medical_reversal) is when an existing treatment is found to be ineffective and harmful. Psychology, for example, has been racking up reversals. In recent years, scholarship showed only [40-65%](https://www.tandfonline.com/doi/full/10.1080/01973533.2019.1577736) of some classic results were replicated, in the weak sense of finding statistical significance for the same direction of effect (less than zero or greater than zero effect). Even in those that replicated, the average effect found was [half](https://etiennelebel.com/documents/osc(2015,science).pdf) the originally reported effect. We realise that replications of social sciences are themselves [intricate phenomena](https://osf.io/preprints/metaarxiv/cd5j9/) with analytical and [researcher dependencies](https://osf.io/preprints/socarxiv/j7qta/), but while such failures to replicate are far less costly to society than medical ones, it still pollutes science's goal of accumulating knowledge.

Psychology is not alone: [medicine](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124), [cancer biology](https://www.nature.com/articles/483531a), and [economics](https://science.sciencemag.org/content/351/6280/1433) all have their share of irreplicable results. It’d be wrong to write off psychology, or any other discipline for that matter, as not only scientific subfields differ a lot with respect to replication rates and effect-size shrinkage, thereby rendering field-wide generalizations uninformative but also because [one reason](https://statmodeling.stat.columbia.edu/2016/09/22/why-is-the-scientific-replication-crisis-centered-on-psychology/) psychology reversals are so prominent has to do with it’s unusual ‘openness’ in terms of code and data sharing. A less scientific field would never have caught its own bullshit.

<p style="text-align: right"> Box 1. Reversals in the context of COVID-19. </p>

{{% alert note %}}

<br>

A counterexample from the COVID-19 pandemic: the UK's March 2020 policy was based on the idea of [behavioural fatigue](https://www.theguardian.com/world/2020/mar/13/behavioural-scientists-form-new-front-in-battle-against-coronavirus) and [Western resentment of restrictions](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30460-8/fulltext); that a costly prohibition would only last a few weeks before the population revolt against it, and so it had to be delayed until the epidemic's peak. Now, this policy was so politically toxic that we know it had to be based on some domain reasoning, and it is in a way heartening that the government tried to go beyond socially naive epidemiology. But it was [strongly criticised](https://sites.google.com/view/covidopenletter/home) by hundreds of other behavioural scientists, who noted that the evidence for these ideas was too weak to base policy on. [Here's](https://unherd.com/2020/03/dont-trust-the-psychologists-on-coronavirus/) a catalogue of bad psychological takes.

{{% /alert %}}

The following are empirical findings about empirical findings; they’re all open to re-reversal. Also it’s not that “we know these claims are false”: failed replications (or proofs of fraud) usually just challenge the evidence for a hypothesis, rather than affirm the opposite hypothesis. We’ve tried to ban ourselves from saying “successful” or “failed” replication, and to report the best-guess effect size rather than play the bad old Yes/No science game. Code for converting means to Cohen’s _d_ and Hedge’s _g_ [here](https://gist.github.com/g-leech/80a8b5917ae1fb8baf57c8805c72eee9).

[Andrew Gelman and others](https://statmodeling.stat.columbia.edu/2014/02/24/edlins-rule-routinely-scaling-published-estimates/) suggest deflating all single-study effect sizes you encounter in the social sciences, without waiting for the subsequent shrinkage from publication bias, measurement error, data-analytic degrees of freedom, and so on. There is no uniform factor, but it seems sensible to divide novel effect sizes by a number between 2 and 100 (depending on its sample size, method, measurement noise, maybe its p-value if it’s really tiny).

### Selection Criteria

Claims are included if there was at least one of: several failed replications, several good meta-analyses with notably smaller d, very strong publication bias, clear fatal errors in the analysis, a formal retraction, or clear fraud.

Cases like [growth mindset](https://en.wikipedia.org/wiki/Mindset#Fixed_and_Growth_Mindset) are also included, where the eventual effect size, though positive, was a tiny fraction of the hyped original claim. To best interpret our list below, please compare it to the original paper's effect size. Here, we do not provide an averaging of high-quality supporting papers. This is because thousands of potentially non-replicable papers are published every year, and filtering, reading, and listing  them all would be a full-time job even if they were all included in systematic replication or reanalysis projects, ripe fruit. The rule is that if a spurious effect is discussed, or our community or contributors sees it in a book, or if it could hurt someone, it's noteworthy.


### Why trust replications more than originals?

One systematic problem with older results is that they were not pre-registered; we have no assurance that the published analysis was the only one, and so that the inferences presented are in fact valid.

Replication studies have very high rates of [pre-registration](https://en.wikipedia.org/wiki/Preregistration), and higher rates of code and data sharing. For "[direct](http://blog.dansimons.com/2013/06/direct-replication-and-conceptual.html)" replications, the original target study has in effect pre-registered their hypotheses, methods, and analysis plan.

But don't trust any of them, in the sense of accepting them uncritically. Look for 3+ failed replications from different labs, just to save lots of rewriting, as the garden of forking paths and the mystery of the lefty p-curve unfold.


### Project's Motivation

The purpose of collating these reversal effects in social science is to encourage educators to incorporate replications of these effects into their students' project (e.g., third-year, thesis, course work) to provide them the opportunity to experience the research process directly, assess their ability to perform and report scientific research, and to help evaluate the robustness of the original study, thereby also helping them become good consumers of research. The below crowdsourced and community-curated resource aims to satisfy three of [FORRT’s Goals](https://forrt.org/about/mission/):

* Support scholars in their efforts to learn and stay up-to-date on best practices regarding open and reproducible research;
* Facilitating conversations about the ethics and social impact of teaching substantive topics with due regard to scientific openness, epistemic uncertainty and the credibility revolution;
* Foster social justice through the democratization of scientific educational resources and its pedagogies.

and four of [FORRT’s Mission](https://forrt.org/about/mission/):

* Dismantling hierarchies surrounding research, teaching, and service;
* Building community among educators and various non-academic communities working to improve scientific communication and literacy across academia and the general public;
* Building capacity for advocacy; and
* Advocacy for the creation and maintenance of educational resources.


<br>
<br>

## Reversals organized per field
---------------

<br>

### Social Psychology

No good evidence for [many forms of priming](https://replicationindex.com/2017/02/02/reconstruction-of-a-train-wreck-how-priming-research-went-of-the-rails/), automatic behaviour change from ‘related’ (often only metaphorically related) stimuli. Semantic priming is still solid, but the [effect lasts only seconds](http://laplab.ucsd.edu/articles/RohrerPashlerHarris2015JEPG.pdf).



**Elderly priming**, that hearing about old age makes people walk slower. [The p-curve alone](https://psyarxiv.com/3m5y9) argues against the first 20 years of studies.

{{< spoiler text="Statistics" >}}
* Original paper: '[Automaticity of social behavior](https://scholar.google.com/scholar?cluster=3335859380278379099&hl=en&as_sdt=0,5&sciodt=0,5)', Bargh 1996; 2 experiments with n=30. (~5200 citations)
* Critiques: [Doyen 2012](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0029081#s2) (n=120), [Pashler 2011](http://www.psychfiledrawer.org/replication.php?attempt=MTU%3D) (n=66). Meta-analysis: [Lakens 2017](https://psyarxiv.com/3m5y9). \
Total citations: ~44
* Original effect size: d=0.82 to d=1.08.
* Replication effect size: Doyen: d= -0.07. Pashler: d= -0.22
{{< /spoiler >}}

No good evidence for **Money priming**, that “images or phrases related to money cause increased faith in capitalism, and the belief that victims deserve their fate”.
{{< spoiler text="Statistics" >}}
* Original paper: '[Mere exposure to money increases endorsement of free-market systems and social inequality](https://www.ncbi.nlm.nih.gov/pubmed/22774789)', Caruso 2013. n between 30 and 168 (~120 citations).
* Critiques: [Rohrer 2015](http://uweb.cas.usf.edu/~drohrer/pdfs/Rohrer_et_al_2015JEPG.pdf), n=136. [Lodder 2019](https://osf.io/3sh5a/), a meta-analysis of 246 experiments. \
(total citations: ~70)
* Original effect size: system justification d=0.8, just world d=0.44, dominance d=0.51
* Replication effect size: For 47 preregistered experiments in Lodder:
* g = 0.01 [-0.03, 0.05] for system justification, \
g = 0.11 [-0.08, 0.3] for belief in a just world, \
g = 0.07 [-0.02, 0.15] for fair market ideology.
{{< /spoiler >}}

Questionable evidence for **Commitment priming (recall)**, participants exposed to a high-commitment prime would exhibit greater forgiveness.
{{< spoiler text="Statistics" >}}
* Original paper: ‘[Dealing with betrayal in close relationships: Does commitment promote forgiveness?](https://faculty.wcas.northwestern.edu/eli-finkel/documents/Finkeletal_2002_000.pdf)’, Finkel et al. 2002; 3 experiments with (Study 1: n = 89; Study 2: n = 155; Study 3: n = 78). (~ 1104 citations).
* Critiques: [Cheung et al. 2016](https://journals.sagepub.com/doi/pdf/10.1177/1745691616664694) (n = 2284) for Study 1) (~ 110 citations).
{{< /spoiler >}}

**Hostility priming (unscrambled sentences)**, exposing participants to more hostility-related stimuli caused them subsequently to interpret ambiguous behaviors as more hostile.
{{< spoiler text="Statistics" >}}
* Original paper: [The role of category accessibility in the interpretation of information about persons: Some determinants and implications.](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.335.4255&rep=rep1&type=pdf) Srull  and Wyer, Jr. 1979, 2 experiments with (Study 1:  n = 96; Study 2: n = 96). (~  2396 citations).
* Critique: [McCarthy et al. 2018](https://journals.sagepub.com/doi/full/10.1177/2515245918777487#abstract) (n = 7,373) for Study 1) (~38 citations), [McCarthy et al. 2021](https://online.ucpress.edu/collabra/article/7/1/18738/116070/A-Multi-Site-Collaborative-Study-of-the-Hostile) (n = 1,402 for close replication; n = 1,641 for conceptual replication) (~ 2 citations)
{{< /spoiler >}}

**Intelligence priming (contemplation)**, participants primed with a category associated with intelligence (e.g. “professor”) performed 13% better on a trivia test than participants primed with a category associated with a lack of intelligence (“soccer hooligans”).
{{< spoiler text="Statistics" >}}
* Original paper: [The relation between perception and behavior, or how to win a game of trivial pursuit](https://psycnet.apa.org/buy/1998-01060-003), Dijksterhuis  and van Knippenberg, 1998, experiments with (Study 1: n = 60; Study 2: n = 58; Study 3: n = 95; Study 4: n = 43). (~ 1116 citations).
* Critiques:  [O’Donnell et al., 2018](https://journals.sagepub.com/doi/full/10.1177/1745691618755704),  n = 4,493 who met the inclusion criteria; n = 6,454 in supplementary materials;  for Study 4)
{{< /spoiler >}}

**Moral priming (contemplation)**, participants exposed to a moral-reminder prime would demonstrate reduced cheating.
{{< spoiler text="Statistics" >}}
* Original paper: [The Dishonesty of Honest People: A Theory of Self-Concept Maintenance](https://journals.sagepub.com/doi/10.1509/jmkr.45.6.633), Mazar et al. (2008); 6 experiments with (Study 1: n = 229; Study 2: n = 207;  Study 3: n = 450; Study 4: n = 44; Study 5: n = 108; Study 6: n =  326).
* Critiques: [Verschuere et al.](https://journals.sagepub.com/doi/full/10.1177/2515245918781032) [2018](https://journals.sagepub.com/doi/pdf/10.1177/1745691616664694) (n = 5786) replication of Experiment 1 (~ 61 citations)
{{< /spoiler >}}

**Death priming** (Mortality Salience/Terror Management Theory), participants not exposed to mortality primes would show higher fear of death.
{{< spoiler text="Statistics" >}}
* Original paper: [‘Role of Consciousness and Accessibility of Death-Related Thoughts in Mortality Salience Effects’](https://www.researchgate.net/profile/Tom-Pyszczynski/publication/15232849_Role_of_Consciousness_and_Accessibility_of_Death-Related_Thoughts_in_Mortality_Salience_Effects/links/5ad51396aca272fdaf7c08d0/Role-of-Consciousness-and-Accessibility-of-Death-Related-Thoughts-in-Mortality-Salience-Effects.pdf), Greenberg et al. 1994; 4 experiments with (Study 1: n = 58; Study 2: n = 87; Study 3: n = 59; Study 4:  n = 37).(~1230 citations).
* Critiques: [Many Labs 4: Failure to Replicate Mortality Salience Effect With and Without Original Author Involvement](https://psyarxiv.com/vef2c), Klein et al. 2018; (n = 2281) for Experiment 1 (~70 citations).
{{< /spoiler >}}

**Verbal framing (temporal tense)**, participants who read what a person was doing showed enhanced accessibility of intention-related concepts and attribute more intentionality to the person, relative to what they did.
{{< spoiler text="Statistics" >}}
* Original paper: [Learning about what others were doing: Verb aspect and attributions of mundane and criminal intent for past actions](https://journals.sagepub.com/doi/full/10.1177/0956797610395393), Hart and Albarracin (2011), 3 experiments with (Study 1: n = 5458; Study 2: n = 37; Study 3: n = 48) (~ 37 citations).
* Critique: [Registered Replication Report: Hart & Albarracín (2011)](https://journals.sagepub.com/doi/pdf/10.1177/1745691615605826), Eerland et al. 2016; (n= 685 for perfective aspect condition; n = 681 imperfective aspect condition) for Study 3 (~ 67 citations).
{{< /spoiler >}}

**Gustatory Disgust on Moral Judgment**, gustatory disgust triggers a heightened sense of moral wrongness.
{{< spoiler text="Statistics" >}}
* Original paper: A Bad Taste in the Mouth: Gustatory Disgust Influences Moral Judgment, Eskine et al. 2011,  (n = 57) (~542 citations).
* Critique:[ Reexamining the Effect of Gustatory Disgust on Moral Judgment: A Multilab Direct Replication of Eskine, Kacinik, and Prinz (2011)](https://journals.sagepub.com/doi/10.1177/2515245919881152), Ghelfi et al. 2020, (n = 1137) (~13 citations).
{{< /spoiler >}}

No good evidence for the **Macbeth effect**, that moral aspersions induce literal physical hygiene.
{{< spoiler text="Statistics" >}}
* Original paper: '[Washing away your sins: threatened morality and physical cleansing](https://www.ncbi.nlm.nih.gov/pubmed/16960010)', Zhong & Liljenquist 2006. \
(~1190 citations). \
Critiques: [Siev 2018](https://curatescience.org/app/article/300), meta-analysis of 15 studies, cumulative n=1,746. \
Citations: ~6 \
Original effect size: [g](https://en.wikipedia.org/wiki/Effect_size#Hedges'_g) = 0.86 [0.05, 1.68] for Study 3. \
Replication effect size: g = 0.07 [-0.04, 0.19] among the independent lab
{{< /spoiler >}}

A[ failed replication ](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0133193)with opposite results of **Social Class on Prosocial Behaviour** such that people with high social class were more likely to be pro-social than those with low social class.
{{< spoiler text="Statistics" >}}
* A [failed replication](https://www.pnas.org/content/117/13/7103) of the paper by Shu et al. (2012) on  [Signing at the Beginning Makes Ethics Salient and Decreases Dishonest Self-reports in Comparison to Signing at the End](https://www.pnas.org/content/109/38/15197.short) (Shu et al., 2012) (~452 citations). However the data was found to be fake and was [retracted](https://www.buzzfeednews.com/article/stephaniemlee/dan-ariely-honesty-study-retraction)
{{< /spoiler >}}

[No good evidence](https://en.wikipedia.org/wiki/Stanford_prison_experiment#Criticism_and_response) of anything from the **Stanford prison ‘experiment’**. It was not an experiment; ‘demand characteristics’ and scripting of the abuse; constant experimenter intervention; faked reactions from participants; as Zimbardo concedes, they began with a complete “absence of specific hypotheses”.
{{< spoiler text="Statistics" >}}
* Original paper: '[Interpersonal dynamics in a simulated prison](http://pdf.prisonexp.org/ijcp1973.pdf)', Zimbardo 1973 (1800 citations, but [cited by](https://scholar.google.com/scholar?um=1&ie=UTF-8&lr&cites=9776461194085021745) books with hundreds of thousands of citations).
* Critiques: convincing method & data inspection \
[Le Texier](https://www.ncbi.nlm.nih.gov/pubmed/31380664) 2019 (total citations: ~8) \
[Reicher and Haslam](https://bpspsychub.onlinelibrary.wiley.com/doi/full/10.1348/014466605X48998) 2011 (total citations: ~430)
* Original effect size: Key claims were insinuation plus a battery of difference in means tests at up to 20% significance(!). _n_ = 24, data analysis on 21.
* Replication effect size: N/A
{{< /spoiler >}}

[No good evidence](https://psycnet.apa.org/record/1964-03472-001) from the famous **Milgram experiment** that 65% of people will inflict pain if ordered to. Experiment was riddled with researcher degrees of freedom, going off-script, implausible agreement between very different treatments, and “only half of the people who undertook the experiment fully believed it was real and of those, 66% disobeyed the experimenter.”
{{< spoiler text="Statistics" >}}
* Original paper: [Behavioral Study of obedience](https://psycnet.apa.org/record/1964-03472-001), Milgram 1963. n=40 \
(~6600 citations). (The full range of conditions was [n=740](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3976349/).)
* Critiques: [Burger 2011](https://journals.sagepub.com/doi/abs/10.1177/1948550610397632), [Perry 2012](https://thenewpress.com/books/behind-shock-machine), [Brannigan 2013](https://link.springer.com/article/10.1007/s12115-013-9724-3); [Griggs 2016 \
](https://journals.sagepub.com/doi/abs/10.1177/0098628316677644)(total citations: ~240).
* Original effect size: 65% of subjects said to administer maximum, dangerous voltage.
* Replication effect size: [Doliński 2017](https://journals.sagepub.com/doi/abs/10.1177/1948550617693060?journalCode=sppa) is relatively careful, n=80, and found comparable effects to Milgram. Burger (n=70) also finds similar levels of compliance to Milgram, but the level didn't scale with the strength of the experimenter prods (see Table 5: the only real order among the prompts led to universal disobedience), so whatever was going on, it's not obedience. [One selection of follow-up studies](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.694.7724&rep=rep1&type=pdf) found average compliance of 63%, but suffer from the usual publication bias and tiny samples. (Selection was by a student of Milgram.) The most you can say is that there's weak evidence for compliance, rather than obedience. ("Milgram's interpretation of his findings has been largely rejected.")
{{< /spoiler >}}

No good evidence that **tribalism arises spontaneously following arbitrary groupings and scarcity**, within weeks, and leads to inter-group violence . The “spontaneous” conflict among children at Robbers Cave was orchestrated by experimenters; tiny sample (maybe 70?); an exploratory study taken as inferential; no control group; there were really three experimental groups - that is, the experimenters had full power to set expectations and endorse deviance; results from their two other studies, with negative results, were not reported.
{{< spoiler text="Statistics" >}}
* Original paper: '[Superordinate Goals in the Reduction of Intergroup Conflict](https://sci-hub.se/10.1086/222258)', Sherif 1958, n=22; (His books on the studies are more cited: '[Groups in harmony and tension](https://psycnet.apa.org/record/1954-02446-000)' (1958) and [Intergroup Conflict and Co-operation](https://books.google.co.uk/books?hl=en&lr=&id=24TwCQAAQBAJ&oi=fnd&pg=PP1&dq=Group+Conflict+and+Co-operation+&ots=ufwdngs5bi&sig=qxT2o26vEi7KdeJxWNqfSYHdaSM&redir_esc=y#v=onepage&q=Group%20Conflict%20and%20Co-operation&f=false)'.) \
(~7000 total citations including the [SciAm puff piece](http://patrick-fournier.com/d/cours13-3140.pdf)).
* Critiques: [Billig 1976](https://www.nature.com/articles/d41586-018-04582-7) in passing (729 citations), [Perry 2018](https://www.theguardian.com/science/2018/apr/16/a-real-life-lord-of-the-flies-the-troubling-legacy-of-the-robbers-cave-experiment) (citations: 9)
* Original effect size: Not that kind of psychology. ("results obtained through observational methods were cross-checked with results obtained through sociometric technique, stereotype ratings of in-groups and outgroups, and through data obtained by techniques adapted from the laboratory. Unfortunately, these procedures cannot be elaborated here.")
* Replication effect size: N/A
* (Set aside the ethics: the total absence of consent - the boys and parents had no idea they were in an experiment - or the plan to set the forest on fire and leave the boys to it.)
* [Tavris](https://www.psychologicalscience.org/observer/teaching-contentious-classics/comment-page-1) claims that the underlying "realistic conflict theory" is otherwise confirmed. Who knows.
{{< /spoiler >}}

**Screen time and wellbeing**. Lots of screen-time is [not strongly associated](http://www.ox.ac.uk/news/2019-01-15-technology-use-explains-most-04-adolescent-wellbeing) with low wellbeing; it explains about as much of teen sadness as eating potatoes, 0.35%.
{{< spoiler text="Statistics" >}}
* Original paper: Media speculation? (millions of 'citations').
* Critiques: [Orben 2019](https://www.nature.com/articles/s41562-018-0506-1), n=355,358
* Original effect size: N/A
* Replication effect size: median association of technology use with adolescent well-being was β=−0.035, s.e.=0.004
{{< /spoiler >}}

No good evidence that **female-named hurricanes are [more deadly](https://www.sciencedirect.com/science/article/pii/S2212094715300517) than male-named ones**. Original effect size was a 176% increase in deaths, driven entirely by four outliers; reanalysis using a greatly expanded historical dataset found a nonsignificant decrease in deaths from female named storms.
{{< spoiler text="Statistics" >}}
* Original paper: '[Female hurricanes are deadlier than male hurricanes](https://www.pnas.org/content/111/24/8782)', Jung 2014, n=92 hurricanes discarding two important outliers. \
(~76 citations).
* Critiques: [Christensen 2014](https://www.pnas.org/content/111/34/E3497). [Smith 2016](https://sci-hub.se/10.1016/j.wace.2015.11.006), n=420 large storms. \
(total citations: ~15)
* Original effect size: d=0.65: [176%](https://www.google.co.uk/search?source=hp&ei=HC1yXtKbBqeRlwTgzplw&q=41.84+%2F+15.15+&oq=41.84+%2F+15.15+&gs_l=psy-ab.3...606.10628..10753...0.0..0.91.412.5......3....1..gws-wiz.......0i7i30j0.raVAib7H4Jk&ved=0ahUKEwjSmciGm6ToAhWnyIUKHWBnBg4Q4dUDCAg&uact=5) increase in deaths from flipping names from relatively masculine to relatively feminine
* Replication effect size: Smith: 264% decrease in deaths (Atlantic); 103% decrease (Pacific).
{{< /spoiler >}}

At most weak use in **implicit bias testing for racism**. Implicit bias scores [poorly predict](https://sci-hub.se/10.1037/a0032734) actual bias, r = [0.15](https://lnu.se/globalassets/lmdswp201511.pdf). The operationalisations used to measure that predictive power are [often unrelated to actual discrimination](https://onlinelibrary.wiley.com/doi/abs/10.1111/sjop.12288) (e.g. ambiguous brain activations). Test-retest reliability of [0.44](https://www.researchgate.net/publication/309563293_Temporal_Stability_of_Implicit_and_Explicit_Measures_A_Longitudinal_Analysis/link/5c8a8f1d92851c1df94197eb/download) for race, which is usually classed as “unacceptable”. This isn’t news; the original study also found very low test-criterion correlations.
{{< spoiler text="Statistics" >}}
* Original paper: '[Measuring individual differences in implicit cognition: The implicit association test](https://psycnet.apa.org/doiLanding?doi=10.1037%2F0022-3514.74.6.1464)', Greenwald 1998, n=28 for Experiment 3 \
(12,322 citations).
* Critiques: [Oswald 2013](https://sci-hub.se/10.1037/a0032734), meta-analysis of 308 experiments. [Carlsson 2015](https://lnu.se/globalassets/lmdswp201511.pdf). (total citations: ~650)
* Original effect size: attitude d=0.58; r=0.12.
* Replication effect size: Oswald: stereotype IAT r=0.03 [-0.08, 0.14], attitude IAT r=0.16 [0.11, 0.21]
{{< /spoiler >}}

The **Pygmalion effect**, that a teacher’s expectations about a student affects their performance, is at most [small, temporary, and inconsistent](https://journals.sagepub.com/doi/abs/10.1207/s15327957pspr0902_3), r&lt;0.1 with a reset after weeks. Rosenthal’s original claims about massive IQ gains, persisting for years, are straightforwardly false (“The largest gain… 24.8 IQ points in excess of the gain shown by the controls.”), and used an invalid test battery. Jussim: “90%–95% of the time, students are unaffected by teacher expectations”.
{{< spoiler text="Statistics" >}}
* Original paper: '[Teachers' expectancies: Determinants of pupils' IQ gains](https://journals.sagepub.com/doi/10.2466/pr0.1966.19.1.115)', Rosenthal 1966, n around 320. (700 citations, but the [popularisation](https://link.springer.com/article/10.1007/BF02322211) has 10,500).
* Critiques: [Raudenbush 1984](https://psycnet.apa.org/record/1984-16218-001), [Thorndike 1986](https://journals.sagepub.com/doi/10.3102/00028312005004708), [Spitz 1999](https://www.sciencedirect.com/science/article/abs/pii/S0160289699000264), [Jussim 2005 \
](https://journals.sagepub.com/doi/abs/10.1207/s15327957pspr0902_3)(total citations: ~2100)
* Original effect size: Average +3.8 IQ, d=0.25.
* Replication effect size: Raudenbush: d=0.11 for students new to the teacher, tailing to d=0 otherwise. Snow: median effect d=0.035.
{{< /spoiler >}}

At most [weak](https://www.sciencedirect.com/science/article/pii/S0022440514000831) [evidence](https://psycnet.apa.org/record/2013-02693-001) for **stereotype threat** suppressing girls’ maths scores. i.e. the interaction between gender and stereotyping.
{{< spoiler text="Statistics" >}}
* Original paper: '[Stereotype Threat and Women’s Math Performance](https://www.sciencedirect.com/science/article/abs/pii/S0022103198913737)', Spencer 1999, n=30 women (~3900 citations).
* Critiques: [Stoet & Geary 2012](https://journals.sagepub.com/doi/10.1037/a0026617), meta-analysis of 23 studies. [Ganley 2013](https://psycnet.apa.org/record/2013-02693-001), n=931. [Flore 2015](https://www.sciencedirect.com/science/article/pii/S0022440514000831), meta-analysis of 47 measurements. [Flore 2018](https://www.tandfonline.com/doi/full/10.1080/23743603.2018.1559647), n=2064. (total citations: ~500)
*  Original effect size: Not reported properly; Fig.2 looks like control-group-women-mean-score = 17 with sd=20, and experiment-group-women-score = 5 with sd=15. Which might mean roughly d= −0.7.
* Replication effect size: \
Stoet: d= −0.17 [−0.27, −0.07] for unadjusted scores. \
Ganley: various groups, d= -0.27 to -0.17. \
Flore 2015: g= −0.07 [−0.21; 0.06] after accounting for publication bias. \
Flore 2018: d= −0.05 [−0.18, 0.07]
{{< /spoiler >}}

Questionable evidence for an **increase in “narcissism”** (leadership, vanity, entitlement) in young people over the last thirty years. The basic counterargument is that they’re misidentifying an age effect as a cohort effect (The narcissism construct [apparently](https://journals.sagepub.com/doi/abs/10.1177/1745691609357019) decreases by about a standard deviation between adolescence and retirement.) “every generation is Generation Me” \
All such “generational” analyses are at best needlessly noisy approximations of social change, since generations are not discrete natural kinds, and since people at the supposed boundaries are indistinguishable.
{{< spoiler text="Statistics" >}}
* Original paper: [Twenge 2013](https://journals.sagepub.com/doi/full/10.1177/2167696812466548), 'Generation Me', but it's [an ancient hypothesis.](https://quoteinvestigator.com/2010/05/01/misbehave) Various studies, including national surveys. \
(~2600 citations)
* Critiques: [Five](https://www.sciencedirect.com/science/article/abs/pii/S0092656608001712) [studies](https://www.gleech.org/psych) [from](https://www.gleech.org/psych) [Donnellan](https://www.gleech.org/psych) [and Trzesniewski](https://journals.sagepub.com/doi/abs/10.1177/1745691609356789), n=477,380. [Arnett 2013](https://journals.sagepub.com/doi/full/10.1177/2167696812466842), [Roberts 2017](https://journals.sagepub.com/doi/abs/10.1177/1745691609357019), [Wetzel 2017 \
](https://escholarship.org/uc/item/5zq0d131)(~660 total citations)
* Original effect size: [d=0.37](https://journals.sagepub.com/doi/abs/10.1177/1948550609355719) increase in NPI scores (1980-2010), n=49,000.
* Replication effect size: Roberts doesn't give a d but it's near 0. something like d=0.03 ((15.65 - 15.44) / 6.59 )
    *

![Figure 1](images/Fig1_Roberts_2017.png)

* [Table 3](https://sci-hub.se/10.1177/1745691609356789) here shows a mix of effects in 30 related constructs between 1977 and 2006, up and down.
* Wetzel: d = -0.27 (1990 - 2010)
{{< /spoiler >}}

* Be very suspicious of anything by Diederik Stapel. [58 retractions here](http://retractiondatabase.org/RetractionSearch.aspx?AspxAutoDetectCookieSupport=1#?auth%3dStapel%252c%2bDiederik%2bA).

### Positive Psychology


* No good evidence that taking a **“power pose”** lowers cortisol, raises testosterone, risk tolerance.
  * That a person can, by assuming two simple 1-min poses, embody power and instantly become more powerful has real-world, actionable implications.
  * After the initial backlash, it focussed on subjective effect, a claim about “[increased feelings of power](https://journals.sagepub.com/eprint/CzbNAn7Ch6ZZirK9yMGH/full)”. Even then: [weak evidence](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3198470) for decreased “feelings of power” from contractive posture only. My reanalysis is [here](https://github.com/g-leech/argmin-gravitas/blob/master/scripts/psych/cuddy2010.ipynb).
{{< spoiler text="Statistics" >}}
* Original paper: '[Power Posing : Brief Nonverbal Displays Affect Neuroendocrine Levels and Risk Tolerance](https://www.ncbi.nlm.nih.gov/pubmed/20855902)', Cuddy, Carney & Yap 2010, n=42 mixed sexes.
* [Many](https://dataverse.harvard.edu/file.xhtml?persistentId=doi:10.7910/DVN/FMEGS6/AYAZJ7&version=3.0), [many errors](https://statmodeling.stat.columbia.edu/2016/01/26/more-power-posing/). [Disowned](https://faculty.haas.berkeley.edu/dana_carney/pdf_My%20position%20on%20power%20poses.pdf) by one of its authors. Thanks to a reanalysis by someone else, [we actually have the data](https://dataverse.harvard.edu/file.xhtml?persistentId=doi:10.7910/DVN/FMEGS6/U2QT5N&version=3.0). \
(~1100 citations; 56m views on TED).
* Critiques: [Ranehill 2015](https://journals.sagepub.com/doi/10.1177/0956797614553946), n=200 (not an exact replication); \
[Garrison 2016](https://pdfs.semanticscholar.org/314f/2bb18c67a39791de8b4a799e01738a3d7a88.pdf), n=305; \
[Simmons and Simonsohn 2016](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2791272), p-curve check of 33 studies; \
[Ronay 2017](https://www.tandfonline.com/doi/full/10.1080/23743603.2016.1248081), n=108; \
[Metzler 2019](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6585898/#!po=40.4762), n=82 men. \
[Crede 2017](https://journals.sagepub.com/doi/abs/10.1177/1948550617714584?journalCode=sppa), [Crede 2018](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3198470): multiverse analysis shows that the original result is heavily dependent on posthoc analysis choices. \
(total citations: ~400)
* Original effect sizes: \
h = 0.61 in risk-taking, \
d = -0.30 for cortisol, \
d=0.35 for testosterone \
d=0.79 for feelings of power
* Replication effect size: risk-taking d = [−0.176], \
testosterone d = [−0.2, −0.19, 0.121], \
cortisol d = [−0.157, 0.22, 0.028, 0.034] \
most CIs overlapping 0
{{< /spoiler >}}


* Weak evidence for **facial-feedback** (that smiling causes good mood and pouting bad mood).

{{< spoiler text="Statistics" >}}
(~2200 citations).
* Original paper: '[Inhibiting and Facilitating Conditions of the Human Smile: A Nonobtrusive Test of the Facial Feedback Hypothesis](https://sci-hub.se/10.1037/0022-3514.54.5.768)' by Strack, Martin, Stepper 1988. n=92 twice. \
(total citations: ~220), [Schimmack 2017](https://replicationindex.com/2017/09/04/the-power-of-the-pen-paradigm-a-replicability-analysis/)
* Critiques: 17 replications, [Wagenmakers et al 2016](https://www.ejwagenmakers.com/2016/WagenmakersEtAl2016Strack.pdf), \
* [A meta-analysis of 98 studies](https://psyarxiv.com/svjru/) finds d= 0.2 [0.14, 0.26] with an absurdly low p value, and doesn't find publication bias. But this latter point simply can't be right. Given d = 0.2 and the convention of targeting 80% power to detect a real phenomenon, you would need very high sample sizes, n > 500. And almost all of the included studies are N &lt; 100. [Schimmack](https://replicationindex.com/2017/09/04/the-power-of-the-pen-paradigm-a-replicability-analysis/) finds strong evidence of publication bias on a subset of these papers, using a proper power analysis. \
* Original effect size: d = 0.43 (0.82 out of 9)
* Replication effect size: 0.03 out of 9, CI overlapping 0.
98 pieces of very weak evidence cannot sum to strong evidence, whatever the p-value says. ([The author agrees](https://twitter.com/coles_nicholas_/status/1116706173833576450).)
{{< /spoiler >}}


* [Reason to be cautious](https://forum.effectivealtruism.org/posts/eryaF6RPtepDs9KdP/is-mindfulness-good-for-you) about **mindfulness for mental health**. Most studies are low quality and use inconsistent designs, there’s higher heterogeneity than other mental health treatments, and there’s [strong reason](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0153220) to suspect reporting bias. None of the 36 meta-analyses before 2016 mentioned publication bias. The hammer may fall.

{{< spoiler text="Statistics" >}}
* Critiques: [Coronado-Montoya 2016](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0153220)
* Original effect size: prima facie, [d=0.3](https://jamanetwork.com/journals/jamainternalmedicine/article-abstract/1809754) for anxiety or depression
* Replication effect size: Not yet.
{{< /spoiler >}}


* [No good evidence](https://www.theguardian.com/science/brain-flapping/2013/jan/21/blue-monday-depressing-day-nonsense-science) for **Blue Monday**, that the third week in January is the peak of depression or low affect ‘as measured by a simple mathematical formula developed on behalf of Sky Travel’. You’d need a huge sample size, in the thousands, to detect the effect reliably and this has never been done.





### Cognitive Psychology

* Good and robust evidence against **ego depletion**, that willpower is limited in a muscle-like fashion.
{{< spoiler text="Statistics" >}}
* Original paper: '[Ego Depletion: Is the Active Self a Limited Resource?](https://www.ncbi.nlm.nih.gov/pubmed/9599441)', Baumeister 1998, n=67 (~5700 citation* Critiques: [Hagger 2016](https://journals.sagepub.com/doi/pdf/10.1177/1745691616652873), 23 independent conceptual replications \
(total citations: ~6* Critique: [Vohs et al.  2021](https://journals.sagepub.com/doi/full/10.1177/0956797621989733), multisite project, n = 3,531 over 36 sites. Altmetrics: * Original effect size: something like d = -1.96 between control and worst condition. (I hope I'm [calculating](https://gist.github.com/g-leech/80a8b5917ae1fb8baf57c8805c72eee9) that wron* Replication effect size: d = 0.04 [−0.07, 0.14]. (NB: not testing the construct the same wa* Replication effect size ([Vohs et al.  2021](https://journals.sagepub.com/doi/full/10.1177/0956797621989733)) : d = 0.06.
{{< /spoiler >}}

* Mixed evidence for the **Dunning-Kruger effect**. No evidence for the “Mount Stupid” misinterpretation.
    * First disambiguate the claim
        * 5 claims involved, three of which are just popular misunderstandings: \
1) the one the authors actually make: that poor performers (e.g. the bottom quartile) overestimate their performance more than good performers do: L > U




![](images/Fig1_DKeffect.png)
  \
Ignore the magnitudes, this is made-up data

    (Formally "the difference y "the difference is self-described performance and  actual performance has a negative slope over actual performance moderator.)

        * 2) that people [in general](https://en.wikipedia.org/wiki/Illusory_superiority) overestimate their own ability  self-described performance and actual performance
        * 3) the meme: that there's a [u-shaped relationship](https://www.google.com/search?q=mount+stupid+dunning&source=lnms&tbm=isch&sa=X&ved=2ahUKEwia5taF8LLoAhUdURUIHTtZC3EQ_AUoAXoECAwQAw&biw=1280&bih=654) between perceived and actual ability. "The less competent someone is, the more competent they think they are".






![](images/Fig2_DKeffect.png)




        * Alternatively, that poor performers think they're better than good performers: Self-described performance of poor performers think they are better than good performers.



![](images/Fig3_DKeffect.png)

        * 5) the authors' explanation: that (1) is caused by a lack of 'metacognitive' skills, being able to reflect on your ability at the task. That it's a cognitive bias suffered by the worst at a task. Incompetence, like anosognosia, not only causes poor performance but also the inability to recognize that one's performance is poor.
{{< spoiler text="Statistics" >}}
* Original paper: '[Unskilled and unaware of it: how difficulties in recognizing one's own incompetence lead to inflated self-assessments.](https://sci-hub.se/10.1037/0022-3514.77.6.1121)', Dunning & Kruger 1999, n=334 undergrads. This contains claims (1), (2), and (5) but no hint of (3) or (4). (~5660 citations)* Critiques: [Gignac 2020](https://www.sciencedirect.com/science/article/abs/pii/S0160289620300271), n=929; [Nuhfer 2016](https://scholarcommons.usf.edu/cgi/viewcontent.cgi?article=1188&context=numeracy) and [Nuhfer 2017](https://scholarcommons.usf.edu/cgi/viewcontent.cgi?article=1215&context=numeracy), n=1154; [Luu 2015](https://danluu.com/dunning-kruger); [Greenberg 2018](https://www.facebook.com/spencer.greenberg/posts/10104093568422862), n=534; [Yarkoni 2010](https://www.talyarkoni.org/blog/2010/07/07/what-the-dunning-kruger-effect-is-and-isnt/). \
(total citations: ~20* Original effect size: No sds reported so I don't know. 2 of the 4 experiments showed a positive relationship between score and perceived ability; 2 showed no strong relationship. And the best performers tended to underestimate their performance. [This replicates](https://www.sciencedirect.com/science/article/abs/pii/S0160289620300271): the correlation between your IQ and your assessment of it is aroun* r ≃ 0.3. (3) and (4) are not at all warranted. \
(5) is much shakier than (1). The original paper concedes that there's a [purely statistical](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect#Mathematical_critique) explanation for (1): just that it is much easier to overestimate a low number which has a lower bound! And the converse: if I am a perfect performer, I am unable to overestimate myself. D&K just think there's something notable left when you subtract this. \
It's also confounded by (2)* Replication effect size (for claim 1): 3 of the 4 original studies can be explained by noisy tests, bounded scales, and artefacts in the plotting procedure. ("the primary drivers of errors in judging relative standing are general inaccuracy and overall biases tied to task difficulty".) Only about 5% of low-performance people were very overconfident (more than 30% off) in the Nuhfer data* Gignac & Zajenkowski use IQ rather than task performance, and run two less-confounded tests, finding  r = −0.05  between P and errors, and r = 0.02  for a quadratic relationship between self-described performance and actual performance* [Jansen (2021)](https://www.nature.com/articles/s41562-021-01057-0) find independent support for claim 1 (n=3500) (the "performance-dependent estimation model") and also argue for (5), since they find less evidence for an alternative explanation, Bayesian reasoning towards a prior of "I am mediocre". (Fig 5b follows the original DK plot style, and is very unclear as a result.* [Muller (2020)](https://onlinelibrary.wiley.com/doi/10.1111/ejn.14935) replicate claim (1) and add some EEG stuff* Some suggestions that claim (2) is [WEIRD](https://www.apa.org/monitor/2010/05/weird) only.
{{< /spoiler >}}


* Questionable evidence for a tiny **“depressive realism” effect**, of increased predictive accuracy or decreased cognitive bias among the clinically depressed.
{{< spoiler text="Statistics" >}}
* Original paper: '[Judgment of contingency in depressed and nondepressed students: sadder but wiser?](https://www.ncbi.nlm.nih.gov/pubmed/528910)', 1979 (2450 citations).
* Critiques: [Moore & Fresco 2012 \
](https://www.ncbi.nlm.nih.gov/pubmed/22717337)(211 total citations)
* Original effect size: d= -0.32 for bias about 'contingency', how much the outcome actually depends on what you do, \
n=96 students, needlessly binarised into depressed and nondepressed based on [Beck score](https://en.wikipedia.org/wiki/Beck_Depression_Inventory) > 9. (Why?)
* Replication effect size: d = -0.07 with massive sd=0.46, n=7305, includes a trim-and-fill correction for publication bias. "Overall, however, both dysphoric/depressed individuals (d= .14) and nondysphoric/nondepressed individuals evidenced a substantial positive bias (d= .29)"
{{< /spoiler >}}

* Questionable evidence for the **“hungry judge” effect**, of massively reduced acquittals (d=2) just before lunch. Case order isn’t independent of acquittal probability (“unrepresented prisoners usually go last and are less likely to be granted parole”); favourable cases may take predictably longer and so are pushed until after recess; effect size is implausible on priors; explanation involved ego depletion.
{{< spoiler text="Statistics" >}}
* Original paper: '[Extraneous factors in judicial decisions](https://www.pnas.org/content/108/17/6889)', 2011 (1040 citations).
* Critiques: [Weinshall-Margel 2011](https://www.pnas.org/content/108/42/E833.long), [Glöckner 2016](http://journal.sjdm.org/16/16823/jdm16823.html), [Lakens 2017 \
](http://nautil.us/blog/impossibly-hungry-judges)(77 total citations)
* Original effect size: d=1.96, "the probability of a favorable ruling steadily declines from ≈0.65 to [0.05] and jumps back up to ≈0.65 after a break for a meal", \
n=8 judges with n=1100 cases.
* Replication effect size: N/A.
{{< /spoiler >}}

* [No good evidence](https://www.tandfonline.com/doi/abs/10.1207/s15326985ep4104_1) for **multiple intelligences** (in the sense of statistically independent components of cognition). [Gardner](https://www.cambridge.org/core/books/scientists-making-a-difference/multiple-intelligences-prelude-theory-and-aftermath/E12A49C8FF04E7474D8DEB1A573EABFC), the inventor: “Nor, indeed, have I carried out experiments designed to test the theory… I readily admit that the theory is no longer current. Several fields of knowledge have advanced significantly since the early 1980s.
{{< spoiler text="Statistics" >}}
* Original paper: [Frames of Mind: The Theory of Multiple Intelligences](https://www.goodreads.com/book/show/294035.Frames_of_Mind), Gardner 1983 (37,229 citations).
{{< /spoiler >}}

* At most weak evidence for **brain training** (that is, “far transfer” from daily training games to fluid intelligence) in general, in particular from the Dual n-Back game.
{{< spoiler text="Statistics" >}}
* Original paper: '[Improving fluid intelligence with training on working memory](https://www.pnas.org/content/105/19/6829)', Jaeggi 2008, n=70. (2200 citations).
* Critiques: [Melby-Lervåg 2013](https://sci-hub.se/10.1037/a0028228), meta-analysis of 23 studies. \
[Gwern 2012](https://www.gwern.net/DNB-meta-analysis#moderators), meta-analysis of 45 studies.
* Original effect size: d=0.4 over control, 1-2 days after training
* Replication effect size: Melby: d=0.19 [0.03, 0.37] nonverbal; d=0.13 [-0.09, 0.34] verbal. Gwern: d=0.1397 [-0.0292, 0.3085], among studies using active controls.
* [Maybe](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1001756) some effect on non-Gf skills of the elderly. \
[A 2020 RCT](https://openaccess.nhh.no/nhh-xmlui/bitstream/handle/11250/2657279/DP%2009.pdf?sequence=1&isAllowed=y) on 572 first-graders finds an effect (d=0.2 to 0.4), but many of the apparent far-transfer effects come only 6-12 months later, i.e. well past the end of most prior studies.
* In general, be highly suspicious of anything that claims a positive permanent effect on adult IQ. Even in children the absolute maximum is [4](https://www.givewell.org/international/technical/programs/salt-iodization#Improvingmentalfunction)-[15 points](https://academic.oup.com/jeea/article-abstract/15/2/355/2691480) for a powerful single intervention (iodine supplementation during pregnancy in deficient populations). \

* See also the hydrocephaly claim under “[Neuroscience](https://www.gleech.org/psych#neuro)”. \

* Good [replication rate](https://digest.bps.org.uk/2017/06/05/these-nine-cognitive-psychology-findings-all-passed-a-stringent-test-of-their-replicability) elsewhere.
{{< /spoiler >}}

* Failed replications of **automatic imitation** claims

* Weak or no evidence for cross-domain **congruency sequence effect**






### Developmental Psychology





* Some evidence for a tiny effect of **growth mindset** (thinking that skill is improvable) on attainment.
    * Really we should distinguish the correlation of the mindset with attainment vs. the effect of a 1-hour class about the importance of growth-mindset on attainment. I cover the latter but check out [Sisk](https://journals.sagepub.com/doi/abs/10.1177/0956797617739704?journalCode=pssa) for evidence against both.
    * Original paper: '[Implicit theories and their role in judgments and reactions: A word from two perspectives](https://www.tandfonline.com/doi/abs/10.1207/s15327965pli0604_1)', Dweck 1995 introduced the constructs.(~2200 citations).
    * Critiques: [Sisk 2018](https://journals.sagepub.com/doi/abs/10.1177/0956797617739704?journalCode=pssa), a pair of meta-analyses on both questions, n=365,915 ; \
[Folioano 2019](https://www.niesr.ac.uk/sites/default/files/publications/Changing%20Mindsets_0.pdf), a big study of the intervention in English schools, n=4584. \
(~180 total citations)
    * Original effect size: Hard to pin down, but up to [r = 0.54 / d=0.95](https://www.motsd.org/cmsAdmin/uploads/blackwell-theories-of-intelligence-child-dev-2007.pdf) in some papers.
    * Replication effect size: \
Sisk: r = 0.10 [0.08, 0.13] for the (nonexperimental) correlation \
Sisk: d = 0.08 [0.02, 0.14] \
Folioano: Literally zero, d=0.00 [-0.02; 0.02]
* “**Expertise** attained after 10,000 hours practice” (Gladwell). [Disowned by the supposed proponents](https://bjsm.bmj.com/content/47/9/533).
* No good evidence that tailoring **teaching **to students’ preferred **learning styles** has any effect on objective measures of attainment. There are dozens of these inventories, and really you’d have to look at each. (I won’t.)
    * Original paper: Multiple origins. e.g. the '[Learning style inventory: technical manual](https://scholar.google.co.uk/scholar?cites=6850783624494276594&as_sdt=2005&sciodt=0,5&hl=en)' (Kolb), ~4200 citations. The VARK questionnaire (Fleming). But it is ubiquitous in Western educational practice.
    * Critiques: [Willingham 2015](https://journals.sagepub.com/doi/abs/10.1177/0098628315589505); [Pashler 2009](https://journals.sagepub.com/doi/full/10.1111/j.1539-6053.2009.01038.x); [Knoll 2017](https://www.ncbi.nlm.nih.gov/pubmed/27620075) (n=54); [Husmann 2019 \
](https://anatomypubs.onlinelibrary.wiley.com/doi/10.1002/ase.1777)(total citations: ~2400 )
    * Original effect size: ???
    * Replication effect size: [?? ], n=???


### Personality psychology





* Links Between **Personality Traits and Consequential Life Outcomes**. Pretty good? [One lab’s systematic replications](https://sci-hub.se/10.1177/0956797619831612) found that effect sizes shrank by 20% though (see




[comments](#heading=h.9aledhi0y6bm) below by Oliver C. Schultheiss).  
* Anything by Hans Eysenck should be considered suspect, but in particular these [26 ‘unsafe’ papers](https://retractionwatch.com/wp-content/uploads/2019/10/HE-Enquiry.pdf) (including the one which says that reading prevents cancer).


###


### Behavioural science

---




* The effect of **“nudges”** (clever design of defaults) may be exaggerated in general. [One big review](https://www.nber.org/system/files/working_papers/w27594/w27594.pdf) found average effects were six times smaller than billed. (Not saying there are no big effects.)
* [Here are](https://www.vox.com/future-perfect/2020/2/26/21154466/research-education-behavior-psychology-nudging) [a few](https://jasoncollins.blog/2020-04-07-the-limits-of-behavioural-science-coronavirus-edition/) [cautionary](https://jasoncollins.blog/arent-we-smart-fellow-behavioural-scientists/) [pieces](https://unherd.com/2020/03/dont-trust-the-psychologists-on-coronavirus/) on whether, aside from the pure question of reproducibility, behavioural science is ready to steer policy.
    * [Moving the signature box to the top of forms](https://www.pnas.org/content/pnas/117/13/7103.full.pdf) does not decrease dishonest reporting in the rest of the form.
* One comment mentioned we need to consider frequently studied phenomena such as differential reinforcement, extinction bursts, functional communication training, derived relational responding, schedules of R+.


### Marketing





* [Brian Wansink](https://web.archive.org/web/20180307074049/https://www.timvanderzee.com/the-wansink-dossier-an-overview/) accidentally admitted gross malpractice; fatal errors were found in 50 of his lab’s papers. These include flashy results about increased portion size massively reducing satiety.




### Neuroscience




* No good evidence that brains contain **one mind per hemisphere**. The corpus callosotomy studies which purported to show “two consciousnesses” inhabiting the same brain [were badly overinterpreted](https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(17)30190-0).
* Very weak evidence for the existence of high-functioning (IQ ~ 100) **hydrocephalic** people. The hypothesis begins from extreme prior improbability; the effect of massive volume loss is claimed to be on average positive for cognition; the case studies are often questionable and involve little detailed study of the brains (e.g. 1970 scanners were not capable of the precision claimed).
    * Original paper: No paper; instead a documentary and [a profile](https://web.archive.org/web/20151218013040/http://www.sciencemag.org/content/210/4475/1232.extract) of the claimant, John Lorber. Also [Forsdyke 2015](https://web.archive.org/web/20160315051631/http://link.springer.com/article/10.1007%2Fs13752-015-0219-x) and the fraudulent [de Oliveira 2012](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4956934/) ( citations).
    * Critiques: [Hawks 2007](https://www.gwern.net/docs/www/johnhawks.net/98da7879009865e89fba1c50898faad86a14ecd9.html); [Neuroskeptic 2015](https://www.discovermagazine.com/the-sciences/is-your-brain-really-necessary-revisited); [Gwern 2019 \
](https://www.gwern.net/Hydrocephalus)(total citations: )
    * Alex Maier writes in with [a cool 2007 case study](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(07)61127-1/fulltext) of a man who got to 44 years old before anyone realised his severe hydrocephaly, through marriage and employment. IQ 75 (i.e. d=-1.7), which is higher than I expected, but still far short of the original claim, d=0.
* **Readiness potentials** [seem to be actually causal](https://www.discovermagazine.com/mind/libet-and-free-will-revisited), not diagnostic. So Libet’s studies also do not show what they purport to. We still don’t have free will (since random circuit noise can tip us when the evidence is weak), but in a different way. \

* [No good evidence](https://www.npr.org/sections/13.7/2013/12/02/248089436/the-truth-about-the-left-brain-right-brain-relationship) for **left/right hemisphere dominance correlating with personality differences**. No clear hemisphere dominance at all in [this study](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0071275).
    * Original paper: Media speculation?
    * Critiques: \
(total citations: )
    * Original effect size: N/A?
    * Replication effect size: [ ], n=


### Psychiatry



* At most [extremely weak evidence](https://www.nature.com/articles/d41586-019-03268-y) that psychiatric hospitals (of the 1970s) could not detect sane patients in the absence of deception.


### Parapsychology




* No good evidence for **precognition**, undergraduates improving memory test performance by studying after the test. This one is fun because Bem’s statistical methods were “impeccable” in the sense that they were what everyone else was using. He is Patient Zero in the replication crisis, and has done us all a great service. (Heavily reliant on a flat / frequentist prior; evidence of optional stopping; forking paths analysis.)
    * Original paper: '[Feeling the future: Experimental evidence for anomalous retroactive influences on cognition and affect](https://www.ncbi.nlm.nih.gov/pubmed/21280961)', Bem 2012, 9 experiments, n=1000 or so. \
(~1000 citations, but mostly not laudatory).
    * Critiques: [Ritchie 2012](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0033423), n=150. On one of the nine. \
[Gelman 2013](https://slate.com/technology/2013/07/statistics-and-psychology-multiple-comparisons-give-spurious-results.html); [Schimmack 2018](https://replicationindex.com/2017/09/04/the-power-of-the-pen-paradigm-a-replicability-analysis/), methodology. \
(total citations: 200)
    * Original effect size: Various, mean d=0.22. For experiment 9, r= -0.10.
    * Replication effect size: Correlation between r= -0.02


### Evolutionary psychology




* Weak evidence for **romantic priming**, that looking at attractive women increases men’s conspicuous consumption, time discount, risk-taking. Weak, despite there being 43 independent confirmatory studies!: one of the strongest publication biases / p-hacking ever found.
    * Original paper: '[Do pretty women inspire men to discount the future?](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1810021/pdf/15252976.pdf)', Wilson and Daly 2003. n=209 (but only n=52 for each cell in the 2x2) \
(~560 citations).
    * Critiques: [Shanks et al](https://sci-hub.se/10.1037/xge0000116) (2015): show that the 43 previous studies have an unbelievably bad funnel plot. They also run 8 failed replications. (total citations: ~80)
    *



![](images/Fig1_Shanks_2015.png)

    * Original effect size: d=0.55 [-0.04, 1.13] for the difference between men and women. Meta-analytic d= 0.57 [0.49, 0.65] !
    * Replication effect size: 0.00 [-0.12, 0.11]
* Questionable evidence for the **menstrual cycle version of the dual-mating-strategy **hypothesis (that “heterosexual women show stronger preferences for uncommitted sexual relationships [with more masculine men]… during the high-fertility ovulatory phase of the menstrual cycle, while preferring long-term relationships at other points”). Studies are usually tiny (median n=34, mostly over one cycle). Funnel plot looks ok though.
    * Original paper: '[Menstrual cycle variation in women's preferences for the scent of symmetrical men](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1689051/pdf/9633114.pdf)', Gangestad and Thornhill (1998). (602 citations).
    * Critiques: [Jones et al](https://sci-hub.se/10.1016/j.tics.2018.10.008) (2018) (total citations: 32)
    * Original effect size: g = 0.15, SE = 0.04, n=5471 in [the meta-analysis](https://psycnet.apa.org/doiLanding?doi=10.1037%2Fa0035438). Massive battery of preferences included (...)
    * Replication effect size: Not a meta-analysis, just a list of recent well-conducted "null" studies and a plausible alternative explanation.
    * Note from a professor friend: the idea of a dual-mating hypothesis itself is not in trouble: \
the specific menstrual cycle research doesn't seem to replicate well. However, to my knowledge the basic pattern of short vs long term relationship goals predicting [women's] masculinity preferences is still robust.
* No good evidence that **large parents have more sons** (Kanazawa); original analysis makes several errors and [reanalysis shows near-zero effect](https://sci-hub.se/10.1016/j.jtbi.2007.11.004). (Original effect size: 8% more likely.)
    * Original paper: ( citations).
    * Critiques: \
(total citations: )
    * Original effect size: [ ], n=
    * Replication effect size: [ ], n=
* At most weak evidence that **men’s strength in particular predicts opposition to egalitarianism**.
    * Original paper: [Petersen et al](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1798773) (194 citations).
    * Critiques: [Measurement was of arm circumference in students](https://pdfs.semanticscholar.org/b63e/25900013605c16f4ad74c636cfbd8e9a3e8e.pdf), and effect disappeared when participant age is included. \
(total citations: 605)
    * Original effect size: N/A, battery of F-tests.
    * Replication effect size: Gelman: none as in zero. \
[The same lab later returned](https://onlinelibrary.wiley.com/doi/abs/10.1111/pops.12505) with 12 conceptual replications on a couple of measures of (anti-)egalitarianism. They are very focussed on statistical significance instead of effect size. Overall male effect was b = 0.17 and female effect was b = 0.11, with a nonsignificant difference between the two (p = 0.09). (They prefer to emphasise the lab studies over the online studies, which showed a stronger difference.) Interesting that strength or "formidability" has an effect in both genders, whether or not their main claim about gender difference holds up.




### Psychophysiology





* [At most very weak evidence](https://sci-hub.se/10.1016/j.cobeha.2020.01.001) that **sympathetic nervous system activity predicts political ideology** in a simple fashion. In particular, subjects’ skin conductance reaction to threatening or disgusting visual prompts - a [noisy and questionable](https://sci-hub.se/10.1016/j.cobeha.2020.01.001) measure.
    * Original paper: [Oxley et al](https://www.ncbi.nlm.nih.gov/pubmed/18801995), n=46 ( citations). p=0.05 on a falsely binarised measure of ideology.
    * Critiques: Six replications so far ([Knoll et al](https://journals.sagepub.com/doi/full/10.1177/2053168015621328); 3 from [Bakker et al](https://psyarxiv.com/vdpyt)) , five negative as in nonsignificant, one [forking](https://psyarxiv.com/49hfg) ("holds in US but not Denmark") \
(total citations: )
    * Original effect size: [ ], n=
    * Replication effect size: [ ], n=




### **Behavioural genetics**




* [No good evidence](https://slatestarcodex.com/2019/05/07/5-httlpr-a-pointed-review/) that **5-HTTLPR** is strongly linked to depression, insomnia, PTSD, anxiety, and more. See also [COMT and APOE](https://pubmed.ncbi.nlm.nih.gov/23012269/) for intelligence, [BDNF](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4414705/pdf/nihms653267.pdf) for schizophrenia, [5-HT2a](https://www.eurekaselect.com/59624/article) for everything…
* Be very suspicious of any such “**candidate gene**” finding (post-hoc data mining showing large >1% contributions from a single allele). [0/18](https://www.gwern.net/docs/genetics/heritable/2019-border.pdf) replications in candidate genes for depression. [73% of candidates](https://ajp.psychiatryonline.org/doi/full/10.1176/appi.ajp.2011.11020191) failed to replicate in psychiatry in general. [One big journal](https://sci-hub.se/10.1007/s10519-011-9504-z) won’t publish them anymore without several accompanying replications. [A huge GWAS](https://www.biorxiv.org/content/10.1101/261081v2.full), n=1 million: “We find no evidence of enrichment for genes previously hypothesized to relate to risk tolerance.”




### **Applied Linguistics**





* **Critical period** hypothesis: Hartshorne, Tenenbaum and Pinker’s 2018 study on two-thirds of a million English speakers concluded one sharply defined critical age at 17.4 for all language learners. A reanalysis of the data showed that such a conclusion is based on artificial results ([van der Silk et al. 2021](https://onlinelibrary.wiley.com/doi/10.1111/lang.12470)). There was no evidence for any critical age for language learning.


### **Educational Psychology **



* Findings regarding **mindsets** (aka implicit theories) have been mixed, with increasing failure of replication that puts the value of the theory and the derived interventions in question ([Brez et al, 2020](https://www.tandfonline.com/doi/full/10.1080/01973533.2020.1806845?casa_token=g_1Qssb5S_kAAAAA%3AEA1Ln33-2tUTmnTnDhXwTnv_SnPuRawdOy8Y5dDZSSOiCguZUnrlNwDZACtjqX8bGYsYqJznpjtH); ). According to the meta-analysis by Sisk and colleagues ([2018](https://journals.sagepub.com/doi/full/10.1177/0956797617739704?casa_token=-RR4RSU-NewAAAAA%3ATpX_-Z-Y_hcn1MWoN7dWPJaW0YvOvLUYBwGk4Zq0fTt4FhtKewegFkV_Pr-2dDUG05NFLjLfY632)), the relationship between mindsets and academic achievement is weak: Of the 129 studies that they analyzed, only 37% found a positive relationship between mindset and academic outcomes. Furthermore, 58% of the studies found no relationship and 6% found a negative relationship between mindset and academic outcomes. Evidence on the efficacy of mindset interventions is not promising:  of the 29 studies reviewed, only 12% had a positive effect, 86% of the studies found no effect of the intervention and 2% found a negative effect of the intervention. It should be noted that interventions seemed to work for low SES populations.


###


### **Further literature**



* [A review of 2500 social science papers](https://fantasticanachronism.com/2020/09/11/whats-wrong-with-social-science-and-how-to-fix-it/), showing the lack of correlation between citations and replicability, between journal status and replicability, and the apparent lack of improvement since 2009.
* Discussion on [Everything Hertz](https://everythinghertz.com/135), [Hacker News](https://news.ycombinator.com/item?id=27709266), [Andrew Gelman](https://statmodeling.stat.columbia.edu/2021/06/28/reversals-in-psychology/), [some star data thugs comment](https://twitter.com/jamesheathers/status/1409520677120405505).
* See also the **popular literature **with uncritical treatments of the original studies:
    * [Outliers: The Story of Success by Malcolm Gladwell ](https://www.goodreads.com/book/show/3228917-outliers)that is founded on the 10,000 hours for mastery claim.
    * [Behave: The Biology of Humans at Our Best and Worst ](https://www.goodreads.com/book/show/31170723-behave)by Robert Sapolsky which focuses on Himmicanes, power pose, facial feedback, ego depletion, Implicit Association, stereotype threat, broken windows theory, Macbeth effect.
    * [Thinking, Fast and Slow by Daniel Kahneman](https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow) that has an Entire chapter on all kinds of priming. Facial-feedback, Effects of Head-Movements on Persuasion, Location as Prime, Money Priming, Death Priming, Lady Macbeth Effect. Cognitive disfluency. Ego depletion. Wansink. Hungry judges. Denies the "hot hand".
    * [Nudge: Improving Decisions about Health, Wealth, and Happiness](https://www.penguinrandomhouse.com/books/304634/nudge-by-richard-h-thaler-and-cass-r-sunstein/) by Thaler and Sunstein focusing on Wansink, Baumeister, Dweck.
    * [Smarter: The New Science of Building Brain Power ](https://www.goodreads.com/en/book/show/18079605-smarter)by Dan Hurley focusing on Dual n-Back and all manner of nonsense nootropics.
    * [Peter Watts Is An Angry Sentient Tumor: Revenge Fantasies and Essays ](https://www.goodreads.com/book/show/45729865-peter-watts-is-an-angry-sentient-tumor)by Peter Watts that provides a sadly muddled defence of Bem
