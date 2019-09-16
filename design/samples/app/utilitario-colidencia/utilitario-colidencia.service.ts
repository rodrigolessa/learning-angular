import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { ApiIntranetService } from "../core/api-intranet.service";
import { ApiPrototipoPainelService } from "../core/api-prototipo-painel.service";

@Injectable()
export class UtilitarioColidenciaService {
  private _controller = "/api/utilitario/";
  private _controllerPrototipoPainel = "/api/utilitario/";

  constructor(
    private apiService: ApiIntranetService,
    private apiPrototipoPainelService: ApiPrototipoPainelService
  ) {}

  obterImagens(): Observable<any> {
    const pollSubject = new Subject<any>();

    this.apiService
      .get(`${this._controller}figurativa/obterImagensDuplicadas`, null, {
        headers: this.apiService.gerarHeader()
      })
      .subscribe(
        (res: any) => {
          if (res != null) {
            if (res.Message == null) {
              pollSubject.next(res);
            } else {
              this.apiService.exibirErros(res.Messages);
              pollSubject.error(res.Messages);
            }
          } else {
            const erro: string[] = ["Algo deu errado!"];
            this.apiService.exibirErros(erro);
            pollSubject.error(erro);
          }
        },
        err => {
          console.error("ERRO", err);

          const erro = "Algo deu errado ao obter as imagens";
          this.apiService.exibirErros([erro]);
          pollSubject.error(erro);
        }
      );

    return pollSubject.asObservable();
  }

  salvarImagens(Imagem): Observable<any> {
    const pollSubject = new Subject<any>();

    this.apiService
      .post(`${this._controller}figurativa/salvarImagensDuplicadas`, Imagem, {
        headers: this.apiService.gerarHeader()
      })
      .subscribe(
        (res: any) => {
          if (res != null) {
            if (res.Message == null) {
              pollSubject.next(res);
            } else {
              this.apiService.exibirErros(res.Messages);
              pollSubject.error(res.Messages);
            }
          } else {
            const erro: string[] = ["Algo deu errado!"];
            this.apiService.exibirErros(erro);
            pollSubject.error(erro);
          }
        },
        err => {
          console.error("ERRO", err);

          const erro = "Algo deu errado ao tentar salvar as imagens";
          this.apiService.exibirErros([erro]);
          pollSubject.error(erro);
        }
      );

    return pollSubject.asObservable();
  }

  desfazerImagens(id): Observable<any> {
    const pollSubject = new Subject<any>();

    this.apiService
      .post(
        `${this._controller}figurativa/desfazerImagensDuplicadas?request=${id}`,
        null,
        {
          headers: this.apiService.gerarHeader()
        }
      )
      .subscribe(
        (res: any) => {
          if (res != null) {
            if (res.Message == null) {
              pollSubject.next(res);
            } else {
              this.apiService.exibirErros(res.Messages);
              pollSubject.error(res.Messages);
            }
          } else {
            const erro: string[] = ["Algo deu errado!"];
            this.apiService.exibirErros(erro);
            pollSubject.error(erro);
          }
        },
        err => {
          console.error("ERRO", err);

          const erro = "Algo deu errado ao tentar desfazer as imagens";
          this.apiService.exibirErros([erro]);
          pollSubject.error(erro);
        }
      );

    return pollSubject.asObservable();
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || "Server error");
  }
}
