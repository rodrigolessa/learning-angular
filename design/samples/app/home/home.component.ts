import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponent } from "../app.component";
import { HomeService } from "./home.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  title = "home";
  ehNegativo;
  corTexto;
  atividade: any = {
    itens: [{}]
  };

  datasetSaldoPonto: any = {
    labels: [],
    data: [],
    codigo: "saldoPonto",
    titulo: "Saldo do Ponto",
    loading: true,
    ativo: true
  };

  datasetColaboradores: any = {
    labels: [],
    data: [],
    codigo: "contatos",
    titulo: "Contatos",
    contatos: true,
    loading: true,
    ativo: true
  };
  datasetAniversariantes: any = {
    labels: [],
    data: [],
    codigo: "aniversariantes",
    aniversariantes: true,
    titulo: "Aniversariantes",
    loading: true,
    ativo: true
  };
  datasetAtividades: any = {
    labels: [],
    data: [],
    codigo: "atividades",
    atividade: true,
    titulo: "Atividades",
    loading: true,
    ativo: true
  };
  datasetTickets: any = [];

  constructor(
    private router: Router,
    private app: AppComponent,
    private homeService: HomeService
  ) {
    app.semFundo = true;
    app.esconderLoading(true);
  }

  ngOnInit() {
    this.exibirSaldo();
    this.exibirSaldoTickets();
    this.exibirColaboradores();
    this.exibirAniversariantes();
    this.exibirAtividades();
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }

  exibirSaldo() {
    this.homeService.exibirSaldo().then(
      (res: any) => {
        if (res.saldo < 0) {
          this.ehNegativo = true;
          this.datasetSaldoPonto.ehPositivo = false;
        }
        const h = Math.floor(Math.abs(res.saldo / 60));
        const m = Math.abs(res.saldo % 60);
        const sH = h < 10 ? "0" + h : h;
        const sM = m < 10 ? "0" + m : m;
        const time = sH + ":" + sM;
        this.datasetSaldoPonto.corpo = (this.ehNegativo ? "-" : "") + time;
        this.datasetSaldoPonto.loading = false;
      },
      (resErro: any) => {
        console.log("Erro ao tentar exibir o saldo", resErro);
        if (resErro[0] === "Token não encontrado!") {
          window.localStorage.removeItem("token");
          this.irPara("login");
        }
        this.datasetSaldoPonto.loading = false;
      }
    );
  }

  exibirSaldoTickets() {
    this.datasetTickets = [];
    this.homeService.exibirSaldoTicket().then(
      (res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.datasetTickets.push({
            labels: [],
            data: [],
            codigo: res[i].tipo,
            titulo: res[i].tipo + " (" + res[i].apelido + ")",
            corpo: "R$" + res[i].valorTexto,
            ativo: true
          });
        }
      },
      (resErro: any) => {
        console.log("Erro ao tentar exibir o saldo o ticket", resErro);
        if (resErro[0] === "Token não encontrado!") {
          window.localStorage.removeItem("token");
          this.irPara("login");
        }
      }
    );
  }

  exibirColaboradores() {
    this.homeService.exibirColaboradores().then(
      (res: any) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].fotoUrl == null || res[i].fotoUrl === "") {
            res[i].fotoUrl = "assets/colaborador/ld.png";
          } else {
            if (res[i].fotoUrl.indexOf("http") === -1) {
              res[i].fotoUrl = "assets/colaborador/" + res[i].fotoUrl;
            }
          }
        }

        this.datasetColaboradores.corpo = res;
        this.datasetColaboradores.corpo = this.datasetColaboradores.corpo.sort(
          function(a, b) {
            if (a.nome < b.nome) {
              return -1;
            }
            if (a.nome > b.nome) {
              return 1;
            }
            return 0;
          }
        );
        this.datasetColaboradores.loading = false;
      },
      (resErro: any) => {
        console.log(
          "Erro ao tentar exibir oo tentar exibir os colaboradores",
          resErro
        );
        if (resErro[0] === "Token não encontrado!") {
          window.localStorage.removeItem("token");
          this.irPara("login");
        }
      }
    );
  }

  exibirAniversariantes() {
    this.homeService.exibirAniversariantes().then(
      (res: any) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].fotoUrl == null || res[i].fotoUrl === "") {
            res[i].fotoUrl = "assets/colaborador/ld.png";
          } else {
            if (res[i].fotoUrl.indexOf("http") === -1) {
              res[i].fotoUrl = "assets/colaborador/" + res[i].fotoUrl;
            }
          }
        }

        this.datasetAniversariantes.corpo = res;
        this.datasetAniversariantes.corpo = this.datasetAniversariantes.corpo.sort(
          function(a, b) {
            if (a.nome < b.nome) {
              return -1;
            }
            if (a.nome > b.nome) {
              return 1;
            }
            return 0;
          }
        );
        this.datasetAniversariantes.loading = false;
      },
      (resErro: any) => {
        if (resErro[0] === "Token não encontrado!") {
          window.localStorage.removeItem("token");
          this.irPara("login");
        }
        console.log(
          "Erro ao tentar exibir oo tentar exibir os colaboradores",
          resErro
        );
      }
    );
  }

  exibirAtividades() {
    this.homeService.exibirCalendario().then(
      (res: any) => {
        if (res.itens.length > 0) {
          this.datasetAtividades.corpo = res.itens;
          this.datasetAtividades.corpo = this.datasetAtividades.corpo.sort(
            function(a, b) {
              if (a.data > b.data) {
                return -1;
              }
              if (a.data > b.data) {
                return 1;
              }
              return 0;
            }
          );
          this.datasetAtividades.loading = false;
        } else {
          this.atividade.itens[0].nome = "Não há atividades.";
          this.datasetAtividades.corpo = this.atividade.itens;
          this.datasetAtividades.loading = false;
        }
      },
      (resErro: any) => {
        console.log(
          "Erro ao tentar exibir oo tentar exibir os colaboradores",
          resErro
        );
        if (resErro[0] === "Token não encontrado!") {
          window.localStorage.removeItem("token");
          this.irPara("login");
        }
      }
    );
  }
}
