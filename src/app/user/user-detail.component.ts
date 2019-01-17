import {Component, Input, OnInit} from '@angular/core';
import {User} from './user.model';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-user-detail',
  template: `
    <div *ngIf="user">
    <h2>User details</h2>
    <ul class="list-group">
      <li class="list-group-item">Email: {{ user.useremial }}</li>
      <li class="list-group-item">Gender: {{ user.usergender }}</li>
      <li class="list-group-item">Phone: {{ user.userphone }}</li>
      <li class="list-group-item">Date of birth: {{ user.userbirth }}</li>
      <td>
        <button [routerLink]="['/user', user.usernumber]" class="btn btn-sample" style="margin-right: 10px">Edit</button>
        <button (click)="EnableUser(user)" [disabled]="isEnable(user)" class="btn btn-sample">Enable</button>
      </td>
    </ul>
  </div>
	`
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
