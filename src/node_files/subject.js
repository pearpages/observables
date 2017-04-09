var Rx = require('rx');

var subject = new Rx.Subject();

var source = Rx.Observable.interval(300)
    .map(function (v) { return 'Interval message #' + v; })
    .take(5);

source.subscribe(subject);

var subscription = subject.subscribe(
    function onNext(x) {
        console.log('onNext: ' + x);
    },
    function onError(err) {
        console.log('onError: ' + err);
    },
    function onCompleted() {
        console.log('onCompleted');
    }
);

// these will go first because there's interval will start 300ms later
subject.onNext('Our message #1');
subject.onNext('Our message #2');

setTimeout(function () {
    subject.onCompleted();
},1000);

// Output:

// onNext: Our message #1
// onNext: Our message #2
// onNext: Interval message #0
// onNext: Interval message #1
// onNext: Interval message #2
// onCompleted

// The values from the Observable come later because they are asynchronous, whereas we made the Subject’s own values immediate. Notice that even if we tell the source Observable to take the first five values, the output shows only the first three. That’s because after one second we call onCompleted on the Subject. This finishes the notifications to all subscriptions and overrides the take operator in this case.