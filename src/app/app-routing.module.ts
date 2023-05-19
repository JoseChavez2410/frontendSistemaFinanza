import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './guards/auth.guard';
import { CheckeloginGuard } from './guards/checkelogin.guard';

import { LoginComponent } from './components/login/login.component';
import { FinanzaComponent } from './components/finanza/finanza.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {path: '', redirectTo: 'finanza', pathMatch:'full'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CheckeloginGuard]
  },
  {
    path: 'registro',
    component: RegistroComponent,
    canActivate: [CheckeloginGuard]
  },
  {
    path: 'finanza',
    component: FinanzaComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
