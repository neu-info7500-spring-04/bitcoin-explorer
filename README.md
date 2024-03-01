# Bitcoin Explorer


## Built With

* [NextJS](https://nextjs.org/): React Framework
* [Wundergraph](https://wundergraph.com/) API Gateway, GraphQL Federation
* [Devbox](https://www.jetpack.io/devbox): Portable, Isolated, Reproducible Dev Environments


## Preliminary

Before starting work on this project, it's critical to first learn how each of the tools above works.

It's easiest to focus on one tool at a time. For each tool separately, spend 1-2 hours reading through its 
documentation and working through their quickstarts and tutorials. 

You don't need to understand all
the details about the tool but you should feel comfortable with how it's working and know which parts of it 
you'll be using. 

For example, `wundergraph` works with all sorts of data sources (APIs, databases, etc) and 
all sorts of UI frameworks. But, for this project, we're only integrating with REST APIs and GraphQL APIS 
as data sources, and we're only using NextJS as the UI. So no need to read about how to integrate with postgres 
or how to integrate with Vite. But it's useful to have a broad understanding of what it's capable of.


## Setup

Install devbox. Instructions: https://www.jetpack.io/devbox/docs/installing_devbox/.

Then run the following commands in your terminal:
```
git clone git@github.com:neu-info7500-spring-04/bitcoin-explorer.git`
devbox shell
cd ui
npm install
npm run dev
```

To start the wundergraph server, in a separate terminal but the same directory as the first terminal.
```
devbox shell
npm run wunderctl-generate
npm run wunderctl-up
```

# Git Workflow

As a team collaborating on this project, we'll need to establish a workflow with git that ensures the `main` branch always works and is nearly bug free.

The most common flow is the one described by Github [here](https://docs.github.com/en/get-started/using-github/github-flow).
In summary:
* Create a branch off of `main` called `<github-username>_<code-description>`. For example: `rajeev_new-experimental-changes`
* Commit your changes to the branch.
* Create a pull request from the branch into main.
* Request code reviews from two students who need to mark the PR as approved before merging.
* Merge your pull request and [squash your merge commits](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github)

### Code Review
You must request a code review for your pull request before merging into main from two other students in the class.
Read more about this code review process [here](https://github.com/features/code-review).
Your code reviewers are responsible for pointing out deficits in your pull request such as bugs, poor code quality, overly complex implementation, insufficient test cases. They’ll be held responsible if they approve your pull request even though it breaks the application and thus prevents other people from making progress on their work.

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