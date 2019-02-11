import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Events} from '../event/event.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event/event.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  myForm: FormGroup;
  eventnumber: number;
  event$: Events;

  constructor(private formBuilder: FormBuilder, private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.eventnumber = value.eventnumber;
    });

    this.eventService.getEvent(this.eventnumber).subscribe((value0 => {
      this.event$ = value0;
      if (this.event$.orgid != this.auth.getUserNumber()) {
        this.router.navigate(['/myevent']);
        alert('This is NOT your event');
      }
      this.myForm.patchValue(this.event$ as any);
      console.log(this.event$.orgid);
    }));
    this.myForm = this.formBuilder.group({
      eventname: ['', Validators.required],
      eventlocation: ['', Validators.required],
      eventdate: ['', Validators.required],
      eventcapacity: ['', Validators.compose([Validators.required, Validators.max(3)])],
      eventtime: ['', Validators.required]

    });
  }

  onSubmit() {
    this.eventService.updateEvent(this.eventnumber, this.myForm).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => {this.router.navigate(['/myevent']); });
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.eventnumber).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error),
      () => { this.router.navigate(['/myevent']);
      });
  }

}
