import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from "./modules/home/home.module";
import { PostModule } from "@app/modules/post/post.module";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/post/post.module').then(mod => mod.PostModule),
    data: { preload: false }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
