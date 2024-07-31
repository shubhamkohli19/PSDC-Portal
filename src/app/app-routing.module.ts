import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/Frontend/homepage/homepage.component';
import { NARequestFormComponent } from './pages/Frontend/na-request-form/na-request-form.component';
import { LoginComponent } from './pages/login/login.component';
import { VerifyNaRequestComponent } from './pages/verification-pages/verify-na-request/verify-na-request.component';
import { DashboardComponent } from './pages/RolePanel/dashboard/dashboard.component';
import { NetworkAccessTableComponent } from './pages/RolePanel/network-access-table/network-access-table.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'na-request-form', component: NARequestFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-na-request', component: VerifyNaRequestComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'na-table', component: NetworkAccessTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }