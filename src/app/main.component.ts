import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from './authentication/authentication.service';
import {User} from './user/user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main',
  template: `
    <div class="container-fluid" style="text-align: center">
      <div style="text-align: left">
      <router-outlet></router-outlet>
      </div>
      <hr>
      <div class="text-sm-center" style="text-align: center"> © 2018 Yazeed Al-Mansour All Rights Reserved</div>
    </div>
  `
})
export class MainComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) {}

  admin;
  org;
  usr;

  ngOnInit() {
    this.getRole();
  if (this.router.navigated) {
    this.getRole();
  }
  }

  getRole() {
    let admin = false;
    let org = false;
    let usr = false;
    if (this.auth.getRole()) {
      if (this.auth.getRole().includes('ROLE_ADMIN') ) {
        admin = true;
      } else if (this.auth.getRole().includes('ROLE_ORGANIZER')) {
        org = true;
      } else if (this.auth.getRole().includes('ROLE_USER')) {
        usr = true;
      }
    }
    this.admin = admin;
    this.org = org;
    this.usr = usr;
  }
  // isAdmin() {
  //   if (this.auth.getRole() === 'ROLE_ADMIN') {
  //     return true;
  //   }
  // }
  // isOrg() {
  //   if (this.auth.getRole() === 'ROLE_ORGANIZER') {
  //     return true;
  //   }
  // }
  // isUser() {
  //   if (this.auth.getRole() === 'ROLE_USER') {
  //     return true;
  //   }
  // }
  //

}
