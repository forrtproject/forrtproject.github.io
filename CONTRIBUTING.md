# Contributing

For FORRT contributors, you can clone this repository to your local machine and make changes on the feature branch. For now, we do not use a development branch, so you can propose changes to the master branch.
For external contributions, this website operates on the fork and pull model, so you will need to fork this repository to your own account and then clone it to your local machine.

## Development - R-Studio

### Prerequisites

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Hugo](https://gohugo.io/getting-started/installing/)
* [R](https://cran.r-project.org/)
* [RStudio](https://www.rstudio.com/products/rstudio/download/)
* [blogdown](https://bookdown.org/yihui/blogdown/)

### R-Studio

If you are a R user and like to work in RStudio, you need to:

1. Open R Studio, then go in the Menu > New Project... > Version Control > Git
    * Repository URL: `git clone https://github.com/forrtproject/forrtproject.github.io.git`
    * Project directory name: `FORRT`
    * Create project as a subdirectory of: `click Browse and decide where you want put it`
2. Before editing, try to run it locally using the blogdown Addins in RStudio.

To edit it locally, you will then need to:

1. Fork this GitHub repo (create a version of the FORRT repo on your own account).
2. Clone this repo you just added in your own account: `git clone https://github.com/yourusername/forrtproject.github.io.git` in a terminal window 
3. To run the website locally, make sure you are still in `FORRT/` dir and type `hugo server -D` in your terminal.
   - The -D option is to serve the website including draft .md files.
4.  Create a new branch with your name or the feature you would like to add (e.g. outreach). Depending on your code editor, the way to do this will vary (e.g. in Visual Studio Code you can click on "master" in the bottom left and select "new branch").
5. Make changes on your branch. Check that it the website is working using again `hugo server -D`.
6. Select what changes you want to add now and "stage" them with Git.
7. Commit your changes and add a message that describes the changes.
8. Then you can push this branch to GitHub.
9. Create a pull request to the original FORRT repo.

## Development - Dev Containers and VSCode (Advanced)

Another way to run the project locally without installing Hugo on the host machine is via the use of Dev Containers. These are essentially disposable development environments that run in containers, which ensure all dependences are installed as required and that host dependencies do not impact the project (or vice versa). This ensures reproducibility and consistency across different hosts, but does require a container runtime (Dockerd, containerd etc.) to be installed on the host machine.

### Prerequisites

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Docker](https://docs.docker.com/get-docker/)
   * For Windows, make sure to install [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)
* [Visual Studio Code](https://code.visualstudio.com/)

### Steps

1. Open VSCode and ensure you have the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed in Visual Studio Code.
2. Open `.devcontainer/devcontainer.json` in VSCode.
3. In the context menu of VSCode (Crl + Shift + P), select `Dev Containers: Open Folder in Container`.
4. Wait for the container to build. The context of VS Code will change. In the bottom left corner, you will see a green icon with the name of the container (Hugo Dev).
5. Run `hugo server -D`. The container will foward port 1313 to the host machine, so you can access the website at `http://localhost:1313`.