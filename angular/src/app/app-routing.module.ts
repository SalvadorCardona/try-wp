import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/page/page.module').then(mod => mod.PageModule),
    data: { preload: false }
  },
  {
    path: 'product/:slug',
    loadChildren: () => import('./modules/page/page.module').then(mod => mod.PageModule),
    data: { preload: false }
  },
  {
    path: '**',
    loadChildren: () => import('./modules/page/page.module').then(mod => mod.PageModule),
    data: { preload: false }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
