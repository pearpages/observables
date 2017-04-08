// Using scan, we avoid external state altogether. We pass the accumulated count of even ticks to updateDistance instead of relying on an external variable to keep the accumulated value. This way we don’t increment the count with every new subscriber.

var Rx = require('rx');

function updateDistance(acc, i) {
    if (i % 2 === 0) {
        acc += 1;
    }
    return acc;
}

var ticksObservable = Rx.Observable
    .interval(250)
    .scan(updateDistance, 0);

ticksObservable.subscribe(function(evenTicks) { console.log('Subscriber 1 - evenTicks: ' + evenTicks + ' so far');
});
ticksObservable.subscribe(function(evenTicks) { console.log('Subscriber 2 - evenTicks: ' + evenTicks + ' so far');
});
