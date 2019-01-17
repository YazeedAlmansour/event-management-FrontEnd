import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from './event.service';
import {Events} from './event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events$: Events[];
  event$: Events[];
  currentEvent: Events;


  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
    this.getNotApprovedEvents();
  }

  getEvents() {
    this.eventService.getEvents().subscribe(
      eventList => {
        this.events$ = eventList;
      },
      err => console.log(err),
      () => console.log('Events list completed')
    );

  }

  getNotApprovedEvents() {
    this.eventService.getNotAprrovedEvents().subscribe(
      eventList => {
        this.event$ = eventList;
      },
      err => console.log(err),
      () => console.log('Events list completed')
    );

  }


  getEvent(event: Events) {
    this.eventService.getEvent(event.eventnumber);
  }
}
