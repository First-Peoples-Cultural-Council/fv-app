# Developer Setup

1. Clone the repository and switch to the `dev` branch.
1. Configure the `.env` file, being sure to set the correct `REACT_APP_BASE_API_URL` of your API server.
1. Install dependencies and build the application.

```bash
$ npm install
$ npm run build
```

4. Start the application.
```bash
$ npm start
```

5. Access the application at `[sitename].localhost:3000`

    a. If you are switching between different sites locally, you may need to clear your local data in between depending on your browser.

    b. If you want custom icons and site titles locally, you need to add the required `manifest.[sitename].json` file in the `public` folder, as well as a `[sitename]` subfolder containing the required icons. (See [Adding new dialects/languages](#adding-new-dialectslanguages) below for file specs.)


## Running the tests

```bash
$ npm test
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

In order to add an app for a new language:

1. You will need to add a subdomain for the new language app. Then a DNS record needs to be created to point that subdomain to the application server. All subdomains can point to the same place; the application will detect the subdomain.

1. Create a manifest file for the new language in the `public` folder using the pattern `manifest.language-sub-domain.json`. Any new manifest files can be kept in a directory that is named the language sub-domain in the `public` folder. For example, for the Esperanto language, the manifest file would be `public/manifest.esperanto.json` and any new manifest files would be kept in the `public/esperanto` directory. That is also where all the asset files (e.g., favicons) in the manifest file will be kept for that language. Make sure to update the `src` properties in the manifest file to match where the assets are kept. *Note* for the FirstVoices deployments these configuration files are managed in a separate repository and moved to the `public` folder during deployment.

## Note on Service Worker Caching

Workbox didn't automatically cache all of the files that are needed for the app to run offline. So in the service-worker.ts under precacheAndRoute there are files that have been added via the manifestFileList.json file that is generated during the build process. The two files to keep in mtd-ui.min.js and service-worker.js

