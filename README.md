# W8D4 After-Class Assignment

## The goal of this assignment was to set up a CI Workflow with GitHub Actions.

### Set up for local use of app

1. Clone the repo. 
2. Change directory to the CIJournal folder.
3. Run `npm install` to install the dependencies needed.
4. Run `npm start` will run all jest tests and set the app to work at [http://localhost:3000](http://localhost:3000) in your browser. 


### To test CI workflow after cloning

1. Navigate to the repo in GitHub.
2. Click on "Actions" tab.
3. On the left select `CI Workflow for CI Journal`.
4. Choose "Run workflow" form the `Run workflow` dropdown menu on the right.

### Challenges Faced and Lessons Learned

Setting up the CI workflow was pretty straight forward. My only issue with that part was finding the correct resources for the actions versions. The GitHub marketplace was good for that.

The hardest part of the assignment for me was creating the testing to go with the journal app. What I thought was simple, turned more complex with the test requiremnts. I at first didn't set the app with most of the required functionality. Figuring out a way to mock for testing purposes was new to me. I used ChatGPT for help with tests and refactoring of my app script to work with the tests correctly. React seems to be easier at creating front end projects like this, but more challenging to me creating the CI workflow.