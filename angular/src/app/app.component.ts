import {OnInit, Component, Input, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'front';

  public constructor() {
  }
  ngOnInit(): void {

  }
}
