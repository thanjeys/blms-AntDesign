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

const antdModule= [
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzMessageModule,
  NzSelectModule
]

@NgModule({
  declarations: [
    DashboardComponent,
    BasicformComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutsModule,
    TemplateModule,
    ...antdModule
  ]
})
export class AdminModule { }
