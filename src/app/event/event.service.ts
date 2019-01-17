import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Events} from './event.model';
import {Ticket} from '../my-ticket/ticket.model';
import {Comments} from './comment.model';
import {Review} from '../my-ticket/review.model';


const headers = new HttpHeaders().set('Content-Type', 'application/json');
const API_ARGS = {headers: headers};


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Events[]> {
    return this.http.get<Events[]>('api/events');
  }

  getAprrovedEvents(): Observable<Events[]> {
    return this.http.get<Events[]>('api/events/approved');
  }

  getNotAprrovedEvents(): Observable<Events[]> {
    return this.http.get<Events[]>('api/events/notapproved');
  }

  getMyEvents(orgnaizerid: number): Observable<Events[]> {
    return this.http.get<Events[]>(`api/myevents/` + `${orgnaizerid}`);
  }

  addEvent(orgnaizerid: number, a): Observable<Events> {
    return this.http.post<Events>(`api/event/add/` + `${orgnaizerid}`, JSON.stringify(a.value), API_ARGS);
  }

  getEvent(eventnumber: number): Observable<Events> {
    return this.http.get<Events>(`api/event/` + `${eventnumber}`);
  }

  updateEvent(eventnumber: number, a): Observable<Events> {
    return this.http.put<Events>(`api/event/update/` + `${eventnumber}`, JSON.stringify(a.value), API_ARGS);
  }

  deleteEvent(eventnumber: number): Observable<Events> {
    return this.http.get<Events>(`api/event/delete/` + `${eventnumber}`);
  }

  approveEvent(eventnumber: number): Observable<Events> {
    return this.http.get<Events>(`api/event/approve/` + `${eventnumber}`);
  }

  rejectEvent(eventnumber: number): Observable<Events> {
    return this.http.get<Events>(`api/event/reject/` + `${eventnumber}`);
  }

  bookEvent( usernumber: number , eventnumber: number): Observable<Events> {
    return this.http.get<Events>(`api/book/` + `${usernumber}` + ` / ` + `${eventnumber}`);
  }

  getMyTickets(userid: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`api/mytickets/` + `${userid}`);
  }

  getAttendedTickets(userid: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`api/mytickets/attended/` + `${userid}`);
  }

  getEventsTickets(eventnumber: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`api/events/tickets/` + `${eventnumber}`);
  }

  deleteTicket(ticketnumber: number): Observable<Events> {
    return this.http.get<Events>(`api/ticket/delete/` + `${ticketnumber}`);
  }


  conformTicket(ticketnumber: number): Observable<Ticket> {
    return this.http.get<Ticket>(`api/ticket/conform/` + `${ticketnumber}`);
  }


  getComments(eventnumber: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`api/event/comment/` + `${eventnumber}`);
  }

  addComment(usernumber: number , eventnumber: number, a): Observable<Comments> {
    return this.http.post<Comments>(`api/comment/` + `${usernumber}` + ` / ` + `${eventnumber}`, JSON.stringify(a.value), API_ARGS);
  }

  addReview(ticketnumber: number, a): Observable<Review> {
    return this.http.post<Review>(`api/review/` + `${ticketnumber}` , JSON.stringify(a.value), API_ARGS);
  }

  getReview(ticketnumber: number): Observable<Review> {
    return this.http.get<Review>(`api/review/` + `${ticketnumber}`);
  }
}
