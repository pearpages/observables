# Observables Examples

## a Complex Examples

```javascript
this._route.params.switchMap((params: Params) => {
    document.body.scrollTop = 0;
    this.slug = params['slug'];

    return this._testo.getChallengeDetails()
})
.switchMap((res) => {
    this.countries = res.groups;
    let country = res.groups.find((v) => v.slug === this.slug);
    this.id = country.id;
    this.flagUrl = country.image;
    this.name = country.name;

    return Observable.merge(
        this._testo.getStats(this.id).map(res => {
        this.globalStats = res;
        return 'globalStats';
        }),
        this._testo.getChallengeDetails(this.id).map(res => {
        this.details = res;
        return 'details';
        }),
        this._testo.getCountryRanking(this.id).map(res => {
        this.ranking = res;
        return 'ranking';
        }),
        this._testo.getChallenges(this.id).map(res => {
        this.challenges = res;
        return 'challenges';
        }))
})
.subscribe((res) => {
console.log('result got: '+res);
});
```

---

## From a Button or Input

```html
<button id="start">Start</button>
```

```javascript
const startButton = document.querySelector('#start');

Observable.fromEvent(startButton,'click');
```

```javascript
const input$ = Observable.fromEvent(document.querySelector('#text'),'input')
    .map( $event => $event['target']['value'])
    .subscribe( (x) => console.log(x));
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

---

## combineLatest

```javascript
Observable.combineLatest(
    timer$,
    input$,
    (timer, input) => ({count: timer.count, text: input})
    .subscribe( (x) => console.log(x) )
);
```

---

## filter

```javascript
Observable.combineLatest(
    timer$,
    input$,
    (timer, input) => ({count: timer.count, text: input})
    .filter( (data) => data.count === parseInt(data.text))
    .subscribe( (x) => console.log(x) )
);
```

---

## takeWhile

```javascript
Observable.combineLatest(
    timer$,
    input$,
    (timer, input) => ({count: timer.count, text: input})
    .takeWhile( (data) => data.count <= 3)
    .filter( (data) => data.count === parseInt(data.text))
    .subscribe(
         (x) => console.log(x),
         err => console.err(err),
         () => console.log('complete')
    )
);
```

----

## reduce

Runs on complete.

```javascript
Observable.combineLatest(
    timer$,
    input$,
    (timer, input) => ({count: timer.count, text: input})
    .takeWhile( (data) => data.count <= 3)
    .filter( (data) => data.count === parseInt(data.text))
    .reduce( (acc, curr) => acc +1, 0) // when it finishes
    // it will finish when takeWhile happens
    .subscribe(
         (x) => console.log(x),
         err => console.err(err),
         () => console.log('complete')
    )
);
```

---

## do

Something that is going to happen outside our stream.

```javascript
Observable.combineLatest(
    timer$,
    input$,
    (timer, input) => ({count: timer.count, text: input})
    .do( (x) => console.log(x) ) // <--
    .takeWhile( (data) => data.count <= 3)
    .filter( (data) => data.count === parseInt(data.text))
    .reduce( (acc, curr) => acc +1, 0) // when it finishes
    // it will finish when takeWhile happens
    .subscribe(
         (x) => console.log(x),
         err => console.err(err),
         () => console.log('complete')
    )
);
```

---

## withLatestFrom

```javascript
timer$
    .takeWhile( (data) => data.count <= 3)
    .withLatestFrom(
        input$,
        (timer, input) => ({count: timer.count, text: input})
    .filter( (data) => data.count === parseInt(data.text))
    .reduce( (acc, curr) => acc +1, 0) 
    .subscribe(
         (x) => console.log(x),
         err => console.err(err),
         () => console.log('complete')
    )
);
```

---

## repeat

It repeats the stream so the subscriptions never finish. 

**Warning** usually it's used just before the subscription.

```javascript
timer$
    .takeWhile( (data) => data.count <= 3)
    .withLatestFrom(
        input$,
        (timer, input) => ({count: timer.count, text: input})
    .filter( (data) => data.count === parseInt(data.text))
    .reduce( (acc, curr) => acc +1, 0) 
    .repeat() // <-- is re-subscribing to the same stream
    .subscribe(
         (x) => console.log(x),
         err => console.err(err),
         () => console.log('complete')
    )
);
```

---

## share

Returns an observable sequence that shares a single subscription to the underlying sequence.