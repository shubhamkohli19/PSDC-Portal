import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectServiceComponent } from './components/select-service/select-service.component';
import { HomepageComponent } from './pages/Frontend/homepage/homepage.component';
import { NARequestFormComponent } from './pages/Frontend/na-request-form/na-request-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DnsRequestComponent } from './pages/Frontend/dns-request/dns-request.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { EmailService } from './services/email.service';
import { LoginService } from './services/login.service';
import { VerifyNaRequestComponent } from './pages/verification-pages/verify-na-request/verify-na-request.component';
import { DashboardComponent } from './pages/RolePanel/dashboard/dashboard.component';
import { NetworkAccessTableComponent } from './pages/RolePanel/network-access-table/network-access-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SelectServiceComponent,
    HomepageComponent,
    NARequestFormComponent,
    LoginComponent,
    DnsRequestComponent,
    VerifyNaRequestComponent,
    DashboardComponent,
    NetworkAccessTableComponent,
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
