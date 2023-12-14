import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { LogsPage } from '../logs/logs.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'logs',
    component: LogsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
