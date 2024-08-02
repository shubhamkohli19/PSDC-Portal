import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/Frontend/homepage/homepage.component';
import { NARequestFormComponent } from './pages/Frontend/na-request-form/na-request-form.component';
import { LoginComponent } from './pages/login/login.component';
import { VerifyNaRequestComponent } from './pages/verification-pages/verify-na-request/verify-na-request.component';
import { DashboardComponent } from './pages/RolePanel/dashboard/dashboard.component';
import { NetworkAccessTableComponent } from './pages/RolePanel/network-access-table/network-access-table.component';
import { RoleDashboardComponent } from './pages/RolePanel/role-dashboard/role-dashboard.component';
import { AssignNetworkTaskComponent } from './pages/RolePanel/assign-network-task/assign-network-task.component';
import { EditEngineerComponent } from './pages/RolePanel/edit-engineer/edit-engineer.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'na-request-form', component: NARequestFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify-na-request', component: VerifyNaRequestComponent },
  { path: 'adminDashboard', component: DashboardComponent },
  { path: 'na-table', component: NetworkAccessTableComponent },
  { path: 'roleDashboard', component: RoleDashboardComponent},
  { path: 'assignNetworkTask', component: AssignNetworkTaskComponent},
  { path: 'editEngineer', component: EditEngineerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }