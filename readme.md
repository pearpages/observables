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

### AsyncSubject

AsyncSubject emits the last value of a sequence only if the sequence completes. This value is then cached forever, and any Observer that subscribes after the value has been emitted will receive it right away.

> AsyncSubject is convenient for asynchronous operations that return a single value, such as **Ajax** requests.

### BehaviorSubject

When an Observer subscribes to a BehaviorSubject, it receives the last emitted value and then all the subsequent values. BehaviorSubject requires that we pro- vide a starting value, so that all Observers will always receive a value when they subscribe to a BehaviorSubject.

### ReplaySubject

A ReplaySubject caches its values and re-emits them to any Observer that subscribes late to it. Unlike with AsyncSubject, the sequence doesn’t need to be completed for this to happen.

Of course, to accomplish that behavior ReplaySubject caches all values in memory. To prevent it from using too much memory, we can limit the amount of data it stores by buffer size or window of time, or by passing particular parameters to the constructor.

```js
var subject = new Rx.ReplaySubject(2); // Buffer size of 2

var subject = new Rx.ReplaySubject(null, 200); // Buffer size of 200ms
```