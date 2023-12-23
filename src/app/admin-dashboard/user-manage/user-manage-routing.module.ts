import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';

const routes: Routes = [
  {
    path: '', component: UserCheckoutComponent, data: { breadcrumb: 'Quản lý người dùng' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManageRoutingModule { }
