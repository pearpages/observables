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
      
  }
}
