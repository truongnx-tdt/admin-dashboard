import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigWebComponent } from './config-web/config-web.component';

const routes: Routes = [
  {
    path: '', component: ConfigWebComponent, data: { breadcrumb: 'Config' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigWebRoutingModule { }
