import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponentComponent } from './components/login/login-component/login-component.component';
import { NavComponent } from './components/nav/nav.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';

const routes: Routes = [
{
  path:'login',
  component: LoginComponentComponent

},
  {
  path: "",
  component: NavComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: "home",
      component: HomeComponent
    },
    {
      path: "tecnicos",
      component: TecnicoListComponent
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
