import { Component, OnInit } from '@angular/core';
import {Events} from '../event/event.model';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event/event.service';

@Component({
  selector: 'app-event-approved',
  templateUrl: './event-approved.component.html',
  styleUrls: ['./event-approved.component.css'],
})
export class EventApprovedComponent implements OnInit {

  events$: Events[];
  searchTerm: string;
  searchCity: string;

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {this.getEvents(); }

  getEvents() {
    this.eventService.getAprrovedEvents().subscribe(
      eventList => {
        this.events$ = eventList;
      },
      err => console.log(err),
      () => console.log('Events list completed')
    );

  }

  getEvent(event: Events) {
    this.eventService.getEvent(event.eventnumber);
  }

}
