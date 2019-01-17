import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

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

  isLogged() {
    if(this.auth.isLogged()) {
    return true;
    }
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
  logout() {
    this.auth.logout();
  }
}
