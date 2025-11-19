---
title: "REED: Using the Stata Package “speccurve” to Do Specification Curve Analysis"
date: 2024-11-16
author: "The Replication Network"
tags:
  - "GUEST BLOGS"
  - "Life Satisfaction"
  - "Martin Andresen"
  - "SCA"
  - "speccurve"
  - "Specification curve analysis"
  - "Stata"
  - "War"
draft: false
type: blog
---

*NOTE: The data (“COUPE.dta”) and code (“speccurve\_program.do”) used for this blog can be found here: <https://osf.io/4yrxs/>*

In a previous post (***[see here](https://replicationnetwork.com/2024/11/05/reed-using-the-r-package-specr-to-do-specification-analysis/)***), I provided a step-by-step procedure for using the R package “specr”. The specific application was reproducing the specification curve analysis from a paper by Tom Coupé and coauthors (***[see here](https://dataisdifficult.github.io/PAPERLongTermImpactofWaronLifeSatisfaction.html)***).

**“speccurve”**

In this post, I do the same, only this time using the Stata program “**speccurve**” (Andresen, 2020).  The goal is to facilitate Stata users to produce their own specification curve analyses. In what follows, I presume the reader has read my previous post so that I can go straight into the code.

The first step is to download and install the Stata program “**speccurve**” from GitHub:

[![](/replication-network-blog/image-20.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-20.webp)

There isn’t a lot of documentation for “**speccurve**.” The associated GitHub site includes an .ado file that provides examples (“[***speccurve\_gendata.ado***](https://github.com/martin-andresen/speccurve/blob/master/speccurve_gendata.ado)”). Another example is provided by [***t***](https://hbs-rcs.github.io/post/specification-curve-analysis/)***[his independent site](https://hbs-rcs.github.io/post/specification-curve-analysis/)*** (though ignore the bit about factor variables, as that is now outdated).

“**speccurve**” does not do everything that “**specr**” does, but it will allow us to produce versions of FIGURE 1 and TABLE 1. (Also, FIGURE 2, though for large numbers of specifications, the output isn’t useful.)

**What “speccurve” Can Do**

Here is the “**speccurve**” version of FIGURE 1 from my previous post:

[![](/replication-network-blog/image-21.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-21.webp)

And here are the results for TABLE 1:

[![](/replication-network-blog/image-22.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-22.webp)

How about FIGURE2? Ummm, not so helpful (see below). I will explain later.

[![](/replication-network-blog/image-23.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-23.webp)

Unlike “**specr**”, “**speccurve**” does not automatically create combinations of model features for you. You have to create your own. “**speccurve**” is primarily a function for plotting a specification curve after you have estimated your selected specifications. The latter is typically done by creating a series of for loops.

**Downloading Data and Code, Setting the Working Directory, Reading in the Data**

Once you have installed “**speccurve**”, the next step is to create a folder, download the the dataset “COUPE.dta” and code “speccurve\_program.do” from the OSF website (***[here](https://osf.io/4yrxs/)***), and store them in the folder.  COUPE.dta is a Stata version of the COUPE.RData dataset described in the previous post.

The following section provides an explanation for each line of code in “speccurve\_program.do”.

The command line below sets the working directory equal to the folder where the data are stored.

[![](/replication-network-blog/image-24.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-24.webp)

The next step clears the working memory.

[![](/replication-network-blog/image-25.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-25.webp)

“**speccurve**” stores results in a “.ster” file. If you have previously run the program and created a “.ster” file, it is good practice to remove it before you run the program again. In this example, I have called the .ster file “WarSatisfaction”. To remove this file, delete the comment markers from the second line of code below and run.

[![](/replication-network-blog/image-26.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-26.webp)

Now import the Stata dataset “COUPE”.

[![](/replication-network-blog/image-27.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-27.webp)

**Making Variables for the For Loops**

Recall from the previous post that Coupé created 320 specifications by combining the following model characteristics: (i) two dependent variables, (ii) four samples, (iii) eight variables, and (iv) five models. Many of these had cumbersome names. Since I will reproduce Coupé’s specifications using for loops, I want to simplify the respective names.

For example, rather than referring to “lifesatisfaction15” and “lifesatisfaction110”, I create duplicate variables and name them “y1” and “y2”. Likewise, I create and name four sample variables, “sample1” to “sample4”.

[![](/replication-network-blog/image-28.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-28.webp)

Having done this for “y” and “sample”, I now want to do the same thing for the different variable specifications. There were eight variable combinations. I create a “local macro” for each one, associating the names “var1” to “var8” with specific sets of variables.

For example, “var1” refers to the set of variables that Coupé collectively referred to “No Additional Controls”.

[![](/replication-network-blog/image-29.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-29.webp)

“var2” refers to the set of variables Coupé called “Other Controls”.

[![](/replication-network-blog/image-30.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-30.webp)

In this way, all eight of the variable sets receive “shorthand” names “var1” to “var8”.

[![](/replication-network-blog/image-31.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-31.webp)

**A For Loop for All the Djankovetal2016 Specifications**

We now get to the heart of the program. I create another local macro called “no” that will assign a number (= “no”) to each of the models I estimate (model1-model320). I initialize “no” at “1”.

[![](/replication-network-blog/image-32.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-32.webp)

I write separate for loops for each of the five models, starting with Djankovetal2016.

[![](/replication-network-blog/image-33.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-33.webp)

I set up three levels of for loops. Starting from the outside (top), there are four types of samples (sample1-sample4), two types of dependent variables (y1-y2) and eight variable sets (var1-var8).

[![](/replication-network-blog/image-34.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-34.webp)

Djankovetal2016 estimates a weighted, linear regression model without fixed effects so I reproduce that estimation approach here.  Note how “i”, “j”, and “k” allow different combinations of variables, dependent variables, and samples, respectively.

[![](/replication-network-blog/image-35.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-35.webp)

The next lines of commands identify which model we are estimating. The “estadd” command creates a variable that assigns either a “1” or a “0” depending on the model. Since the first model is Djankovetal2016, Model1 = 1 and all the other Model variables  (Model2-Model5) are set = 0. ”estadd” saves the model variables so that we can identify the estimation model that each specification uses.

[![](/replication-network-blog/image-36.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-36.webp)

I next do the same thing for variable sets. Recall that the “i” indicator loops through eight variable specifications. When “i” = 1, the variable “Vars1” takes the value 1. When “i” = 2, the variable “Vars2” takes the value 1. And so on.

[![](/replication-network-blog/image-37.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-37.webp)

Having set the “right” Vars variable to “1”, I then set all the other Vars variables to “0”. That’s what the next set of commands do.

[![](/replication-network-blog/image-38.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-38.webp)

If “i” is not equal to 1, then Vars1 = 0. If “i” is not equal to 2, then Vars2 = 0. At the end of this section, all the Vars variables have been set = 0 except for the one variable combination that is being used in that regression.

I next do the exact same thing for the dependent variable, Y. “j” takes the values “1” or “2” depending on which dependent variable is being used. When “j” = 1, Y1 = 1. When “j” = 2, Y2 = 1. The remaining lines set Y2 = 0 or Y1 = 0 depending if “j” = 1 or 2, respectively.

[![](/replication-network-blog/image-39.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-39.webp)

And then the same thing for the sample variables.

[![](/replication-network-blog/image-40.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-40.webp)

The next two lines save the results in a (“.ster”) file called “WarSatisfaction” and assigns each set of results a unique model number (“model1”-“model320”).

[![](/replication-network-blog/image-41.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-41.webp)

The last few lines of this for loop increases the “no” count by 1, and then the three right hand brackets finish off the three levels of the for loop.

[![](/replication-network-blog/image-42.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-42.webp)

**For Loops for the Other 4 Estimation Models**

Having estimated all the specifications associated with the Djankovetal2016 model, I proceed similarly for the other four estimation models.

[![](/replication-network-blog/image-43.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-43.webp)
[![](/replication-network-blog/image-44.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-44.webp)
[![](/replication-network-blog/image-45.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-45.webp)
[![](/replication-network-blog/image-46.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-46.webp)

**Producing the Specification Curve**

After running all 320 model specifications and storing them in the file “WarSatisfaction”, the “**speccurve**” command below produces the sought-after specification curve.

[![](/replication-network-blog/image-47.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-47.webp)

The option “param” lets “**speccurve**” know which coefficient estimate it should use. “title” is the name given to the figure produced by “speccurve”. “panel” produces the box below the figure (see below), the analogue of FIGURE 2 in the “specr” post.

[![](/replication-network-blog/image-48.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-48.webp)

Ideally, the panel sits below the specification curve and identifies the specific model characteristics that are associated with each of the 320 estimates. However, with so many specifications, it is squished down to an illegible box . If the reader finds this annoying, they can safely omit the “panel’ option.

**Producing the Regression Results for TABLE 1**

To produce TABLE 1, we need to access a table that is automatically produced by “**speccurve**” and stored in a matrix called “r(table)”. The following command prints out “r(table)” for inspection.

[![](/replication-network-blog/image-49.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-49.webp)

“r(table)” stores variables for each of the 320 model specifications estimated by “**speccurve**”. The first two stored variables are “modelno” and “specno”. We saw how “modelno” was created in the for loops above. “specno” simply sorts the models so that the model with the lowest estimate is “spec1” and the model with the largest is “spec320).

Then comes “estimate”, “min95”, “max95”, “min90”, and “max90”. These are the estimated coefficients for the war “treatment variable”, and the respective 95- and 90-confidence interval limits.

After these is a series of binary variables (“Model1”-“Model5”, “Vars1”-“Vars8”, “Y1”-“Y2”, and “Sample1”-“Sample4”) that identify the specific characteristics associated with each estimated model.

With the goal of producing TABLE 1, I next turn this matrix into a Stata dataset. The following command takes the variables stored in the matrix “r(table)” and adds them to the existing COUPE.dta dataset, giving them the same names they have in “r(table)”.

[![](/replication-network-blog/image-50.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-50.webp)

With these additions, the COUPE.dta dataset now consists of 38,843 observations and 90 variables, 26 more variables than before because of the addition of the “r(table)” variables.

I want to isolate these “r(table)” variables in order to estimate the regression of TABLE 1. To do that, I run the following lines of code:

[![](/replication-network-blog/image-51.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-51.webp)

Now the only observations and variables in Stata’s memory are the data from “r(table)”. I could run the regression now, regressing “estimate” on the respective model characteristics. However, matching variable names like “Model 1” and “Vars7” to the variable names that Coupé uses in his TABLE 1 is inconvenient and potentially confusing.

Instead, I want to produce a regression table that looks just like Coupé’s. To do that, I install a Stata package called “estout” (see below).

[![](/replication-network-blog/image-52.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-52.webp)

“estout” provides the option of reporting labels rather than variable names. To take advantage of that, I next assign a label to each of the model characteristic variable names.

[![](/replication-network-blog/image-53.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-53.webp)

Now I am finally in a position to estimate and report TABLE 1.

First, I regress the variable “estimate” on the respective model characteristics. To match Coupé’s table, I set the reference category equal to Model5=1, Sample4 = 1, Vars8=1, and Y2=1 and omit these from the regression.

[![](/replication-network-blog/image-54.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-54.webp)

Next I call up the command “**esttab**”, part of “**estout**”, and take advantage of the “label” option that replaces variable names with their labels.

[![](/replication-network-blog/image-55.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-55.webp)

 “varwidth” formats the output table to look like Coupé’s TABLE 1. Likewise, “order” puts the variables in the same order as Coupé’s table. “se” has the table report standard errors rather than t-statistics, and b(%9.3f) reports coefficient estimates and standard errors to three decimal places, again to match Coupé’s table.

And voilá, we’re done! You can check that the resulting TABLE 1 exactly matches Coupé’s table by comparing it with TABLE 1 from the previous “**specr**” post.

**Saving the Results**

As a final action, you may want to save the table as a WORD doc for later editing. This can be done by inserting “using TABLE1.doc” (or whatever you want to call it) after “**esttab**” but before the comma in the command line above.

One could also save the “**speccurve**” dataset for later analysis using the “**save**” command, as below, where I have called it “speccurve\_output”. This is saved as a standard .dta Stata dataset.

[![](/replication-network-blog/image-56.webp)](https://replicationnetwork.com/wp-content/uploads/2024/11/image-56.webp)

**Conclusion**

You are now all set to use Stata to reproduce the results from Coupé’s paper. Go to the OSF site given at the top of this blog, download the data and code, and run the code to produce the results in this blog. It took about 7 minutes to run on my laptop.

Of course the goal is not to just reproduce Coupé’s results, but rather to prepare you to do your own specification curve analyses. As noted above, for more examples, go  to the “**speccurve**” GitHub site and check out “***[speccurve\_gendata.ado](https://github.com/martin-andresen/speccurve/blob/master/speccurve_gendata.ado)***”. Good luck!

*NOTE: Bob Reed is Professor of Economics and the Director of*[***UCMeta***](https://www.canterbury.ac.nz/business-and-law/research/ucmeta/)*at the University of Canterbury. He can be reached at*[*bob.reed@canterbury.ac.nz*](mailto:bob.reed@canterbury.ac.nz)*.* *Special thanks go to Martin Andresen for his patient assistance in answering Bob’s many questions about “speccurve”.*

**REFERENCES**

Andresen, M.  (2020). [martin-andresen](https://github.com/martin-andresen)/[speccurve](https://github.com/martin-andresen/speccurve) [Software]. GitHub. <https://github.com/martin-andresen/speccurve>

### Share this:

* [Click to share on X (Opens in new window)
  X](https://replicationnetwork.com/2024/11/16/reed-using-the-stata-package-speccurve-to-do-specification-curve-analysis/?share=twitter)
* [Click to share on Facebook (Opens in new window)
  Facebook](https://replicationnetwork.com/2024/11/16/reed-using-the-stata-package-speccurve-to-do-specification-curve-analysis/?share=facebook)

Like Loading...