import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainComponent } from './main.component';
import { RegisterComponent } from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UserDetailComponent } from './user/user-detail.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MyEventComponent } from './my-event/my-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventApprovedComponent } from './event-approved/event-approved.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import { EventTicketComponent } from './event-ticket/event-ticket.component';
import { EventNotapproveComponent } from './event-notapprove/event-notapprove.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ErrorInterceptor} from './authentication/error.interceptor';
import {BasicAuthInterceptor} from './authentication/basic-auth.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FooterComponent } from './footer/footer.component';
import { SearchEventPipe } from './search-event.pipe';
import { FilterCityPipe } from './filter-city.pipe';


@NgModule({
  declarations: [
    MainComponent,
    AppComponent,
    UserComponent,
    RegisterComponent,
    UserDetailComponent,
    EditComponent,
    LoginComponent,
    EventComponent,
    EventDetailComponent,
    CreateEventComponent,
    MyEventComponent,
    EditEventComponent,
    EventApprovedComponent,
    MyTicketComponent,
    EventTicketComponent,
    EventNotapproveComponent,
    MyProfileComponent,
    NavbarComponent,
    NavComponent,
    FooterComponent,
    SearchEventPipe,
    FilterCityPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [MainComponent]
})
export class AppModule { }
