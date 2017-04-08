var Rx = require('rx');

var counter = Rx.Observable.interval(100);

var subscription1 = counter.subscribe(function (i) {
    console.log('Subs 1: '+i);
});

var subscription2 = counter.subscribe(function (i) {
    console.log('Subs 2: '+i);
});

setTimeout(function () {
    console.log('Cancelling subscription 2!');
    subscription2.dispose();
},2000);