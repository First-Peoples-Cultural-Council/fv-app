const fs = require('fs');
const path = require('path');
const guid = require('uuid');
const Glob = require('glob');

function getFilenames(directory, globPattern) {
  return Glob.glob(globPattern, { cwd: directory }).then((files) => {
    const fileList = [
      {
        url: 'asset-manifest.json',
        revision: guid.v4(),
      },
      {
        url: 'service-worker.js',
        revision: guid.v4(),
      },
    ];
    files.forEach((filename) => {
      fileList.push({
        url: filename,
        revision: `${guid.v4()}`,
      });
    });
    return fileList;
  });
}

getFilenames('public', './**/*.*').then((files) => {
  const filteredFiles = files.filter((file) => file.url !== 'index.html');
  fs.writeFileSync(
    './src/manifestFileList.json',
    JSON.stringify(filteredFiles, null, 2)
  );
  console.log(
    `File written successfully with ${filteredFiles.length} file records.`
  );
});
