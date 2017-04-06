# RxJS Observables

+ [Basics](./docs/basics.md)

## Hello World

```bash
$ npm install rx rx@4.0.0 node_modules/rx
```

```js
var Rx = require('rx');
Rx.Observable.just('Hello World!').subscribe(function(value) { console.log(value);
});
```

