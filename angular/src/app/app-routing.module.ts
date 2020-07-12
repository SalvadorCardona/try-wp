import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/post/post.module').then(mod => mod.PostModule),
    data: { preload: false }
  },
  {
    path: '**',
    loadChildren: () => import('./modules/post/post.module').then(mod => mod.PostModule),
    data: { preload: false }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
