var Rx = require('rx');
var fs = require('fs');

var readdir = Rx.Observable.fromNodeCallback(fs.readdir);

var source = readdir('/Users/pearpages');

var subscription = source.subscribe (
    function(res) { console.log('List of directories: ' + res.toString('utf8').split(',').join('\n')); },
    function(err) { console.log('Error: ' + err); },
    function() {console.log('Done!'); }
)