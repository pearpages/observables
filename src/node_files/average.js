var Rx = require('rx');

console.log('average');
var avg = Rx.Observable.range(0,5).average();

avg.subscribe(function (x) {
    console.log(x);
});