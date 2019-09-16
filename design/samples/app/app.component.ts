import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import {
  MatSnackBar,
  MatPaginator
} from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "app";
  menuAberto = false;
  semFundo = false;
  paginasSemFundo = ["/"];
  colaborador: any = {};
  public loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.semFundo = false;
      }

      if (event instanceof NavigationEnd) {
        this.paginasSemFundo.forEach(url => {
          if (event.urlAfterRedirects === url) {
            this.semFundo = true;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.verificarToken();
  }

  exibirLoading() {
    setTimeout(() => {
      this.loading = true;
    }, 100);
  }

  esconderLoading(esconderAlert?: boolean) {
    if (esconderAlert) {
      this.snackbar.dismiss();
    }

    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  eventos(evento) {
    console.log(evento);
  }

  abrirMenu(valor) {
    this.menuAberto = valor;
  }

  verificarToken() {
    const token = window.localStorage.getItem("token");
    const cola = window.localStorage.getItem("colaborador");

    if (token === null || token === "" || cola === null || cola === "") {
      this.router.navigate(["/login"]);
    } else {
      this.colaborador = JSON.parse(window.localStorage.getItem("colaborador"));
      this.authService.verificarToken().then(
        (res: any) => {
          if (res != null) {
            window.localStorage.setItem("token", JSON.stringify(res.token));
            window.localStorage.setItem("usuario", JSON.stringify(res));
          }
        },
        (resErro: any) => {
          console.log("Erro verificar login", resErro);
          this.router.navigate(["/login"]);
        }
      );
    }
  }

  apagarToken() {
    window.localStorage.removeItem("token");
    this.irPara("login");
  }

  verificaLogin() {
    return (
      window.localStorage.getItem("token") != null &&
      window.localStorage.getItem("token") !== "" &&
      this.router.url !== "/login"
    );
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }

  traduzirPaginator(paginator: MatPaginator) {
    paginator._intl.itemsPerPageLabel = "Itens por página";
    paginator._intl.firstPageLabel = "Primaira página";
    paginator._intl.lastPageLabel = "Última página";
    paginator._intl.nextPageLabel = "Próxima página";
    paginator._intl.previousPageLabel = "Página anterior";
    paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }

  abirLink(param) {
    if (param !== null) {
    window.open(param);
    }
  }
}
