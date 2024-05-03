# Developer Setup
Step 1: Clone the repository https://github.com/First-Peoples-Cultural-Council/fv-app and switch to “dev” branch.

Step 2: Make sure you have node dependencies installed on your machine using the command “npm install"

Step 3: Run the application build using the command “npm run build" on your terminal.

Step 4: Test the application using the command “npm test"

Step 5: Start the application locally using the command “npm start"

Step 6: If your IDE supports auto trigger of the application onto the browser it will open on “localhost:3000”. However, this would not work as in our backend API CORS rule we allow localhost with a prefix subdomain. So open the language site app you want to access e.g. “samalgyax.localhost:3000”

```bash
$ npm install
$ npm run build
```

## Running the tests

```bash
$ npm test
```

## Start the application.
```bash
$ npm start
```

## Adding Icons Using Fontello

```bash
$ npm run icons:open
```

This will open the fontello website in your browser.

Drag and drop the icons you want to add to the fontello website.

Select the icons you want to add to the fontello font.

Click the download button and select the "Get config only" option.

Copy the contents of the config.json file to the clipboard.

Replace the contents of the fontello.config.json file with the contents of the clipboard.

Run the following command to download the new icons and update the fontello font.

```bash
$ npm run icons:generate
```

## Adding new dialects/languages

Step 1: Add the icon artifacts for the language in the “fv-apps-config” repository. Please make sure you add the artifact in the right directory e.g. If we want to add smalgyax to dev deployment, check “dev-config/public”  directory which contains artifacts for the dev deployment, we want to add smalgyax language in dev deployment, hence, create a directory named smalgyax in path “dev-config/public/smalgyax”. Then add add a manifest file for the language “manifest.smalgyax.json“ in the path “dev-config/public/manifest.smalgyax.json”. Once both of these are added the icon artifacts are in the right place.

Step 2: Next is we want to add the new language to the environment’s variable. For this go to the “fv-app” repository main page  → Click on Repository Settings → Environments. This will display the list of available environments “dev” , “preprod” and “prod”. Click on the the environment where you want to add the new language. E.g: If we want to add a dummy language called “awesomelanguage” to dev. We will click on dev, then scroll to the bottom of the page to the section called “Environment variables” there will be an existing variable SUBDOMAIN with value [\"smalgyax\", \"gitsenimx\"]. We will make edit to this vaiable to make the value from this [\"smalgyax\", \"gitsenimx\"]---> to this [\"smalgyax\", \"gitsenimx\", \”awesomelanguage\”]

Step 3: Last task it to push a new workflow in the environment of deployment. Once we have the artifacts added and the environment variables updated. We just need a Github Actions workflow to run to complete the deployment. If there is a change in the code in the “fv-app” repo we can make the change and push and the new subdomain will be enabled. But usually there can be case where there is no change and we need to add a subdomain. For dev and preprod just re-run the last run workflow for the environment’s associated branch. For prod create a new release tag.

## Note on Service Worker Caching

Workbox didn't automatically cache all of the files that are needed for the app to run offline. So in the service-worker.ts under precacheAndRoute there are files that have been added via the manifestFileList.json file that is generated during the build process. The two files to keep in mtd-ui.min.js and service-worker.js

