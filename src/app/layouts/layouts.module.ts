import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardlayoutComponent } from './dashboardlayout/dashboardlayout.component';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AdminRoutingModule } from './../admin/admin-routing.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    DashboardlayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    AdminRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  exports: [
    DashboardlayoutComponent
  ]
})
export class LayoutsModule { }
