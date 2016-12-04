import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  makeLogger(index: number) {
    return ((x) => console.log('subscription ' + index + ':' + x))
  }

  ngOnInit() {
    const startButton = document.querySelector('#start');
    const stopButton = document.querySelector('#stop');
    const resetButton = document.querySelector('#reset');
    const halfButton = document.querySelector('#half');
    const quarterButton = document.querySelector('#quarter');

    const start$ = Observable.fromEvent(startButton, 'click');
    const stop$ = Observable.fromEvent(stopButton, 'click');
    const reset$ = Observable.fromEvent(resetButton,'click');
    const half$ = Observable.fromEvent(halfButton,'click');
    const quarter$ = Observable.fromEvent(quarterButton,'click');

    const interval$ = Observable.interval(1000);
    const intervalThatStops$ = interval$.takeUntil(stop$);

    const starters$ = Observable.merge(
      start$.mapTo(1000),
      half$.mapTo(500),
      quarter$.mapTo(250)
    )

    const intervalActions = (time) => Observable.merge(
      Observable.interval(time)
        .takeUntil(stop$).mapTo(inc),
        reset$.mapTo(reset)
    );

    const inc = (acc) => ({ count: acc.count + 1 });
    const reset = (acc) => ({ count: 0});
    const incOrReset$ =  Observable.merge(intervalThatStops$.mapTo(inc),reset$.mapTo(reset));

    starters$
      .switchMap(intervalActions)
      .scan((acc,curr) => curr(acc))
      .subscribe( (x) => console.log(x) );
      

    const input$ = Observable.fromEvent(document.querySelector('#text'),'input')
      .map( $event => $event['target']['value'])
      .subscribe( (x) => console.log(x));
  }
}
