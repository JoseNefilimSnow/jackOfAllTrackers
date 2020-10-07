import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'gameform',
    loadChildren: () => import('./form-game/form-game.module').then(m => m.FormGamePageModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then(m => m.GamePageModule)
  },
  {
    path: 'bannerform',
    loadChildren: () => import('./form-banner/form-banner.module').then(m => m.FormBannerPageModule)
  },
  {
    path: 'banner',
    loadChildren: () => import('./banner/banner.module').then(m => m.BannerPageModule)
  },
  {
    path: 'rollform',
    loadChildren: () => import('./form-roll/form-roll.module').then(m => m.FormRollPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
