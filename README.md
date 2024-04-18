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

### Challenges Faced

Setting up the CI workflow was pretty straight forward. My only issue was finding the correct resources for the actions versions. GitHub marketplace was good for that.

I faced the most challenges setting up testing for the edge cases. Mainly because I didn't build my app to handle such cases correctly at first. I did use ChatGPT to refactor my script file and the test file. Mocking the DOM to this extent for testing purposes was also new to me. 