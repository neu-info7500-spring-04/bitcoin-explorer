# Bitcoin Explorer


## Setup

* Install devbox. Instructions: https://www.jetpack.io/devbox/docs/installing_devbox/).
* `git clone git@github.com:neu-info7500-spring-04/bitcoin-explorer.git`

## Built With

* [NextJS](https://nextjs.org/): React Framework
* [Wundergraph](https://wundergraph.com/) API Gateway, GraphQL Federation
* [Devbox](https://www.jetpack.io/devbox): Portable, Isolated, Reproducible Dev Environments

## Notes

* The `devbox shell` will open a new shell that's isolated from the rest of your machine. Thus, your normal command line utilities will likely not be accessible from within this shell, which is the intent. Thus, you should only run the following commands from within the shell:
```
npm run dev
npm build
```
# Git Workflow

As a team collaborating on this project, we'll need to establish a workflow with git that ensures the following:
* The `main` branch always works and is nearly bug free.
* To add your code to `main`:
  * Create a branch off of `main` called `<github-username>_<code-descriptoin>`. 
    * For example: `rajeev_new-experimental-changes`
  * Commit your changes to the branch
  * Create a pull request from the branch into main
  * Request code reviews from two students who must mark the PR as approved.
  * Merge your pull request with the "Squash my commits option"
- Follow this method: https://docs.github.com/en/get-started/using-github/github-flow:
    - Create a branch
    - Make change
    - Create a p
- You must request feedback for your pull request from two other students in the class. These other students are responsible for pointing out deficits in your pull request such as bugs, poor code quality, overly complex implementation, insufficient test cases. They’ll be held responsible if they approve your pull request even though it breaks the application and thus prevents other people from making progress on their work.

## References

This project was created with these steps:
```
devbox init
devbox add nodejs
devbox shell
npx create-next-app@latest ui --typescript --no-tailwind --use-npm --src-dir --no-eslint --app --import-alias="@/*"
npx create-wundergraph-app --init
```

Then, the `page.tsx` and `page.module.css` files were cleaned up.