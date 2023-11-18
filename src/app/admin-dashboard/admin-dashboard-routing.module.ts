import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { ProductComponent } from './product-share/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: TrangChuComponent, data: { breadcrumb: { label: "Trang chủ" } },
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'product', loadChildren: () => import('./product-share/product-share.module').then(m => m.ProductShareModule),
        data: {
          breadcrumb: { skip: true, alias: 'mentorAdd' }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
