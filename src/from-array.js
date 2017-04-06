var Rx = require('rx');

Rx.Observable
    .from(['Joan','Pere','Jaume','Xavi'])
    .subscribe(
        function onNext(x) {
            console.log('Next: '+x);
        },
        function (err) { console.error( err )},
        function () { console.log('Completed')}
    );