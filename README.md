# FORRT

This is repository for the website of **FORRT - a Framework for Open and Reproducible Research Training**.

## Welcome!

First and foremost, Welcome! 🎉 Willkommen! 🎊 Bienvenue! 

This document is a hub to give you some information about the FORRT project. The term ‘onboarding’ refers to the process of integrating new arrivals into the organization and its culture - where one can acquire the necessary knowledge, skills, and behaviors in order to become an effective organizational member.

### The problem

* Recently, the scientific community took steps to reflect a widespread awareness of, and call for, improved practices ushering in the “credibility revolution” including higher standards of evidence, preregistration, direct replication, transparency, and openness.
Structurally, three pillars were proposed to carry social sciences towards academic utopia:  opening scientific communication, restructuring incentives and practices, and collaborative and crowdsourced science. 
* However, ongoing attempts have neglected an essential aspect of the academic machinery: students. And indeed, current norms for the teaching and mentoring in higher-education are rooted in obsolete practices of bygone eras.

### The solution

* In our view, a scientific utopia has a fourth pillar, whose principal goal is to familiarize students, who are future consumers of science and perhaps themselves knowledge producers, with the intricacies of the process of science. 
* We believe the teaching and mentoring of reproducible and open research practices is the clearest indicator of the degree to which institutions and/or departments embody principles of credible science.
* This demonstration goes beyond paying lip service to best practices, and ensures that students are trained to engage in these practices wheresoever.

**FORRT** - *a framework for open and reproducible research training* - aims to provide a didactic and pedagogical infrastructure designed to recognize and support the teaching and mentoring of open and reproducible research in tandem with prototypical subject matters in higher education.

### What do we need?

**You!** (In whatever way you can help).

We need expertise in website construction, fundraising, proofing, user experience design, transferring knowledge across platforms, experts in pedagogy/didactics in higher education, database maintenance (for cataloguing and classifying resources), documentation, technical writing and project management.

We'd love your feedback along the way, and of course, we'd love you to take our educational survey aiming at a self-assessment exercise assessing the extent to which your teaching/mentoring abides by open and reproducible tenets (in development).
Our primary goal is to support teachers and mentors trying to bridge the gap between modern and current norms in higher education. And hopefully, making this rather new OS revolution sustainable by promoting the adoption of Open and Reproducible tenets to the teaching and mentoring of prototypical subject matters in higher education.

And while FORRT is aimed at concerned teachers and mentors, we're excited to plug another hole in the leaky pipeline by supporting the professional development of any and all of our contributors. If you're looking to learn to code, try out working collaboratively, get some experience writing grant applications or translate your skills to the digital domain, we're here to help.

### Get involved

If you think you can help in any of the areas listed above (and we bet you can) or in any of the many areas that we haven't yet thought of (and here we're sure you can!) then please check out our [contributors' guidelines](https://docs.google.com/document/d/1Yd1LrAd96MCfr01wIubEGz4iO92_Qr_OY2qWrle3Vro/edit?usp=sharing) and [join FORRT’s Slack](https://join.slack.com/t/forrt/shared_invite/zt-alobr3z7-NOR0mTBfD1vKXn9qlOKqaQ) with a message at FORRT telling how you think you can help: 

> “Hi everyone, I'm a ___ (i.e., professional status: grad student, postdoc, AP) in ____ (i.e., field of study) at ____(i.e., institution) and would be happy to help out with _____. Feel free to contact me.” 
 
There, we can direct you towards relevant documents and tasks. 

- But if you are interested in contributing to the **FORRT manuscript**, a google doc version can be found here: https://tinyurl.com/FORRTworkingDOC. 
- If you are interested in contributing to the **Website**, see specific instructions below, and please check out FORRT’s Github (to-do)[https://github.com/forrtproject/forrt/projects/1] and [open issues](https://github.com/forrtproject/forrt). 

Please note that it's very important to us that we maintain a positive and supportive environment for everyone who wants to participate. When you join us we ask that you follow our code of conduct in all interactions both on and offline.

#### FORRT Website on Github

This is the website for the **Framework for Open and Reproducible Research Training (FORRT)**, built with [hugo](https://gohugo.io/), and deployed with [netlify](https://www.netlify.com/). You can edit it directly in a browser through GitHub (not recommended) or you have 2 options to edit and see your edit locally before updating the master branch:  

If you are a R user and like to work in RStudio (Best option for Windows user), you need to:
1. Install R and R Studio + the [blogdown package](https://bookdown.org/yihui/blogdown/)
2. Open R Studio, then go in the Menu > New Project... > Version Control > Git
    * Repository URL: `git clone https://github.com/forrtproject/FORRT.git`
    * Project directory name: `FORRT` (or anything you want)
    * Create project as a subdirectory of: `click Browse and decide where you want put it`
3. Before editing, try to run it locally using the blogdown Addins in RStudio.


To edit it locally, you will need to:
1. Fork this GitHub repo (create a version of the FORRT repo on your own account).
1. Clone this repo you just added in your own account: `git clone https://github.com/yourusername/forrt.github.io.git` in a terminal window 
1. If [Hugo](https://gohugo.io/) is not installed, follow the steps in their documentation to install it on your machine: https://gohugo.io/getting-started/installing/
1. To run the website locally, make sure you are still in `FORRT/` dir and type `hugo server -D` in your terminal.
   - The -D option is to serve the website including draft .md files.
1.  Create a new branch with your name or the feature you would like to add (e.g. outreach). Depending on your code editor, the way to do this will vary (e.g. in Visual Studio Code you can click on "master" in the bottom left and select "new branch").
1. Make changes on your branch. Check that it the website is working using again `hugo server -D`.
1. Select what changes you want to add now and "stage" them with Git.
1. Commit your changes and add a message that describes the changes.
1. Then you can push this branch to GitHub.
1. Create a pull request to the original FORRT repo.

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
