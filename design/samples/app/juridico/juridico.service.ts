import { Injectable } from "@angular/core";
import { ApiService } from "../core/api.service";
import { Subject } from "rxjs";

@Injectable()
export class JuridicoService {
  _controller: String = "webservices/apol/api/juridico/";
  constructor(private apiService: ApiService) {}

  // tribunais
  obterTribunais() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.apiService
          .get(this._controller + "obtertribunais", null, {
            headers: this.apiService.gerarHeader()
          })
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

              const erro = "Algo deu errado ao tentar obter tribunais";
              this.apiService.exibirErros([erro]);
              reject(erro);
            }
          );
      }, 400);
    });
    return promise;
  }

  obterSituacaoMonitoramentoLog() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.apiService
          .get(this._controller + "ObterSituacaoMonitoramentoLog", null, {
            headers: this.apiService.gerarHeader()
          })
          .subscribe(
            (res: any) => {
              resolve(res);
            },
            err => {
              console.error("ERRO", err);

              const erro = "Algo deu errado ao tentar obter as situações";
              this.apiService.exibirErros([erro]);
              reject(erro);
            }
          );
      }, 400);
    });
    return promise;
  }

  obterAndamentosPorProcesso(idDoProcesso, qtd) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.apiService
          .get(`${this._controller}ObterAndamentosDeProcessos?idDoProcesso=${idDoProcesso}&qtd=${qtd}`, null, {
            headers: this.apiService.gerarHeader()
          })
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

              const erro = "Algo deu errado ao tentar obter monitoramentos do processo";
              this.apiService.exibirErros([erro]);
              reject(erro);
            }
          );
      }, 400);
    });
    return promise;
  }

  // monitoramento
  obterMonitoramento(
    paginaAtual,
    busca,
    quantidadePagina,
    erros,
    desatualizado
  ) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .get(
          `${
            this._controller
          }ObterMonitoramento?busca=${busca}&paginaAtual=${paginaAtual +
            1}&registrosPorPagina=${quantidadePagina}&erros=${erros}&desatualizado=${desatualizado}`,
          null,
          {
            headers: this.apiService.gerarHeader()
          }
        )
        .subscribe(
          (res: any) => {
            if (res.Message == null) {
              resolve(res);
            } else {
              this.apiService.exibirErros(res.Messages);
              reject(res.Messages);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao obter monitoramentos";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  obterMonitoramentoObs(paginaAtual, busca, quantidadePagina, erros, desatualizados) {
    const pollSubject = new Subject<any>();
    this.obterMonitoramento(paginaAtual, busca, quantidadePagina, erros, desatualizados).then(
      (data: any) => {
        pollSubject.next(data);
      },
      (err: any) => {
        pollSubject.error(err);
      }
    );
    return pollSubject.asObservable();
  }

  // log monitoramento oab
  obterLogMonitoramentoOab(paginaAtual, descricao, quantidadePagina) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .get(
          `${
            this._controller
          }ObterMonitoramentoOABLog?paginaAtual=${paginaAtual +
            1}&registrosPorPagina=${quantidadePagina}&descricao=${descricao}`,
          null,
          {
            headers: this.apiService.gerarHeader()
          }
        )
        .subscribe(
          (res: any) => {
            if (res.Message == null) {
              resolve(res);
            } else {
              this.apiService.exibirErros(res.Messages);
              reject(res.Messages);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao obter monitoramentos Oab";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  obterLogMonitoramentoOabObs(paginaAtual, descricao, quantidadePagina) {
    const pollSubject = new Subject<any>();
    this.obterLogMonitoramentoOab(
      paginaAtual,
      descricao,
      quantidadePagina
    ).then(
      (data: any) => {
        pollSubject.next(data);
      },
      (err: any) => {
        pollSubject.error(err);
      }
    );
    return pollSubject.asObservable();
  }

  // log monitoramento
  /**
   * @ngdoc function
   * @name initializeGrid
   * @methodOf works.controller:worksCtrl
   * @description This method initialize auto grid system for works
   * @param {string=} prefix Prefix for hash part (containing path and search)
   * @private
   */
  obterLogMonitoramento(
    paginaAtual,
    busca,
    quantidadePagina,
    resolvido?,
    exibirPublicadosApol?,
    situacao?
  ) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .get(
          `${
            this._controller
            // tslint:disable-next-line:max-line-length
          }ObterMonitoramentoLog?busca=${busca}&paginaAtual=${paginaAtual +
            1}&registrosPorPagina=${quantidadePagina}&resolvido=${resolvido}&publicadoApol=${exibirPublicadosApol}&situacao=${situacao}`,
          null,
          {
            headers: this.apiService.gerarHeader()
          }
        )
        .subscribe(
          (res: any) => {
            if (res.Sucesso) {
              resolve(res);
            } else {
              this.apiService.exibirErros(res.Mensagens);
              reject(res.Mensagens);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao obter o log de monitoramento";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  obterLogMonitoramentoObs(
    paginaAtual,
    busca,
    quantidadePagina,
    resolvido?,
    exibirPublicadosApol?,
    situacao?
  ) {
    const pollSubject = new Subject<any>();
    this.obterLogMonitoramento(
      paginaAtual,
      busca,
      quantidadePagina,
      resolvido,
      exibirPublicadosApol,
      situacao
    ).then(
      (data: any) => {
        pollSubject.next(data);
      },
      (err: any) => {
        pollSubject.error(err);
      }
    );
    return pollSubject.asObservable();
  }

  // Marcar que o cliente já foi avisado
  marcarComoResolvido(idMonitoramento) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .post(
          `${
            this._controller
          }setDoneMonitoramentoLog?idMonitoramento=${idMonitoramento}`,
          null,
          {
            headers: this.apiService.gerarHeader()
          }
        )
        .subscribe(
          (res: any) => {
            if (res.Message == null) {
              resolve(res);
            } else {
              this.apiService.exibirErros(res.Messages);
              reject(res.Messages);
            }
          },
          err => {
            console.error("ERRO", err);
            const erro =
              "Algo deu errado ao tentar remover o log de monitoramento";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  // Validar CNJ
  validarNumeracao(processo) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .get(
          `${
            this._controller
          }validarNumeracaoUnicaDoProcesso?numeroDoProcesso=${processo}`,
          null,
          {
            headers: this.apiService.gerarHeader()
          }
        )
        .subscribe(
          (res: any) => {
            if (res.Message == null) {
              resolve(res.Messages);
            } else {
              this.apiService.exibirErros(res.Messages);
              reject(res.Messages);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao consultar a validação do processo";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  // Consultar prcesso no tribunal
  obterProcessoTribunal(processo) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .get(
          `${
            this._controller
          }obterProcessoDoTribunal?numeroDoProcesso=${processo}`,
          null,
          {
            headers: this.apiService.gerarHeader()
          }
        )
        .subscribe(
          (res: any) => {
            if (res.Message == null) {
              resolve(res);
            } else {
              this.apiService.exibirErros(res.Messages);
              reject(res.Messages);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao consultar a validação do processo";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  // Obter processos que foram removidos do nosso controle mas que continuam no parceiro
  obterQuantiadadePushSemMonitoramento() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.apiService
          .get(
            `${this._controller}ObterQuantidadeDePushSemMonitoramento`,
            null,
            {
              headers: this.apiService.gerarHeader()
            }
          )
          .subscribe(
            (res: any) => {
              if (res.Message == null) {
                resolve(res);
              } else {
                this.apiService.exibirErros(res.Messages);
                reject(res.Messages);
              }
            },
            err => {
              console.error("ERRO", err);

              const erro =
                "Algo deu errado ao obter a quantidade de push sem monitoramento";
              this.apiService.exibirErros([erro]);
              reject(erro);
            }
          );
      }, 9000);
    });
    return promise;
  }

  // Para utilizar subscribe
  obterQuantiadadePushSemMonitoramentoObs() {
    const pollSubject = new Subject<any>();
    this.obterQuantiadadePushSemMonitoramento().then(
      (data: any) => {
        pollSubject.next(data);
      },
      (err: any) => {
        pollSubject.error(err);
      }
    );
    return pollSubject.asObservable();
  }

  // Obter lista de processos sem o nosso monitoramento
  obterPushSemMonitoramento() {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .get(this._controller + "ObterPushSemMonitoramento", null, {
          headers: this.apiService.gerarHeader()
        })
        .subscribe(
          (res: any) => {
            if (res.Message == null) {
              resolve(res);
            } else {
              this.apiService.exibirErros(res.Messages);
              reject(res.Messages);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao obter push sem monnitoramento";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  // Remover da lista de processos sem o nosso monitoramento (utilizado para marcar como concluído)
  removerPushSemMonitoramento(codigo) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .get(
          `${this._controller}ExcluirPushSemMonitoramento?codigo=${codigo}`,
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

  // Quantidade de processos cadastradados/monitorados na bibop por data
  quantidadeDeMonitoramentosPorMes(dataInicio, dataFim) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.apiService
          .get(
            `${
              this._controller
            }QuantidadeDeMonitoramentosPorMes?DataDeInicio=${dataInicio}&DataDeFim=${dataFim}`,
            null,
            {
              headers: this.apiService.gerarHeader()
            }
          )
          .subscribe(
            (res: any) => {
              if (res.Message == null) {
                resolve(res);
              } else {
                this.apiService.exibirErros(res.Messages);
                reject(res.Messages);
              }
            },
            err => {
              console.error("ERRO", err);

              const erro =
                "Algo deu errado obter a quantidade de monitoramento por mês";
              this.apiService.exibirErros([erro]);
              reject(erro);
            }
          );
      }, 600);
    });
    return promise;
  }

  // Quantidade de processos cadastradados/monitorados na bibop ativos
  obterTotalDeMonitoramentosAtivos() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.apiService
          .get(`${this._controller}TotalDeMonitoramentos`, null, {
            headers: this.apiService.gerarHeader()
          })
          .subscribe(
            (res: any) => {
              if (res.Message == null) {
                resolve(res);
              } else {
                this.apiService.exibirErros(res.Messages);
                reject(res.Messages);
              }
            },
            err => {
              console.error("ERRO", err);

              const erro =
                "Algo deu errado obter a quantidade de monitoramento por mês";
              this.apiService.exibirErros([erro]);
              reject(erro);
            }
          );
      }, 600);
    });
    return promise;
  }

  // Identificar o status dos usuários
  obterChaveUsuarios() {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .get(this._controller + "ObterChavesDosUsuarios", null, {
          headers: this.apiService.gerarHeader()
        })
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

            const erro = "Algo deu errado ao tentar obter chave de usuarios";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  // Agendar monitoramento na Bipbop
  agendarMonitoramento(key, idMonitoramento) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .post(
          `${
            this._controller
          }AlterarMonitoramentoPorId?subkey=${key}&idDoMonitoramento=${idMonitoramento}`,
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

            const erro = "Algo deu errado ao tentar agendar o monitoramento";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  // Marcar como notificado o monitoramento
  adicionarNotificacaoMonitoramentoLog(id) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .post(`${this._controller}NotificarMonitoramentoLog?id=${id}`, null, {
          headers: this.apiService.gerarHeader()
        })
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

            const erro = "Algo deu errado ao tentar gravar a notificação";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }
  // Marcar como notificado o monitoramento
  adicionarPublicacaoMonitoramentoLog(id) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .post(`${this._controller}PublicarMonitoramentoLog?id=${id}`, null, {
          headers: this.apiService.gerarHeader()
        })
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

            const erro =
              "Algo deu errado ao tentar gravar a puplicacao do erro no Apol";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  // Erros para console do jurídico
  obterConsoleLog(paginaAtual, busca, quantidadePagina) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .get(
          `${
            this._controller
          }ObterConsoleLog?busca=${busca}&paginaAtual=${paginaAtual +
            1}&registrosPorPagina=${quantidadePagina}`,
          null,
          {
            headers: this.apiService.gerarHeader()
          }
        )
        .subscribe(
          (res: any) => {
            if (res.Message == null) {
              resolve(res);
            } else {
              this.apiService.exibirErros(res.Messages);
              reject(res.Messages);
            }
          },
          err => {
            console.error("ERRO", err);

            const erro = "Algo deu errado ao obter monitoramentos.";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  excluirLogConsole(idLog) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .delete(`${this._controller}ExcluirConsoleLog?id=${idLog}`, {
          headers: this.apiService.gerarHeader()
        })
        .subscribe(
          (res: any) => {
            if (res.Message == null) {
              resolve(res);
            } else {
              this.apiService.exibirErros(res.Messages);
              reject(res.Messages);
            }
          },
          err => {
            console.error("ERRO", err);
            const erro = "Algo deu errado ao tentar remover o log.";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  // Quantidade de processos cadastradados/monitorados na bibop ativos
  obterTotalDeMonitoramentosDesatualizados() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.apiService
          .get(`${this._controller}ObterTotalDeMonitoramentosDesatualizados`, null, {
            headers: this.apiService.gerarHeader()
          })
          .subscribe(
            (res: any) => {
              if (res.Message == null) {
                resolve(res);
              } else {
                this.apiService.exibirErros(res.Messages);
                reject(res.Messages);
              }
            },
            err => {
              console.error("ERRO", err);

              const erro = "Algo deu errado ao obter o total de monitoramentos";
              this.apiService.exibirErros([erro]);
              reject(erro);
            }
          );
      }, 600);
    });
    return promise;
  }

  // Editar os registros de Log de Monitoramento
  EditarMonitoramentoLog(logBody) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .post(
          `${this._controller}EditarMonitoramentoLog`,
          logBody,
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

            const erro = "Algo deu errado ao alterar o log de monitoramento";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  // Gerar e-mails para notificação ao cliente
  gerarEmailNotificacaoMonitoramentoLog() {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .post(`${this._controller}GerarEmailNotificacaoMonitoramentoLog`, null, {
          headers: this.apiService.gerarHeader()
        })
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

            const erro =
              "Algo deu errado ao tentar gravar e-mails para envio";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  obterEmailsDeNotificacaoMonitoramentoLog(idMonitoramentoLog) {
    const promise = new Promise((resolve, reject) => {
      this.apiService
        .get(`${this._controller}ObterEmailsDeNotificacaoMonitoramentoLog?idMonitoramentoLog=${idMonitoramentoLog}`, null, {
          headers: this.apiService.gerarHeader()
        })
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

            const erro =
              "Algo deu errado ao tentar obter e-mails enviados";
            this.apiService.exibirErros([erro]);
            reject(erro);
          }
        );
    });
    return promise;
  }

  downloadXmlDeProcessos(idMonitoramentoLog) {
    location.href = `${this.apiService.url}/${this._controller}ObterUltimosDocumentosDeProcessos?idMonitoramento=${idMonitoramentoLog}`;
  }

}
