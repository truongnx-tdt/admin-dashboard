import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductShareRoutingModule } from './product-share-routing.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductUpdateComponent } from './product-update/product-update.component';


@NgModule({
  declarations: [
    ProductAddComponent,
    ProductUpdateComponent
  ],
  imports: [
    CommonModule,
    ProductShareRoutingModule
  ], exports: [
    ProductAddComponent,
    ProductUpdateComponent
  ]
})
export class ProductShareModule { }
