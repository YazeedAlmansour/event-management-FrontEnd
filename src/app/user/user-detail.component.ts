import {Component, Input, OnInit} from '@angular/core';
import {User} from './user.model';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: 'user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  usernumber: number;
  // currentUser$: Observable<User>;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((param: any) => {
      this.usernumber = param.usernumber;
    });

  }

  EnableUser(user: User) {
    this.userService.enableUser(user.usernumber).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => {
      location.reload();
    });
  }

  isEnable(user: User) {
    if (user.enabled === true) {
      return true;
    }
  }
}
