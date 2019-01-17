import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from '../user/user.model';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  err;
  user$: Observable<User>;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      userid: (['', Validators.compose([Validators.required,
        Validators.pattern(/[^\s]+/), Validators.pattern(/[1-2]{1}[0-9]{9}/),
        Validators.maxLength(10), Validators.minLength(10)])]),
      useremial: (['', Validators.compose([Validators.required, Validators.pattern(/[^\s]+/),
        Validators.pattern(/[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/)]),
      ]),
      userfname: ['', Validators.compose([Validators.required, Validators.maxLength(10),
        Validators.minLength(2), Validators.pattern(/[a-zA-Z]/)])],
      userlname: ['', Validators.compose([Validators.required, Validators.maxLength(15),
        Validators.minLength(2), Validators.pattern(/[a-zA-Z]/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8),
        Validators.maxLength(15), Validators.pattern(/[^\s]+/),
        Validators.pattern(/^[A-Za-z0-9]{8,15}/)])],
      userphone: (['', Validators.compose([Validators.required,
        Validators.pattern(/[^\s]+/), Validators.pattern(/[5]{1}[0-9]{8}/),
        Validators.maxLength(9), Validators.minLength(9)])]),
      usergender: [``, Validators.required],
      userbirth: [``, Validators.required],
      role: [``, Validators.required]
    });
  }


  onSubmit() {
    this.userService.addUser(this.myForm).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, err => this.err = err, () => this.router.navigate(['/login']));
  }

}
