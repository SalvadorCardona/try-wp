import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent
  },
];

@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductCategoryModule { }
