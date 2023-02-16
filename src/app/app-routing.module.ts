import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  //login path
  {
    path: '', component: LoginComponent
  },
  //register path
  {
    path: 'register', component: RegisterComponent
  },
  //dachboard path
  {
    path: 'dashboard', component: DashboardComponent

  },
  //transactionsComponent
  {
    path: 'transactions', component: TransactionsComponent
  },
  //page-not-found component
  {
    path:'**',component:PageNotFoundComponent 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
