# Install:

* npm install
* npm start
* Open in browser: http://localhost:8080/api/docs/
* Open in browser: http://localhost:8080

# Requirements:

We are looking to build a money accounting system. The application should be a web service. It should not do any real “transactional” work, just emulate the financial transactions logic. No security is required. So don't worry about authentication.

# Must have
* The App must be able to receive credit and debit financial transactions.
* The web-app serves a single user, so we always have just one financial account.
* Any transaction, which leads to negative amount within the system, should be refused. Please provide http response code, which you think suits best for this case.
* The App must store transactions history. Use in-memory storage. Pay attention that several transactions can be sent at the same time.
* In general, the App will be used programmatically via its RESTful API. For testing purposes Postman or any similar app can be used.
* It should be possible to launch each project in one-line-command. Please provide README.md
* Our company follows OpenAPI principles so you can find the predefined API. It contains only model definition, please design REST API that fits application needs.

```
transaction {
  id: {string} uuid,
  type: {string} 'credit'|'debit',
  amount: {number} two decimals,
  effectiveDate: {string} date-time
}
```


# UX/UI requirements:
* We need a simple UI for this application.
* UI should display the transactions history list only. No other operation is required.
* Transactions list should be done in accordion manner. By default the list shows short summary for each transaction. The detailed info of for a transaction should be shown on click.
* It would be good to have some coloring for credit and debit transactions.

# Development process:
* Please develop application in local Git repository. Publish to GitHub, or BitBucket or any other public repository service. Commit as you normally do.

# Expected Deliverables
* Source code.
* Binary versions of your applications that are ready to run. No build should be required.
* Readme.
