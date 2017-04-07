var Rx = require('rx');

var src = Rx.Observable.range(1,5);
var double = src.map(function (x) {
    return x * 2;
});

double.subscribe(function (x) {
    console.log(x);
});