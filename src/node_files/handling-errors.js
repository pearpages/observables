var Rx = require('rx');

var error  = {
    error: 'There was an error parsing JSON'
};

function getJSON(arr) {
    return Rx.Observable.from(arr).map(function (str) {
        // We can also use a try catch here
        // try {
        //     var parsedJSON = JSON.parse(str);
        // } catch (err) {
        //     return error;
        // }

        return parsedJSON;
    });
}

getJSON(
    [
        '{"1": 1, "2": 2 }',
       '{"success: true}', // Invalid JSON
        '{"enabled": true}'
    ]
).catch(Rx.Observable.return(error))
.subscribe(
    function (json) {
        console.log('Parsed JSON: ',json);
    },
    function (err) {
        // Because of the catch we never execute this function
        console.log(err.message);
    }
);