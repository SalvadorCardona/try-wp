import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { ViewsComponent } from './views/views.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent
  },
];

@NgModule({
  declarations: [ViewsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PostModule { }
