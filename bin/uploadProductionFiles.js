const client = require('scp2');
const fs = require('fs');
client.addListener('transfer', (a, b, c) => {
  console.log(a, b, c);
});

client.scp('build/', {
    host: '8.130.50.206',
    username: 'root',
    privateKey: fs.readFileSync('/Users/eatong/certificate/eaTong_ali.pem'),
    path:
      '/root/build'
  },

  function (err, ...args) {
    console.log(err, ...args);
  }
)
;
