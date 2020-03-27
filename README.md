# FORRT Website
[![Netlify Status](https://api.netlify.com/api/v1/badges/67303e41-faa8-4007-822d-dbcc84e6298f/deploy-status)](https://app.netlify.com/sites/priceless-boyd-4abbaf/deploys)

This is the website for the **Framework for Open and Reproducible Research Training (FORRT)**, built with [hugo](https://gohugo.io/), and deployed with [netlify](https://www.netlify.com/). You can edit it directly in a browser through GitHub (not recommended) or you have 2 options to edit and see your edit locally before updating the master branch:  

If you are a R user and like to work in RStudio (Best option for Windows user), you need to:
1. Install R and R Studio + the [blogdown package](https://bookdown.org/yihui/blogdown/)
2. Open R Studio, then go in the Menu > New Project... > Version Control > Git
    * Repository URL: `git clone https://github.com/forrtproject/FORRT.git`
    * Project directory name: `FORRT` (or anything you want)
    * Create project as a subdirectory of: `click Browse and decide where you want put it`
3. Before editing, try to run it locally using the blogdown Addins in RStudio.


To edit it locally, you will need to:
1. Clone/fork this GitHub repo: `git clone https://github.com/forrtproject/FORRT.git` in a terminal window 
2. Make sure you're inside the **FORRT/** dir (`cd FORRT`), then **clone the submodule for themes:** `git submodule update --init --recursive --remote`
3. If [Hugo](https://gohugo.io/) is not installed, follow the steps in their documentation to install it on your machine: https://gohugo.io/getting-started/installing/
4. To run the website locally, make sure you are still in `FORRT/` dir and type `hugo serve -D` in your terminal.
   - The -D option is to serve the website including the draft .md files.
