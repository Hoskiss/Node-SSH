var ssh2 = require('ssh2');
var conn = new ssh2();
var express = require('express');
var router = express.Router();
var stripColorCodes = require('stripcolorcodes');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('salt');
});

/* GET home page. */
router.get('/ping', function(req, res) {

    var total_minions = "";
    conn.on('ready', function() {
        console.log('Connection :: ready');
        conn.shell(function(err, stream) {
            if (err) throw err;
            stream.on('close', function() {
                console.log("==================");
                console.log(total_minions);
                res.send(total_minions);
                console.log("==================");
                console.log('Stream :: close');
                conn.end();
            }).on('data', function(data) {
                //console.log('STDOUT: ' + data);
                // var minion_list = data.split(" ");
                total_minions += (stripColorCodes(data.toString())+"\n");
                //console.log(minion_list);
            }).stderr.on('data', function(data) {
                console.log('STDERR: ' + data);
            });
            stream.end('salt "*" test.ping\nexit\n');
          });
        }).connect({
            host: '10.140.30.249',
            port: 22,
            username: 'root',
            password: 'sk8free'
        });
});

module.exports = router;
