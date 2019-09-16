import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequerenteComponent } from './requerente/requerente.component';
import { HomeComponent } from './home/home.component';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';

@NgModule({
  declarations: [
    AppComponent,
    RequerenteComponent,
    HomeComponent,
    AutenticacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
