/**
 * Created by eatong on 18-2-17.
 */
/**
 * Created by eatong on 18-2-17.
 */
const fs = require('fs');
const archiver = require('archiver');
const moment = require('moment');
const dir = 'build';

//ensure path exists
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const output = fs.createWriteStream(`build/${moment().format('YYYY-MM-DD')}build.zip`);
const archive = archiver('zip', {
  zlib: {level: 9} // Sets the compression level.
});

archive.on('error', function (err) {
  throw err;
});

archive.directory('bin/', 'bin');
archive.directory('config/', 'config');
archive.directory('adminDist/', 'adminDist');
archive.directory('server/', 'server');
archive.directory('.next/', '.next');
archive.file('index.js');
archive.file('page-routes.js');
archive.file('package.json');
archive.file('package-lock.json');

archive.pipe(output);


archive.finalize();
