import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home/home.component";
import { AuthComponent } from "./auth/auth.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "./core/api.service";
import { AuthService } from "./auth/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { ApiLdteamService } from "./core/api-ldteam.service";
import { ApiTrelloService } from "./core/api-trello.service";
import { ParametroUsuarioComponent } from "./configuracao-usuario/parametro-usuario/parametro-usuario.component";
import { PerfilUsuarioComponent } from "./configuracao-usuario/perfil-usuario/perfil-usuario.component";
import { ApiIntranetService } from "./core/api-intranet.service";
import { HomeService } from "./home/home.service";
import { ApiPrototipoPainelService } from "./core/api-prototipo-painel.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    ParametroUsuarioComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    ApiService,
    ApiTrelloService,
    AuthService,
    ApiLdteamService,
    ApiPrototipoPainelService,
    ApiIntranetService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
