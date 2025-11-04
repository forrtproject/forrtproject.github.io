---
title: "COUPÉ: Why You Should Use Quarto to Make Your Papers More Replicable (and Your Life Easier!)"
date: 2024-06-21
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Automatic updating"
  - "coding"
  - "Life Satisfaction"
  - "Quarto"
  - "R"
  - "R Markdown"
  - "Replicability"
  - "War"
  - "writing"
draft: false
type: blog
---

An important part of writing a paper is polishing the paper. You start with a first draft but then you find small mistakes, things to add or to remove. Which leads to redoing the analysis and a second, third and fourth draft of the paper.  And then you get comments at seminars and from referees, further increasing the number of re-analyses and re-writes.

An annoying part of this process is that whenever you update your code and get new results, you also need to update the numbers and tables in your draft paper. Reformatting the same MS Word table for the 5th time is indeed frustrating. But it is also bad for the replicability of papers as it’s so easy to update the wrong column of a table or forget to update a number.

When writing [***my latest paper***](https://dataisdifficult.github.io/PAPERLongTermImpactofWaronLifeSatisfaction.html) on the long term impact of war on life satisfaction, I discovered how [***Quarto***](https://quarto.org/) allows one to solve these problems by enabling one to create code and paper from one document. It’s like writing your whole paper, text and code in Stata; or it’s like writing your whole paper, text and code in MS Word. True, R Markdown allows this too, but Quarto makes the process easier as it has MS Word-like drop down menus so you need to know less coding, making the learning curve substantially easier!

Whenever I now update the code for my latest paper, the text version gets updated automatically since every number and every table in the text is linked directly to the code! People who want to replicate the paper will also waste less time finding where in the code is the bit for table 5 from the paper, as the text is wrapped around the code so the code for table 5 is next to the text for table 5.

And there’s more! The R folder that has your code and datasets can easily be linked to [***Github***](https://github.com/dataisdifficult/war) so no more need to upload replication files to OSF or Harvard Dataverse!

And did I tell you documents in Quarto can be printed as pdf or word, and even html so you can publish your paper as a website: [***click here for an example***](https://dataisdifficult.github.io/PAPERLongTermImpactofWaronLifeSatisfaction.html).

How cool is that!

And did I tell you that you can use Quarto to create slides that are nicer than PPT and that can be linked directly to the code, so updating the code also means updating the numbers and tables in the slides?

Now I realize that, for the older reader, the cost of investing in R and Quarto might be prohibitive. But for the younger generation, there can only be one advice: drop Stata, drop Word, go for the free software that will make your life easier and science more replicable!

*Tom Coupé is a Professor of Economics at the University of Canterbury, New Zealand. He can be contacted at tom.coupe@canterbury.ac.nz*.

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2024/06/21/coupe-why-you-should-use-quarto-to-make-your-papers-more-replicable-and-your-life-easier/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2024/06/21/coupe-why-you-should-use-quarto-to-make-your-papers-more-replicable-and-your-life-easier/?share=facebook)

Like Loading...