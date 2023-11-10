import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: TrangChuComponent, data: { breadcrumb: 'Trang chủ' },
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'product', component: ProductComponent, data: { breadcrumb: 'Sản phẩm' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
