import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { LoginComponent } from './ui/login/login.component';
import { UserComponent } from './ui/user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticatedGuard } from './auth/AuthenticatedGuard';

const routes: Routes = [
  {path:"home",component:HomeComponent, canActivate: [AuthGuard]},
  {path:"login",component:LoginComponent, canActivate: [AuthenticatedGuard]},
  {path:"users",component:UserComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
