// Modulos de angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Componentes
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserSesionGuard } from './guards/user-sesion.guard';

const routes: Routes = [

  { path: '', redirectTo: '/signIn', pathMatch: 'full' },
  { path: 'signIn', component: SignInComponent, canActivate: [UserSesionGuard]},
  { path: 'signUp', component: SignUpComponent, canActivate: [UserSesionGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserSesionGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
