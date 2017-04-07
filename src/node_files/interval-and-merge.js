var Rx = require('rx');

var A = Rx.Observable.interval(200).map(function (i) {
    return 'A' + i;
});

var B = Rx.Observable.interval(100).map(function (i) {
    return 'B' + i;
});

var AB = Rx.Observable.merge(A,B);

AB.subscribe(function (x) {
    console.log(x);
});