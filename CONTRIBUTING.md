# Contributing

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
>
> - Star the repository
> - Share FORRT on your social media
> - Reference FORRT in your project's readme
> - Mention FORRT at local meetups and tell your friends/colleagues

## Table of Contents

- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Quick Content Edits on GitHub](#quick-content-edits-on-github)
  - [Content Contributions](#content-contributions)
  - [Technical Contributions](#technical-contributions)

## I Have a Question

Before you ask a question, it is best to search for existing [Issues](/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](/issues/new).
- Provide as much context as you can about the problem you're having.
- Provide project and platform versions (Hugo, Operating System etc.), depending on what seems relevant.

We will take care of the issue as soon as possible. Right now we run on volunteer time, so please be patient!

## I Want To Contribute

> ### Legal Notice
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Quick Content Edits on GitHub

**This is the easiest way to contribute for content changes!** You don't need to install anything or run the website locally.

If you want to fix a typo, update documentation, or make small content changes:

1. Navigate to the file you want to edit on GitHub (e.g., browse the repository at https://github.com/forrtproject/forrtproject.github.io)
2. Click the **pencil icon** (✏️) in the top right corner of the file view
3. Make your changes directly in the GitHub editor
4. Scroll down and add a commit message describing your changes
5. Select **"Create a new branch for this commit and start a pull request"**
6. Click **"Propose changes"** and then **"Create pull request"**

GitHub will automatically fork the repository for you and create a pull request. No need to worry about branches, cloning, or local setup!

### Content Contributions

**For content contributors who want to preview their changes locally** (but don't need to work on technical features):

Content contributions include:
- Adding or editing educational resources
- Updating documentation
- Fixing typos or improving clarity
- Adding glossary entries
- Updating project content

**Note:** As a content contributor, you **do not need to run local tests or builds** if you don't want to learn about the technical setup. The maintainers will review your content changes and ensure they work correctly on the staging site.

However, if you'd like to preview your changes locally before submitting, you can follow the development setup instructions below.

### Technical Contributions

**For developers working on features, bug fixes, or infrastructure:**

Technical contributions include:
- Adding new features to the website
- Fixing bugs
- Updating dependencies
- Working on CI/CD pipelines
- Improving build processes

If you're making technical contributions, please follow the local development setup and test your changes thoroughly before submitting.

### Cloning the Repository

For FORRT contributors, you can clone this repository to your local machine and make changes on the feature branch. For now, we do not use a separate development branch. Proposed changes must be made in a feature branch. Please then create a pull request into the master branch.

For external contributors, this website operates on the [fork and pull](https://reflectoring.io/github-fork-and-pull/) model, so you will need to fork this repository to your GitHub account of choice and then clone it to your local machine.

### Development - Dev Containers and VSCode

A way to run the project locally without installing Hugo on the host machine is via the use of Dev Containers. These are disposable development environments that run in containers, which ensure all dependences are installed as required and that host dependencies do not impact the project (or vice versa). This ensures reproducibility and consistency across different hosts, but does require a container runtime (Dockerd, containerd etc.) to be installed on the host machine.

#### Prerequisites

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker](https://docs.docker.com/get-docker/)
  - For Windows, make sure to install [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)
- [Visual Studio Code](https://code.visualstudio.com/)

#### Steps

1. Open VSCode and ensure you have the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed in Visual Studio Code.
2. Open `.devcontainer/devcontainer.json` in VSCode. If you are on a Windows host, go to `.devcontainer\dev\devcontainer.json` and uncomment the line `"remoteUser": "root"` before continuing.
3. In the context menu of VSCode (Crl + Shift + P), select `Dev Containers: Open Folder in Container`. Alternatively, a pop-up will appear in the bottom right corner of the window asking if you want to open the folder in a container. Click on `Reopen in Container`.
4. Wait for the container to build. The context of VS Code will change. In the bottom left corner, you will see a green icon with the name of the container (Hugo Dev).
5. Run `hugo server -D`. The container will foward port 1313 to the host machine, so you can access the website at `http://localhost:1313`.

### Development - R-Studio

#### Prerequisites

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Hugo](https://gohugo.io/getting-started/installing/)
* [R](https://cran.r-project.org/)
* [RStudio](https://www.rstudio.com/products/rstudio/download/)
* [blogdown](https://bookdown.org/yihui/blogdown/)

#### Steps

**Option 1: Using the usethis Package (Recommended for R Users)**

The `usethis` package provides a streamlined workflow for creating pull requests without manually managing branches or navigating GitHub's interface. This is especially helpful if you're already familiar with R but new to Git/GitHub workflows.

**Setup (one time):**

1. Install the usethis package: `install.packages("usethis")`
2. Configure Git with your credentials: `usethis::use_git_config(user.name = "Your Name", user.email = "your.email@example.com")`
3. Set up a GitHub personal access token: `usethis::create_github_token()` and then `gitcreds::gitcreds_set()`

**For each contribution:**

1. **Fork and clone:** If you haven't already, fork the repository on GitHub, then: `usethis::create_from_github("forrtproject/forrtproject.github.io", fork = TRUE)`
2. **Start your work:** `usethis::pr_init("brief-description-of-change")` - This creates and switches to a new branch
3. **Make your changes** to the relevant files
4. **Preview locally** using `blogdown::serve_site()` or `hugo server -D`
5. **Push your changes:** `usethis::pr_push()` - This pushes your branch and opens the PR creation page on GitHub
6. Fill out the PR template and submit your pull request

For more details, see the [usethis PR functions documentation](https://usethis.r-lib.org/articles/pr-functions.html).

**Option 2: Manual Git Workflow**

If you are a R user and would prefer to work in RStudio, you need to:

1. Open R Studio, then go in the Menu > New Project... > Version Control > Git
    * Repository URL: `git clone https://github.com/forrtproject/forrtproject.github.io.git`
    * Project directory name: `FORRT`
    * Create project as a subdirectory of: `click Browse and decide where you want put it`
2. Before editing, try to run it locally using the blogdown Addins in RStudio.

To edit it locally, you will then need to:

1. Fork this GitHub repo (create a version of the FORRT repo on your own account).
2. Clone this repo you just added in your own account: `git clone https://github.com/yourusername/forrtproject.github.io.git` in a terminal window.
3. To run the website locally, make sure you are still in `FORRT/` dir and type `hugo server -D` in your terminal.
   - The -D option is to serve the website including draft .md files.
4.  Create a new branch with your name or the feature you would like to add (e.g. outreach). Depending on your code editor, the way to do this will vary (e.g. in Visual Studio Code you can click on "master" in the bottom left and select "new branch").
5. Make changes on your branch. Check that it the website is working using again `hugo server -D`.
6. Select what changes you want to add now and "stage" them with Git.
7. Commit your changes and add a message that describes the changes.
8. Then you can push this branch to GitHub.
9. Create a pull request to the original FORRT repo.

Please note that RStudio is not designed for website development, so you may find it easier to use the Dev Containers method described above.

### Pull Request Best Practices

When creating a pull request:

1. **Use clear, descriptive titles** - e.g., "Fix typo in glossary entry for 'preregistration'" or "Add new educational resource about open data"
2. **Fill out the PR template completely** - This helps reviewers understand your changes
3. **Confirm you've read CONTRIBUTING.md** - Check the box in the PR template to confirm
4. **Keep changes focused** - One PR should address one issue or feature
5. **Test your changes** (for technical contributions) - Ensure the website builds and runs locally
6. **Preview on staging** - After your PR is created, check the staging site link in the PR comments
7. **Be patient** - Maintainers are volunteers and will review your PR as soon as possible
8. **Respond to feedback** - Address any comments or requested changes promptly

### Understanding the Glossary Guidelines

When contributing to the glossary or other structured content, please pay special attention to:

- **Formatting consistency** - Follow the existing format for entries
- **Citation requirements** - Include proper references where needed
- **Alphabetical ordering** - Maintain the sort order
- **Link validation** - Ensure all links work correctly
- **Terminology accuracy** - Use precise, accepted terminology in the field

These guidelines help maintain the quality and usability of FORRT's resources. If you're unsure about any of these, ask in your PR or check existing entries for examples.