import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ReglamentoComponent } from './pages/reglamento/reglamento.component';
import { PostulacionComponent } from './pages/postulacion/postulacion.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ReglamentoComponent
  },
  {
    path: ':codigodane/:password',
    component: ReglamentoComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'reglamento',
    component: ReglamentoComponent
  },
  {
    path: 'postulacion',
          component: PostulacionComponent,
          canActivate: [ LoginGuardGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NopagefoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

