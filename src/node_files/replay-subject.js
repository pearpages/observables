var Rx = require('rx');

var subject = new Rx.ReplaySubject();

subject.onNext(1);

subject.subscribe(
    function (n) {
        console.log('Received value:', n);
    }
);

subject.onNext(2);
subject.onNext(3);

console.log('Replays: ')
subject.subscribe(function (x) {console.log(x)});