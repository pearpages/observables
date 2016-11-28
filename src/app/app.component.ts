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

    const start$ = Observable.fromEvent(startButton, 'click');
    const stop$ = Observable.fromEvent(stopButton, 'click');
    const interval$ = Observable.interval(1000);
    const intervalThatStops$ = interval$.takeUntil(stop$);
    const startIntervalThatStopsAndRestarts$ = start$.switchMapTo(intervalThatStops$)
      .scan( (acc) => {
        return { count: acc.count + 1 }
      }, { count: 0 })
      .subscribe((x) => console.log(x));
      
  }
}
