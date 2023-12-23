import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigWebRoutingModule } from './config-web-routing.module';
import { ConfigWebComponent } from './config-web/config-web.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeng.module';


@NgModule({
  declarations: [
    ConfigWebComponent
  ],
  imports: [
    CommonModule,
    ConfigWebRoutingModule,
    NgxPaginationModule,
    AngularEditorModule,
    ReactiveFormsModule,
    PrimeNgModule
  ]
})
export class ConfigWebModule { }
