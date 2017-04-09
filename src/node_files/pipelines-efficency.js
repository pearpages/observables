var Rx = require('rx');

var observable = Rx.Observable.range(0, 1000)
    .map(transformToLetters)
    .map( (x) => x.toUpperCase() );

function transformToLetters(x) {
    if (x % 2 == 0) {
        return 'a'
    } else
        if (x % 3 == 0) {
            return 'b';
        } else
            if (x % 11 == 0) {
                return 'c';
            } else
                if (x % 5 == 0) {
                    return 'd';
                } else
                    if (x % 13 == 0) {
                        return 'e';
                    } else
                        if (x % 7 == 0) {
                            return 'f';
                        } else
                            if (x % 17 == 0) {
                                return 'g';
                            } else
                                if (x % 19 == 0) {
                                    return 'h';
                                } else
                                    if (x % 23 == 0) {
                                        return 'i';
                                    } else {
                                        return 'j';
                                    }
}

observable.subscribe(
    function (x) {
        console.log(x);
    }
);