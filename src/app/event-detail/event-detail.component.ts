import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user/user.model';
import {Events} from '../event/event.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event/event.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comments} from '../event/comment.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event$: Events;
  eventnumber: number;
  usernumber: number;
  myForm: FormGroup;
  comments: Comments[];
  private sub: Subscription;
  errBook;
  errComment;


  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private auth: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((param: any) => {
      this.eventnumber = param.eventnumber;
    });

    this.myForm = this.formBuilder.group({
      comment: ['', Validators.required, Validators.minLength(2), Validators.maxLength(255)]
    });

    this.eventService.getEvent(this.eventnumber).subscribe((value => {
      this.event$ = value;
    }));

    this.getComments();

    this.usernumber = this.auth.getUserNumber();
  }
  approveEvent(eventnumber: number) {
    this.eventService.approveEvent(eventnumber).subscribe(
      approve => {
      },
      err => console.log(err),
      () => this.router.navigate(['/approvedEvents'])
    );
  }

  rejectEvent(eventnumber: number) {
    this.eventService.rejectEvent(eventnumber).subscribe(
      approve => {
      },
      err => console.log(err),
      () => this.router.navigate(['/events'])
    );
  }

  book(eventnumber: number) {
    this.eventService.bookEvent(this.usernumber, eventnumber).subscribe(
      approve => {
      },
      err => this.errBook = err,
      () => this.router.navigate(['/myticket'])
    );
  }

  getComments() {
    this.eventService.getComments(this.eventnumber).subscribe(
      commentList => {
        this.comments = commentList;
      },
      err => console.log(err),
      () => console.log('Comments list completed')
    );
  }

  addComment() {
    this.eventService.addComment(this.usernumber, this.eventnumber, this.myForm).subscribe(
      data => {
      },
      err => this.errComment = err,
      () => location.reload(),

  );
  }

  isApprove() {
    if (this.event$.eventapproval === true) {
      return true;
    }
  }

  isAdmin() {
    if (this.auth.getRole() === 'ROLE_ADMIN') {
      return true;
    }
  }
  isOrg() {
    if (this.auth.getRole() === 'ROLE_ORGANIZER') {
      return true;
    }
  }
  isUser() {
    if (this.auth.getRole() === 'ROLE_USER') {
      return true;
    }
  }
  bookedTickets() {
    if (this.event$.counter < this.event$.eventcapacity) {
      return true;
    }
  }

}
