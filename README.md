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

## Service Worker Caching
Workbox didn't automatically cache all of the files that are needed for the app to run offline.
So in the service-worker.ts under precacheAndRoute there are files that have been added.
If these get updated the revision needs to be changed in service-worker.ts. The two files to keep in mtd-ui.min.js and service-worker.js

