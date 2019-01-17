import { Component, OnInit } from '@angular/core';
import {User} from '../user/user.model';
import {AuthenticationService} from '../authentication/authentication.service';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  usernumber: number;
  user: User;

  constructor(private auth: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.usernumber = this.auth.getUserNumber();
    this.getMyProfile();

  }

  getMyProfile() {
    this.userService.getUser(this.usernumber).subscribe(
      userData => {
        this.user = userData;
      },
      err => console.log(err),
      () => console.log('Profile Data completed')
    );
  }

}
