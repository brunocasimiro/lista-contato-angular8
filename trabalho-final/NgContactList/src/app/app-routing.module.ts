import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotfoundPage } from './pages/notfound/notfound.page';
import { MenuPage } from './pages/menu/menu.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { 
    path: '', 
    component: MenuPage,
    canActivate: [AuthGuard],
    children: [
      { 
        path: '', 
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule) 
      },
      { 
        path: 'reset-password', 
        loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule) 
      },
      { 
        path: 'contact', 
        loadChildren: () => import('./pages/contact-editor/contact-editor.module').then( m => m.ContactEditorPageModule)
      },
      { 
        path: 'contact/:contact', 
        loadChildren: () => import('./pages/contact-editor/contact-editor.module').then( m => m.ContactEditorPageModule) 
      }
    ]
  },
  { path: '**', component: NotfoundPage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, 
      { preloadingStrategy: PreloadAllModules }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
