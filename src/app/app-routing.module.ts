import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';

const routes : Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'register', component: RegisterComponent },
  {
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module')
    .then(m => m.IngresoEgresoModule)
  },
   {path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ] ,
  exports: [
     RouterModule
  ]
})
export class AppRoutingModule { }
