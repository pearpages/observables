import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private interval$;
  private startSubscription;

  makeLogger (index: number) {
    return ((x) => console.log('subscription '+index+':'+x))
  }

  start() {
    if(!this.startSubscription) {
      this.startSubscription = this.interval$
        .subscribe( (x) => console.log(x));
    }
  } 

  ngOnInit() {
    this.interval$ = Observable.interval(1000);

    const startButton = document.querySelector('#start');

    const start$ = Observable.fromEvent(startButton,'click');
    const interval$ = Observable.interval(1000);
    const startInterval$ = start$.switchMapTo(interval$);

    const subs1 = startInterval$
      .subscribe( (x) => console.log(x) );
  }
}
