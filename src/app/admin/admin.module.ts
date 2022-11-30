import { NzFormModule } from 'ng-zorro-antd/form';
import { TemplateModule } from './../layouts/template.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BasicformComponent } from './basicform/basicform.component';
import { EmployeeComponent } from './master/employee/employee.component';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { AgGridModule } from 'ag-grid-angular';
import { NzTableModule } from 'ng-zorro-antd/table';

import { CreateEmployeeComponent } from './master/employee/create-employee/create-employee.component';
import { EmployeeListComponent } from './master/employee/employee-list/employee-list.component';
import { EmployesTableComponent } from './master/employee/employes-table/employes-table.component';

const antdModule= [
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzMessageModule,
  NzSelectModule,
  NzSwitchModule,
  NzDrawerModule,
  NzTableModule
]

@NgModule({
  declarations: [
    DashboardComponent,
    BasicformComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    EmployeeListComponent,
    EmployesTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutsModule,
    TemplateModule,
    AgGridModule,
    ...antdModule
  ]
})
export class AdminModule { }
