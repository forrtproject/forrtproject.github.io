---
title: "COUPÉ: I Tried to Replicate a Paper with ChatGPT 4. Here is What I Learned."
date: 2024-04-08
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "AI"
  - "ChatGPT"
  - "Econometrics"
  - "OLS"
  - "Python"
  - "replication"
  - "Stata"
draft: false
type: blog
---

Recent research suggests ChatGPT ‘***[aced the test of understanding in college economics](https://journals.sagepub.com/doi/10.1177/05694345231169654)***’,   ChatGPT [‘](https://arxiv.org/abs/2308.06260)***[is effective in stock selection](https://arxiv.org/abs/2308.06260)***[’](https://arxiv.org/abs/2308.06260) , that it “***[can predict future interest rate decisions](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4572831)***” and that using ChatGPT “***[can yield more accurate predictions and enhance the performance of quantitative trading strategies](https://arxiv.org/pdf/2304.07619.pdf)***’. ChatGPT 4 also does ***[econometrics](https://www.timberlake.co.uk/news/chatgpt-4-0)***: when I submitted the dataset and description of one of my econometric case studies, ChatGPT was able to ‘read’ the document, run the regressions and correctly interpret the estimates.

But can it solve the replication crisis?  That is, can you make ChatGPT 4 replicate a paper?

To find out the answer to this question, I selected a paper I recently tried to replicate without the help of ChatGPT, so I knew the data needed to replicate the paper were publicly available and the techniques used were common techniques that most graduate students would be able to do.[[1]](#_ftn1)

I started by asking ChatGPT “can you replicate this paper : <https://docs.iza.org/dp9017.pdf”>.

ChatGPT answered : “I can’t directly access or replicate documents from external links.”

I got a similar answer when I asked it to download the dataset used in this paper – while it did find the dataset online, when asked to get the data, ChatGPT answered: ‘I can’t directly access or download files from the internet’.

****LIMITATION** 1: ChatGPT 4 cannot download papers or datasets from the internet.**

So I decided to upload paper and the dataset myself – however ChatGPT informed me that ‘currently, the platform doesn’t support uploading files larger than 50 MB’. That can be problematic, the Life in Transition survey used for the paper, for example, is 200MB.

****LIMITATION** 2: ChatGPT 4 cannot handle big datasets (>50MB).**

To help ChatGPT, I selected, from the survey, the data needed to construct the variables used in the paper and supplied ChatGPT with this much smaller dataset. I then asked ‘can you use this dataset to replicate the paper’. Rather than replicating the paper, ChatGPT reminded me of the general steps needed to analyse the data, that ‘we’re limited in executing complex statistical models directly here’, demonstrated how to do some analysis in Python and warned that ‘For an IV model, while I can provide guidance, you would need to implement it in a statistical software environment that supports IV estimations, such as R or Stata’.

While ChatGPT does provide R code when specifically asked for it, ChatGPT seems to prefer Python. Indeed, when I first tried to upload the dataset as an R dataset it answered [‘The current environment doesn’t support directly loading or manipulating R data files through Python libraries that aren’t available here, like **rpy2’**] So I then uploaded the data as a Stata dataset which it accepted. It’s also interesting ChatGPT recommends Stata and R for IV regressions even though IV regressions can be done in Python using the Statsmodels or linearmodels packages. What’s more, at a later stage ChatGPT did use Statsmodels to run the IV regression.

This focus on Python also limits the useability of ChatGPT to replicate papers for which the code is available – when I supplied the Stata code and paper for one of my own papers, it failed to translate and run the code into Python.

****LIMITATION** 3: ChatGPT 4 seems to prefer Python.**

To make life easier for ChatGPT, I next shifted focus to one specific OLS regression: ‘can you try to replicate the first column of table 5 which is an OLS regression’.

ChatGPT again failed. Rather than focusing on column I which had the first stage of an IV regression, it took the second column with the IV results. And rather than running the regression, it provided some example code as it seemed unable to use the labels of the variables to construct the variables mentioned in the table and the paper. It is true that in the dataset the variable names were not informative (f.e. q721) but the labels attached to each question were informative so I made that explicit in the next step: ‘can you use the variable labels to find the variables corresponding to the ones uses in table 1’?

ChatGPT was still not able to create the variables and indicated that ‘Unfortunately, without direct access to the questionnaire or detailed variable labels and descriptions, I can provide only a general guide rather than specific variable names.’

I therefor upload the questionnaire itself. This helped ChatGPT a lot as it now discussed in more detail which variables were included. And while it still did not run the regression, it provided code in R rather than Python! Unfortunately, the code was still very far from what was needed: some needed variables were not included in the regression, some were included but not in the correct functional form, others that did not need to be included were included. ChatGPT clearly has difficulties to think about all the information mentioned in a paper when proposing a specification.

****LIMITATION** 4: ChatGPT 4 has trouble creating the relevant variables from variable names and labels.**

Given its trouble with R, I asked ChatGPT to do the analysis Python. But that just lead to more trouble: ‘It looks like there was an issue converting the q722 variable, which represents life satisfaction, directly to a float. This issue can occur if the variable includes non-numeric values or categories that cannot be easily converted to numbers (e.g., “Not stated” or other text responses).’ Papers often do not explicitly state how they handle missing values and ChatGPT did not suggest focusing on ‘meaningful’ observations only.  Once I indicated only values between 0 and 10 should be used, ChatGPT was able to use the life satisfaction variable but ran into trouble again when it checked other categorical variables.

****LIMITATION** 5: ChatGPT 4 gets into trouble when some part of the data processing is not fully described.**

I next checked some other explanatory variables. The ‘network’ variable was based on a combination of two variables. ChatGPT, rather than using the paper to find how to construct the variable, described how such variable can be generated in general. Only after I reminded ChatGPT that ‘the paper clearly describes how the network variable was created’, ChatGPT created the variable correctly.

**LIMITATION 6: ChatGPT 4 needs to be reminded to see the ‘big picture’ and consider all the information provided in the paper.**

Finally, for the ‘minority’ variable one needed to check whether the language spoken by the mother of the respondent was an official language of the country where the respondent lives. ChatGPT used its knowledge of official languages to create a variable that suggested 97% of the sample belonged to a minority (against about 14% according to the paper’s summary statistics) but realized this was probably a mistake – it noted ‘this high percentage of respondents classified as linguistic minorities might suggest a need to review the mapping of countries to their official languages or the accuracy and representation of mother’s language data ‘

After this I gave up and concluded that while ChatGPT 4 can read files, analyse datasets and even run and interpret regressions, it is still very far from being able to be of much help while replicating a paper. That’s bad news for the replication crisis, but good news for those doing replications: there is still some time before those doing replications will be out of jobs!

**CONCLUSION: ChatGPT 4 does not destroy replicators’ jobs (yet)**

Full transcripts of my conversation with ChatGPT can be found [***here***](https://github.com/dataisdifficult/ChatGPTColumn).

*Tom Coupé is a Professor of Economics at the University of Canterbury, New Zealand. He can be contacted at tom.coupe@canterbury.ac.nz*.

---

[[1]](#_ftnref1) For a paper analysing how wars affect happiness, my co-authors and I tried to replicate 5 papers, the results can be found [***here***](https://dataisdifficult.github.io/PAPERLongTermImpactofWaronLifeSatisfaction.html),

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2024/04/08/coupe-i-tried-to-replicate-a-paper-with-chatgpt-4-here-is-what-i-learned/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2024/04/08/coupe-i-tried-to-replicate-a-paper-with-chatgpt-4-here-is-what-i-learned/?share=facebook)

Like Loading...