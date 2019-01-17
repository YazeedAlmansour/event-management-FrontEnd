import { Component, OnInit } from '@angular/core';
import {User} from './user.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  users$: User[];
  currentUser: User;


  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      userList => {
        this.users$ = userList;
      },
      err => console.log(err),
      () => console.log('users list completed')
    );

  }

  getUser(user) {
    this.currentUser = user;
  }

}
