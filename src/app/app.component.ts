import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// import Calendar from '../tui-calendar'; /* ES6 */
// import "../tui-calendar/dist/tui-calendar.css";

var Calendar = require('../tui-calendar'); /* CommonJS */
require("../tui-calendar/dist/tui-calendar.css");

// If you use the default popups, use this.
// import '../assets/tui-date-picker/dist/tui-date-picker.css';
// import '../assets/tui-time-picker/dist/tui-time-picker.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-tui-calendar';

  @ViewChild('calendar') calendarContainer!: ElementRef;

  ngAfterViewInit() {
    const cal = new Calendar(this.calendarContainer.nativeElement);
  }
}
