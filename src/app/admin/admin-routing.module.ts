import { BasicformComponent } from './basicform/basicform.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardlayoutComponent } from '../layouts/dashboardlayout/dashboardlayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './master/employee/employee.component';

const routes: Routes = [
  { path: '', component: DashboardlayoutComponent,
    children: [
    { path: '', component: DashboardComponent },
    { path: 'basicform', component: BasicformComponent},
    { path: 'employee', component: EmployeeComponent}
  ]
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
