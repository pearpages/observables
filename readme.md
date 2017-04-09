# RxJS Observables

An Observable represents a stream of data. Programs can be expressed largely as streams of data.

+ Spreadsheets Are Reactive
+ Mouse is a stream of values


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

## Creating Observers

Observers listen to observables.

Observers have three methods:

+ onNext
+ onCompleted
+ onError

## Avoiding External State

Most of the time we can avoid relying on external state. Common scenarios for using it are caching values or keeping track of changing values in the program. These scenarios can be handled in several other ways. For example, when we need to cache values, RxJS's Subject Class can help a lot, and when we need to keep track of previous states of the game, we can use methods like Rx.Observable.scan.

## Pipelines Are Efficient

Chaining looks similar in Observables and in arrays; there are even methods like filter and map that are present in both types. But there’s a crucial difference: array methods create a new array as a result of each operation, which is tra- versed entirely by the next operation. Observable pipelines, on the other hand, don’t create intermediate Observables and apply all operations to each element in one go. The Observable is thus traversed only once, which makes chaining Observables efficient.

> When we chain a transformation like map, we’re composing a single function that will operate on every item of the array once.

## RxJS's Subject Class

> A **Subject** is a type that implements both Observer and Observable types. As an Observer, it can subscribe to Observables, and as an Observable it can produce values and have Observers subscribe to it.