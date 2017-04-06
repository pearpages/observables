var Rx = require('rx');

var observable = Rx.Observable.create(function (observer) {
    observer.onNext('Simon');
    observer.onNext('Jen');
    observer.onNext('Sergi');
    observer.onCompleted(); // We are done
});

// if we don't subscribe the observable does not work
observable.subscribe(function (v) {
    console.log(v);
});

// or we can create an observer
var observer = Rx.Observer.create(
    function onNext(x) { console.log('Next: '+x); },
    function onError(err) { console.log('Error: '+ err)},
    function onCompleted() { console.log('Completed')}
);

observable.subscribe(observer);