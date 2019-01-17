import { Component, OnInit } from '@angular/core';
import {Events} from '../event/event.model';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event/event.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {

  events$: Events[];
  orgnaizerid: number;

  constructor(private route: ActivatedRoute, private eventService: EventService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.orgnaizerid = this.auth.getUserNumber();
    this.getMyEvents();
  }

  getMyEvents() {
    this.eventService.getMyEvents(this.orgnaizerid).subscribe(
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
