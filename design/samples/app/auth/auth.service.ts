import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { ApiService } from "../core/api.service";
import { ApiLdteamService } from "../core/api-ldteam.service";

@Injectable()
export class AuthService {
  _controller: String = "api/autenticacao/";

  constructor(
    private apiService: ApiService,
    private apiLdteamService: ApiLdteamService
  ) {}

  efetuarLogin(usuario: string, senha: string) {
    const promise = new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json; charset=utf-8");
      headers = headers.set("CodigoEmpresa", "ldsoft");

      this.apiLdteamService
        .post(
          this._controller + "efetuarLogin",
          {
            Usuario: usuario,
            Senha: senha,
            Sistema: 2
          },
          { headers: headers }
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

            const erro = "Algo deu errado ao tentar efetuar o login!";
            this.apiLdteamService.exibirErros([erro]);
            reject(erro);
          }
        );
    });

    return promise;
  }

  verificarToken() {
    const promise = new Promise((resolve, reject) => {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const usuarioLogin = JSON.parse((window.localStorage.getItem("usuarioLogin")));
      const colaborador = JSON.parse((window.localStorage.getItem("colaborador")));

      if (token == null || token === "") {
        const res = {
          sucesso: false,
          mensagens: ["Usuário não encontrado!"],
          tempoLevado: "00:00:00.0002",
          objeto: null
        };

        this.apiService.exibirErros(res.mensagens);
        reject(res.mensagens);
      } else {
        const res = {
          sucesso: true,
          mensagens: [],
          tempoLevado: "00:00:00.0001",
          objeto: {
            usuario: usuarioLogin,
            token: token,
            email: colaborador.email,
            empresa: "LDSoft"
          }
        };

        resolve(res.objeto);
      }
    });

    return promise;
  }

  private gerarHeader() {
    const token = window.localStorage.getItem("token");

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set("Authorization", `Bearer ${token}`);

    return headers;
  }
}
