import { Component, OnInit } from '@angular/core';
import {EventService} from '../event/event.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {UserService} from '../user/user.service';
import {Ticket} from './ticket.model';
import {Review} from './review.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrls: ['./my-ticket.component.css']
})
export class MyTicketComponent implements OnInit {

  tickets: Ticket[];
  tickets$: Ticket[];
  reviews: Review;
  myForm: FormGroup;
  userid: number;

  constructor(private eventService: EventService, private auth: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userid = this.auth.getUserNumber();
    this.getMyTickets();
    this.getAttendedTickets();
    this.myForm = this.formBuilder.group({
      reviewrate: ['', Validators.required],
      reviewcommet: ['', Validators.required]
    });

  }

  getMyTickets() {
    this.eventService.getMyTickets(this.userid).subscribe(
      ticketList => {
        this.tickets = ticketList;
      },
      err => console.log(err),
      () => console.log('Tickets list completed')
    );
  }

  getAttendedTickets() {
    this.eventService.getAttendedTickets(this.userid).subscribe(
      ticketList => {
        this.tickets$ = ticketList;
      },
      err => console.log(err),
      () => console.log('Attended Tickets list completed')
    );
  }

  getReview(ticketnumber: number) {
    this.eventService.getReview(ticketnumber).subscribe(
      reviewList => {
        this.reviews = reviewList;
      },
      err => console.log(err),
      () => console.log('Review completed')
    );
  }

  addReview(ticketnumber: number) {
    this.eventService.addReview(ticketnumber, this.myForm).subscribe(
      data => {
      },
      err => console.log(err),
      () => location.reload()
    );
  }

  rated(rated: boolean) {
    if (rated === false) {
      return true;
    }
  }

  deleteTicket(ticketnumber: number) {
    this.eventService.deleteTicket(ticketnumber).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => {
      location.reload();
    });
  }

}
