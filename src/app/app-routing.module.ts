import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NARequestFormComponent } from './pages/na-request-form/na-request-form.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent},
  { path: '', redirectTo: 'homepage', pathMatch: 'full'},
  { path: 'na-request-form', component: NARequestFormComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }