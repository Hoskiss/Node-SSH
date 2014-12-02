var sequest = require('sequest')
sequest('root@127.0.0.1', 'ls', function (e, stdout) {
  if (e) throw e
  console.log(stdout.split('\n'))
})