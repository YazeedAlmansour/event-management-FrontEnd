import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user/user.model';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  myForm: FormGroup;
  usernumber: number;
  user$: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private route: ActivatedRoute, private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.usernumber = value.usernumber;
    });

    if (this.usernumber != this.auth.getUserNumber()){
      this.router.navigate(['/myprofile']);
      alert('This is NOT your profile');
    }

    this.userService.getUser(this.usernumber).subscribe((value0 => {
      this.user$ = value0;
      this.myForm.patchValue(this.user$ as any);
    }));


    this.myForm = this.formBuilder.group({
      userid: ['', Validators.required],
      useremial: ['', Validators.compose([Validators.required, Validators.email])],
      userfname: ['', Validators.required],
      userlname: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z]/)])],
      userphone: ``,
      usergender: ``,
      userbirth: ``,
      role:  ``
    });
  }

  onSubmit() {
    this.userService.updateUser(this.usernumber, this.myForm).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => {});
  }

  deleteUser() {
    this.userService.deleteUser(this.usernumber).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error),
      () => {    this.auth.logout(), this.router.navigate(['/login']);
      });
  }



}
