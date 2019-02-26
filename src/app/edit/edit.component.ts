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
  resetForm: FormGroup;
  usernumber: number;
  user$: User;
  err;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private route: ActivatedRoute, private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.usernumber = value.usernumber;
    });

    if (this.usernumber != this.auth.getUserNumber()) {
      this.router.navigate(['/myprofile']);
      alert('This is NOT your profile');
    }

    this.userService.getUpdateUser(this.usernumber).subscribe((value0 => {
      this.user$ = value0;
      this.myForm.patchValue(this.user$ as any);
    }));


    this.myForm = this.formBuilder.group({
      userid: ['', Validators.required],
      useremial: ['', Validators.compose([Validators.required, Validators.email])],
      userfname: ['', Validators.required],
      userlname: ['', Validators.required],
      userphone: ``,
      usergender: ``,
      userbirth: ``,
      role:  ``
    });

    this.resetForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.userService.updateUser(this.usernumber, this.myForm).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => this.router.navigate(['/myprofile']));
  }

  resetPassword() {
    this.userService.resetPassword(this.usernumber, this.f.oldPassword.value, this.f.newPassword.value).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => this.err = error, () => this.router.navigate(['/login']));
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
