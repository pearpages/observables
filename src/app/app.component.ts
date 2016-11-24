import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  ngOnInit() {
    const startButton = document.querySelector('#start');
    const stopButton = document.querySelector('#stop');
    
    const start$ = Observable.fromEvent(startButton, 'click')
    const interval$ = Observable.interval(1000);
    const stop$ = Observable.fromEvent(stopButton,'click');

    const intervalThatStops$ = interval$.takeUntil(stop$);

    let observable = start$
      .switchMap((event) => interval$);

    let subscription0 = interval$
      .takeUntil(stop$)
      .subscribe( (x) => console.log('subscription 0: '+x))
    let subscription1 = observable
      .takeUntil(stop$)
      .subscribe( (x) => console.log('subscription 1: '+x));
    let subscription2 = observable
      .takeUntil(stop$)
      .subscribe( (x) => console.log('subscription 2: '+x));
    let subscription3 = observable
      .takeUntil(stop$)
      .subscribe( (x) => console.log('subscription 3: '+x));


    let subscription4 = intervalThatStops$.subscribe( (x) => console.log('subscription 4: '+x));

    let subscription5 = start$.switchMapTo(intervalThatStops$).scan( (accumulator) => {
      return {count: accumulator.count + 1} },
        {count: 0}
      ).subscribe( (x) => console.log(x));
  }
}
