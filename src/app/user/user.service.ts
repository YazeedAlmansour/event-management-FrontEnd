import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';
import {catchError} from 'rxjs/operators';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const API_ARGS = {headers: headers};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('api/users');
  }

  addUser(a): Observable<any> {
    return this.http.post('api/user/add', JSON.stringify(a.value), API_ARGS);
  }

  getUser(usernumber: number): Observable<User> {
    return this.http.get<User>(`api/user/` + `${usernumber}`);
  }

  updateUser(usernumber: number, a): Observable<User> {
    return this.http.put<User>(`api/user/update/` + `${usernumber}`, JSON.stringify(a.value), API_ARGS);
  }

  deleteUser(usernumber: number): Observable<User> {
    return this.http.delete<User>(`api/user/delete/` + `${usernumber}`);
  }

  enableUser(usernumber: number): Observable<User> {
    return this.http.get<User>(`api/user/enable/` + `${usernumber}`);
  }
}

