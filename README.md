# Setup

## Install

```bash
$ npm install
```

## Configure env
> Rename ```.env.example``` to ```.env``` and inside of that update ```REACT_APP_API_URL``` and ```REACT_APP_API_SITE``` to the api that will be used.

## Run Dev Server

```bash
$ npm start
```

## Build

```bash
$ npm run build
```

## Run tests

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
In order to add a new language to the app, you will need to add a new language as a subdomain to the app. Then a DNS record needs to be created to point that subdomain to the same place as every other language subdomain.
Once that is done, the manifest file will need to be created for the new language in the `public` folder using the pattern `manifest.language-sub-domain.json`. Any new manifest files can be kept in a directory that is named the language sub-domain in the `public` folder.
For example, for the smalgyax language, the manifest file would be `public/manifest.smalgyax.json` and any new manifest files would be kept in the `public/smalgyax` directory. That is where all the asset files in the manifest file will be kept for that language.  
Make sure to update the `src` properties in the manifest file to match where the assets are kept.

## Service Worker Caching
Workbox didn't automatically cache all of the files that are needed for the app to run offline.
So in the service-worker.ts under precacheAndRoute there are files that have been added via the manifestFileList.json file that is generated during the build process. 
The two files to keep in mtd-ui.min.js and service-worker.js

