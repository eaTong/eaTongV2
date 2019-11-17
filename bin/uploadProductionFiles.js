const client = require('scp2');
const fs = require('fs');
client.addListener('transfer', (a, b, c) => {
  console.log(a, b, c);
})

client.scp('build/', {
  host: '118.24.75.69',
  username: 'ubuntu',
  privateKey: require("fs").readFileSync('/Users/liuyajun/certifcate/eaTong'),
  passphrase: '',
  path: '/home/ubuntu/build'
}, function (err, ...args) {
  console.log(err, ...args);
});
