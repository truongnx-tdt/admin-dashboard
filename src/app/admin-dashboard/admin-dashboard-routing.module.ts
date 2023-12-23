import { UserManageModule } from './user-manage/user-manage.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: TrangChuComponent, data: { breadcrumb: { label: "Trang chủ" } },
    children: [
      {
        path: 'dashboard', component: DashboardComponent,data: { breadcrumb: { label: "Thống kê" } },
      },
      {
        path: 'product', loadChildren: () => import('./product-share/product-share.module').then(m => m.ProductShareModule),
        data: {
          breadcrumb: { skip: true, alias: 'mentorAdd' }
        }
      },
      {
        path: 'order', loadChildren: () => import('./order-manager/order-manager.module').then(m => m.OrderManagerModule),
        data: {
          breadcrumb: { skip: true, alias: 'mentoarAdd' }
        }
      },
      {
        path: 'user', loadChildren: () => import('./user-manage/user-manage.module').then(m => m.UserManageModule),
        data: {
          breadcrumb: { skip: true, alias: 'mentoarsAdd' }
        }
      },
      {
        path: 'news', loadChildren: () => import('../news-manage/news-manage.module').then(m => m.NewsManageModule),
        data: {
          breadcrumb: { skip: true, alias: 'mentoarsAdd' }
        }
      },
      {
        path: 'config',
        loadChildren: () => import('../config-web/config-web.module').then(m => m.ConfigWebModule),
        data: {
          breadcrumb: { skip: true, alias: 'mentoarsAdd' }
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
