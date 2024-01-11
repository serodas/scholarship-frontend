import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PostulacionComponent } from './pages/postulacion/postulacion.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ReglamentoComponent } from './pages/reglamento/reglamento.component';
import { BachillerService } from './services/bachiller.service';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    DashboardComponent,
    PostulacionComponent,
    ReglamentoComponent,
    HeaderComponent,
    FooterComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [
    BachillerService,
    LoginGuardGuard
  ],
  bootstrap: [AppComponent],
  exports: [
    FilterPipe,
  ],
})
export class AppModule { }
