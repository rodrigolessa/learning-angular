import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ApiTrelloService } from "../core/api-trello.service";

@Injectable()
export class TrelloService {
  constructor(private apiService: ApiTrelloService) {}

  // tribunais
  // obterTribunais() {
  //   const promise = new Promise((resolve, reject) => {
  //     this.apiService
  //       .get(this._controller + "obtertribunais", null, {
  //         headers: this.apiService.gerarHeader()
  //       })
  //       .subscribe(
  //         (res: any) => {
  //           if (res.Message == null) {
  //             resolve(res.Response);
  //           } else {
  //             this.apiService.exibirErros(res.Messages);
  //             reject(res.Messages);
  //           }
  //         },
  //         err => {
  //           console.error("ERRO", err);

  //           const erro = "Algo deu errado ao obter tribunais";
  //           this.apiService.exibirErros([erro]);
  //           reject(erro);
  //         }
  //       );
  //   });
  //   return promise;
  // }

  // Remover da lista de processos sem o nosso monitoramento (utilizado para marcar como concluído)

  criarCardTrello(nome, descricao, url?) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .post(
          `1/cards?name=${nome}&desc=${descricao}&due&idList=${
            this.apiService.idBoardBB
          }&keepFromSource=all&urlSource=${url}`,
          null,
          {
            headers: this.apiService.gerarHeader()
          }
        )
        .subscribe(
          (res: any) => {
            if (res.Message == null) {
              resolve(res.Response);
            } else {
              this.apiService.exibirErros(res.Messages);
              reject(res.Messages);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao excluir o monitoramento";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }
}
