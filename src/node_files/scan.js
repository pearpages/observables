var Rx = require('rx');

console.log('scan');
var intervals = Rx.Observable.interval(1000).scan(function (acc, curr) {
    return {
        sum: acc.sum + curr,
        count: acc.count + 1
    }
}, {sum: 1, count: 0})
.map(function (x) {
    return (x.sum / x.count);
});

intervals.subscribe(function (x) {
    console.log(x);
});
