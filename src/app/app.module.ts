import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectServiceComponent } from './components/select-service/select-service.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NARequestFormComponent } from './pages/na-request-form/na-request-form.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DnsRequestComponent } from './pages/dns-request/dns-request.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SelectServiceComponent,
    HomepageComponent,
    NARequestFormComponent,
    LoginComponent,
    DnsRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
