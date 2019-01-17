import { Component, OnInit } from '@angular/core';
import {Ticket} from '../my-ticket/ticket.model';
import {EventService} from '../event/event.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {Events} from '../event/event.model';
import {ActivatedRoute} from '@angular/router';
import {Review} from '../my-ticket/review.model';

@Component({
  selector: 'app-event-ticket',
  templateUrl: './event-ticket.component.html',
  styleUrls: ['./event-ticket.component.css']
})
export class EventTicketComponent implements OnInit {

  tickets: Ticket[];
  review: Review;
  eventnumber: number;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.eventnumber = value.eventnumber;
    });

    this.getEventsTickets();
  }

  getEventsTickets() {
    this.eventService.getEventsTickets(this.eventnumber).subscribe(
      ticketList => {
        this.tickets = ticketList;
      },
      err => console.log(err),
      () => console.log('Tickets list completed')
    );
  }

  ConformTicket(ticketnumber: number) {
    this.eventService.conformTicket(ticketnumber).subscribe(
      data => {
      },
      err => console.log(err),
      () => location.reload(),
    );
  }

  isConformed(conform: boolean) {
    if (conform === true){
      return true;
    }
  }

  rated(rated: boolean) {
    if (rated === false) {
      return true;
    }
  }
}
