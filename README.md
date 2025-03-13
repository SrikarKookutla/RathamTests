I have completed the validation please find the below steps

install the playwright using:
npm init playwright@latest
npm install
npm install xlsx


now using the package.json enable the npm scripts in vscode extension
we can be able to run the scripts using the run icon under scripts

or after installation we can directly run the below command to run the script in headed mode
npx playwright test rathamtest.spec.ts --project=chromium --headed
