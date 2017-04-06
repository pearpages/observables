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