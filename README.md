# Sprint 8 project. Automated E2E tests for Urban Routes.

by Dmitrii Geniuk


The tests can be found in 'test/specs/createAnOrder.e2e.js' file from the root folder of the project 'hm08-qa-us'.
In this project can be found automated end-to-end testing of full process of ordering a taxi with special requirements, as well as function testing (adding Ice Cream, choosing Supportive tariff etc). 
Project consists of 9 separate tests in total which are run one after another. For purpose of avoiding saved cookies and options, each test, beginning with the second one, contains functions to delete local storage and cookies. 
For additional information on used functions, buttons, input-fields and locators, please turn to 'page.js' file.

For the purpose of this project were used: Node.js, WebdriverIO, Mocha, Jest Frameworks. Full list of options and tools can be found in wdio.conf.js file. 

The methods of async were used to wait for the responses.

To run the tests you should use in-built terminal in VS Code by executing the command 'npm run wdio' from root directory of the project.
 