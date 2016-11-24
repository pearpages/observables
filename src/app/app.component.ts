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
    Observable.fromEvent(startButton,'click')
      .subscribe((event) => console.log(event));

  }
}
