import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { AuthService } from "./auth.service";
import { AppComponent } from "../app.component";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  title = "auth";

  usuario: string;
  senha: string;
  lembrarUsuario: boolean;
  loading = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private app: AppComponent
  ) {
    app.semFundo = true;
    app.esconderLoading(true);
  }

  ngOnInit() {
    this.lembrarUsuario = JSON.parse(
      window.localStorage.getItem("lembrarUsuario")
    );

    if (this.lembrarUsuario) {
      this.usuario = JSON.parse(window.localStorage.getItem("usuarioLogin"));
    }
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }

  login(): void {
    this.snackBar.dismiss();

    if (this.validacao()) {
      this.loading = true;
      this.authService.efetuarLogin(this.usuario, this.senha).then(
        (res: any) => {
          if (res != null) {
            window.localStorage.setItem(
              "lembrarUsuario",
              JSON.stringify(this.lembrarUsuario)
            );
            window.localStorage.setItem(
              "usuarioLogin",
              JSON.stringify(this.usuario)
            );
            window.localStorage.setItem("token", JSON.stringify(res.token));
            window.localStorage.setItem(
              "colaborador",
              JSON.stringify(res.colaborador)
            );

            this.app.colaborador = res.colaborador;
            this.loading = false;
            this.irPara("");
          }
        },
        (resErro: any) => {
          console.log("Erro login", resErro);
          this.loading = false;
        }
      );
    }
  }

  validacao() {
    let resposta = false;
    const erros = [];

    if (this.usuario == null || this.usuario === "") {
      erros.push("O campo usuário é obrigatório!");
    }
    if (this.senha == null || this.senha === "") {
      erros.push("O campo senha é obrigatório!");
    }

    if (erros.length === 0) {
      resposta = true;
    } else {
      resposta = false;

      const msg = erros.join("\n");
      this.snackBar.open(msg, "OK", { panelClass: "quebra-linha" });
    }

    return resposta;
  }
}
