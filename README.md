# Bitcoin Explorer

### Setup for Bitcoin Explorer Project
* Install the latest LTS version of Nodejs.
* Clone this repository: `git clone git@github.com:neu-info7500-spring-04/bitcoin-explorer.git`
* Copy the `.env.example` file and name it `.env`. 
* Check that the `GRAPHQL_API_GATEWAY_URL` in `.env` points to the API gateway (e.g. Grafbase endpoint).
* In the `bitcoin-explorer` directory, execute:
```
npm install 
npm run codegen
npm run dev
```
The app should be visible at http://localhost:3000:

![bitcoin.png](bitcoin.png)

### Testing with Playwright
* Install the Playwright for testing. 
During project initialization, select `false` or `N` when asked to add a GitHub Actions workflow, unless you plan to write an action workflow for testing.
```
npm init playwright@latest
``` 
* Write your tests in `tests` directory.
* Run tests and check the test report: 
``` 
npx playwright test 
npx playwright show-report
```

testing CI