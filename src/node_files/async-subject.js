// **AsyncSubject** emits the last value of a sequence only if the sequence completes.

// In that example, delayedRange emits the values 0 to 4 after a delay of a second. Then we create a new AsyncSubject subject and subscribe it to delayedRange.
var Rx = require('rx');

var delayedRange = Rx.Observable.range(0,5).delay(1000);
var subject = new Rx.AsyncSubject();

delayedRange.subscribe(subject);

subject.subscribe(
    function (item) {console.log('Value: ' + item)},
    function (err) { console.log('Error:' + err)},
    function () { console.log('Completed.');}
);

// Output

// Value: 4
// Completed.