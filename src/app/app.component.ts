import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Calendar, { ICalendarInfo, IOptions, ISchedule } from 'tao-calendar2'; /* ES6 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-tui-calendar';

  @ViewChild('calendar')
  calendarContainer!: ElementRef;

  start = new Date();
  end = new Date(new Date().setMinutes(this.start.getMinutes() + 30));
  schedules: ISchedule[] = [
    {
      calendarId: "1",
      category: "task1",
      isVisible: true,
      title: "Study1",
      id: "1",
      body: "Test",
      start: this.start,
      end: this.end
    },
    {
      calendarId: "2",
      category: "task2",
      isVisible: true,
      title: "Meeting",
      id: "2",
      body: "Description",
      start: new Date(new Date().setHours(this.start.getHours() + 1)),
      end: new Date(new Date().setHours(this.start.getHours() + 2))
    },
  ];

  calendars: ICalendarInfo[] = [
    {
      id: "1",
      name: "My Calendar",
      color: "#ffffff",
      bgColor: "#9e5fff",
      dragBgColor: "#9e5fff",
      borderColor: "#9e5fff"
    },
    {
      id: "2",
      name: "Company",
      color: "#ffffff",
      bgColor: "#00a9ff",
      dragBgColor: "#00a9ff",
      borderColor: "#00a9ff"
    }
  ];

  opton: IOptions = {
    defaultView: "week",
    calendars: this.calendars,
    month: {
      workweek: false
    },
    week: {},
    taskView: ['task1', 'task2', 'task3'],
    scheduleView: false,
    useCreationPopup: true,
    useDetailPopup: true,
    usageStatistics: true,
    taskList: ['task1', 'task2', 'task3'],
    template: {
      milestone: function (model) {
        return (
          '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' +
          model.bgColor +
          '">' +
          model.title +
          "</span>"
        );
      },
      // allday: function (schedule) {
      //   return getTimeTemplate(schedule, true);
      // },
      customTask: function (schedule: ISchedule) {
        return `${schedule.title}` + 'xxx';
        // return getTimeTemplate(schedule, true);
      }
      // customTaskTitle: function (taskName) {
      //   return `${taskName} ` + 'yyy';
      // },
      // time: function (schedule) {
      //   return getTimeTemplate(schedule, false);
      // }
    }
  };

  ngAfterViewInit() {

    console.log(this.schedules);

    const cal = new Calendar(this.calendarContainer.nativeElement, this.opton);
    cal.clear();
    cal.createSchedules(this.schedules);

    cal.on({
      clickMore: function (e) {
        console.log("clickMore", e);
      },
      clickSchedule: function (e) {
        console.log("clickSchedule", e);
      },
      clickDayname: function (date) {
        console.log("clickDayname", date);
      },
      beforeCreateSchedule: function (e) {
        console.log("beforeCreateSchedule", e);
        // saveNewSchedule(e);
      },
      beforeUpdateSchedule: function (e) {
        const { schedule, changes } = e;

        console.log("beforeUpdateSchedule", e);

        cal.updateSchedule(schedule.id!, schedule.calendarId!, changes!);
        // refreshScheduleVisibility();
      },
      beforeDeleteSchedule: function (e) {
        console.log("beforeDeleteSchedule", e);
        cal.deleteSchedule(e.schedule.id!, e.schedule.calendarId!);
      },
      afterRenderSchedule: function (e) {
        const schedule = e.schedule;
        // var element = cal.getElement(schedule.id, schedule.calendarId);
        // console.log('afterRenderSchedule', element);
      },
      clickTimezonesCollapseBtn: function (timezonesCollapsed) {
        console.log("timezonesCollapsed", timezonesCollapsed);

        if (timezonesCollapsed) {
          cal.setTheme({
            "week.daygridLeft.width": "77px",
            "week.timegridLeft.width": "77px"
          });
        } else {
          cal.setTheme({
            "week.daygridLeft.width": "60px",
            "week.timegridLeft.width": "60px"
          });
        }

        return true;
      }
    });
  }
}
