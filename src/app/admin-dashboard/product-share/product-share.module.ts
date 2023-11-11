import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductShareRoutingModule } from './product-share-routing.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from 'src/app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductAddComponent,
    ProductUpdateComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductShareRoutingModule,
    MaterialModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ProductShareModule { }
