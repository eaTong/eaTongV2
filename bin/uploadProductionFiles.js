const client = require('scp2');
const fs = require('fs');
client.addListener('transfer', (a, b, c) => {
  console.log(a, b, c);
});

fs.existsSync('C:\\certificate');

client.scp('build/', {
    host: '118.24.75.69',
    username: 'ubuntu',
    privateKey: fs.readFileSync(fs.existsSync('C:\\certificate') ? 'C:\\certificate\\eaTong' : '/Users/liuyajun/certifcate/eaTong'),
    passphrase:
      '',
    path:
      '/home/ubuntu/build'
  },

  function (err, ...args) {
    console.log(err, ...args);
  }
)
;
