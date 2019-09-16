import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { map, catchError } from "rxjs/operators";
import { ApiLdteamService } from "../core/api-ldteam.service";

@Injectable()
export class HomeService {
  private _controller = "/api/";

  constructor(private apiLdteamService: ApiLdteamService) {}

  exibirSaldo() {
    const promise = new Promise((resolve, reject) => {
      this.apiLdteamService
        .get(this._controller + "/ponto/obterSaldo", null, {
          headers: this.apiLdteamService.gerarHeader()
        })
        .subscribe(
          (res: any) => {
            if (res.sucesso) {
              resolve(res.objeto);
            } else {
              this.apiLdteamService.exibirErros(res.mensagens);
              reject(res.mensagens);
            }
          },
          err => {
            console.error("ERRO", err);
            const erro = "Algo deu errado ao tentar exibir o saldo do ponto!";
            this.apiLdteamService.exibirErros([erro]);
            reject(erro);
          }
        );
    });

    return promise;
  }

  exibirSaldoTicket() {
    const promise = new Promise((resolve, reject) => {
      this.apiLdteamService
        .get(this._controller + "/funcionario/obterCartoesTicket", null, {
          headers: this.apiLdteamService.gerarHeader()
        })
        .subscribe(
          (res: any) => {
            if (res.sucesso) {
              resolve(res.objeto);
            } else {
              this.apiLdteamService.exibirErros(res.mensagens);
              reject(res.mensagens);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao tentar exibir o saldo do ticket!";
            this.apiLdteamService.exibirErros([erro]);
            reject(erro);
          }
        );
    });

    return promise;
  }

  exibirColaboradores() {
    const promise = new Promise((resolve, reject) => {
      this.apiLdteamService
        .get(this._controller + "/funcionario/listar", null, {
          headers: this.apiLdteamService.gerarHeader()
        })
        .subscribe(
          (res: any) => {
            if (res.sucesso) {
              resolve(res.objeto);
            } else {
              this.apiLdteamService.exibirErros(res.mensagens);
              reject(res.mensagens);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao tentar exibir o saldo do ticket!";
            this.apiLdteamService.exibirErros([erro]);
            reject(erro);
          }
        );
    });

    return promise;
  }

  exibirAniversariantes() {
    const promise = new Promise((resolve, reject) => {
      this.apiLdteamService
        .get(this._controller + "/funcionario/listarAniversariantes", null, {
          headers: this.apiLdteamService.gerarHeader()
        })
        .subscribe(
          (res: any) => {
            if (res.sucesso) {
              resolve(res.objeto);
            } else {
              this.apiLdteamService.exibirErros(res.mensagens);
              reject(res.mensagens);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao tentar exibir o saldo do ticket!";
            this.apiLdteamService.exibirErros([erro]);
            reject(erro);
          }
        );
    });

    return promise;
  }

  exibirCalendario() {
    const dataFinal = moment()
      .add("day", 30)
      .format("YYYY-MM-DD");
    const dataInicial = moment().format("YYYY-MM-DD");
    const promise = new Promise((resolve, reject) => {
      this.apiLdteamService
        .get(
          this._controller +
            `/calendario?dataInicial=${dataInicial}&dataFinal=${dataFinal}`,
          null,
          {
            headers: this.apiLdteamService.gerarHeader()
          }
        )
        .subscribe(
          (res: any) => {
            if (res.sucesso) {
              resolve(res.objeto);
            } else {
              this.apiLdteamService.exibirErros(res.mensagens);
              reject(res.mensagens);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao tentar exibir o saldo do ticket!";
            this.apiLdteamService.exibirErros([erro]);
            reject(erro);
          }
        );
    });

    return promise;
  }
}
