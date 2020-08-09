import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RestoResolverService } from 'src/Services/Resto-resolver.service';
import { MenusResolverService } from 'src/Services/Menus-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    path: 'abracadabrasy',
    loadChildren: () => import('./abracadabrasy/abracadabrasy.module').then( m => m.AbracadabrasyPageModule)
  },

  {
    path: 'abracadabrasy/:id',
    resolve: {
      special: RestoResolverService
    }, 
    loadChildren: () => import('./abracadabrasy/abracadabrasy.module').then( m => m.AbracadabrasyPageModule)
  },

  {
    path: 'fastfood',
    loadChildren: () => import('./fastfood/fastfood.module').then( m => m.FastfoodPageModule)
  },

  {
    path: 'pizzeria',
    loadChildren: () => import('./pizzeria/pizzeria.module').then( m => m.PizzeriaPageModule)
  },

  {
    path: 'restaurants',
    loadChildren: () => import('./restaurants/restaurants.module').then( m => m.RestaurantsPageModule)
  },

  {
    path: 'menuburger',
    loadChildren: () => import('./menuburger/menuburger.module').then( m => m.MenuburgerPageModule)
  },

  {
    path: 'menuburger/:id',
    resolve: {
      Special: MenusResolverService
    },
    loadChildren: () => import('./menuburger/menuburger.module').then( m => m.MenuburgerPageModule)
  },

  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },

  {
    path: 'panier',
    loadChildren: () => import('./panier/panier.module').then( m => m.PanierPageModule)
  },

  {
    path: 'commandes',
    loadChildren: () => import('./commandes/commandes.module').then( m => m.CommandesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'apropos',
    loadChildren: () => import('./apropos/apropos.module').then( m => m.AproposPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
