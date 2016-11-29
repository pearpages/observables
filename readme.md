# Observables Examples

## From a Button

```html
<button id="start">Start</button>
```

```javascript
const startButton = document.querySelector('#start');

Observable.fromEvent(startButton,'click');
```

---

## switchMap / switchMapTo

```javascript
const startButton = document.querySelector('#start');

const start$ = Observable.fromEvent(startButton,'click');
const interval$ = Observable.interval(1000);
const startInterval$ = start$.switchMapTo(interval$);

const subs1 = startInterval$
    .subscribe( (x) => console.log(x) );
```

---

## takeUntil

```javascript
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');

const start$ = Observable.fromEvent(startButton,'click');
const stop$ = Observable.fromEvent(stopButton,'click');
const interval$ = Observable.interval(1000);
const startInterval$ = start$.switchMapTo(interval$);
const startIntervalUntilStop$ = startInterval$.takeUntil(stop$);

const subs1 = startIntervalUntilStop$
    .subscribe( (x) => console.log(x) );
```

---

## scan

```javascript
const start$ = Observable.fromEvent(startButton, 'click');
const stop$ = Observable.fromEvent(stopButton, 'click');
const interval$ = Observable.interval(1000);
const intervalThatStops$ = interval$.takeUntil(stop$);
const startIntervalThatStopsAndRestarts$ = start$.switchMapTo(intervalThatStops$)
    .scan( (acc) => {
    return { count: acc.count + 1 }
    }, { count: 0 })
    .subscribe((x) => console.log(x));
```

---

## merge

```javascript
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

const start$ = Observable.fromEvent(startButton, 'click');
const stop$ = Observable.fromEvent(stopButton, 'click');
const reset$ = Observable.fromEvent(resetButton,'click');
const interval$ = Observable.interval(1000);
const intervalThatStops$ = interval$.takeUntil(stop$);

const inc = (acc) => ({ count: acc.count + 1 });
const reset = (acc) => ({ count: 0});
const incOrReset$ =  Observable.merge(intervalThatStops$.mapTo(inc),reset$.mapTo(reset));

const startIntervalThatStopsAndRestarts$ = start$.switchMapTo(incOrReset$)
    .scan( (acc,curr) => {return curr(acc);})
    .subscribe((x) => console.log(x));
```