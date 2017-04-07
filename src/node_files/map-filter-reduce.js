var Rx = require('rx');

var src = Rx.Observable.range(1,5);
var double = src.map(function (x) {
    return x * 2;
});

console.log('map');
double.subscribe(function (x) {
    console.log(x);
});

console.log('filter');
src.filter(function (x) {
    return ( x % 2 === 0 )
}).subscribe(function (x) {
    console.log(x);
});

console.log('reduce');
src.reduce(function(acc,x) {
    return acc + x;
}).subscribe(function (x) {
    console.log(x);
});