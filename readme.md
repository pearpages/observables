# RxJS Observables

## Resources

+ https://github.com/Reactive-Extensions/RxJS/releases/latest 5. https://github.com/Reactive-Extensions/RxJS
+ http://reactivex.io
+ http://rxmarbles.com/
+ http://pragprog.com/titles/smreactjs

## Docs

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

