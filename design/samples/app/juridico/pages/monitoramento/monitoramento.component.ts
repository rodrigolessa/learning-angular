import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, PageEvent, MatSort, MatSnackBar } from "@angular/material";
import {
  catchError,
  startWith,
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
  tap
} from "rxjs/operators";
import { merge } from "rxjs/internal/observable/merge";
import { of as observableOf, fromEvent } from "rxjs";
import { AppComponent } from "../../../app.component";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { JuridicoService } from "../../juridico.service";

@Component({
  selector: "app-monitoramento",
  templateUrl: "./monitoramento.component.html",
  styleUrls: ["./monitoramento.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class MonitoramentoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("txtFiltro") txtFiltro: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  title = "Monitoramento";
  breadcumbs = {
    titulo: "Monitoramento",
    paginas: [
      {
        titulo: "Home",
        link: "/"
      },
      {
        titulo: "Jurídico",
        link: "/juridico"
      },
      {
        titulo: "Monitoramento",
        link: "/juridico/monitoramento",
        atual: true
      }
    ],
    acoes: [
      {
        titulo: "Versão para impressão",
        icone: "print",
        codigo: "print"
      },
      {
        titulo: "Exportar para PDF",
        icone: "save_alt",
        codigo: "pdf"
      }
    ]
  };
  data = [];
  dataFiltro = [];
  dataOriginal = [];
  columnsToDisplay = [
    "Processo",
    "TipoDeConsulta",
    "ID",
    "ApiKey",
    "Usuario",
    "Empresa",
    "Criacao",
    "UltimaSucesso",
    "UltimaSucessoBipbop",
    "IconeDetalhe"
  ];
  quantidadeRegistros = 0;
  quantidadePagina = 15;
  busca: any = {
    texto: ""
  };
  isLoadingResults = true;
  isRateLimitReached = false;
  pageEvent: PageEvent;
  exibirErros = false;
  exibirDesatualizados = false;

  constructor(
    private router: Router,
    private _juridicoService: JuridicoService,
    private app: AppComponent,
    private snackBar: MatSnackBar
  ) {
    app.esconderLoading(true);

  }
  ngOnInit() {
    this.app.traduzirPaginator(this.paginator);
    this.paginator.pageSize = this.quantidadePagina;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.obterMonitoramento();
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }

  limparBusca() {
    this.busca.texto = "";
    this.snackBar.dismiss();
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.app.exibirLoading();

          return this._juridicoService.obterMonitoramentoObs(
            this.paginator.pageIndex,
            this.busca.texto,
            this.paginator.pageSize,
            this.exibirErros,
            this.exibirDesatualizados
          );
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe(
        (data: any) => {
          this.data = data.Resultados;
          this.dataOriginal = data.Resultados;
          this.quantidadeRegistros = data.TotalDeRegistros;
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }

  obterMonitoramento() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.app.exibirLoading();

          return this._juridicoService.obterMonitoramentoObs(
            this.paginator.pageIndex,
            this.busca.texto,
            this.paginator.pageSize,
            this.exibirErros,
            this.exibirDesatualizados
          );
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe(
        (data: any) => {
          this.data = data.Resultados;
          this.dataOriginal = data.Resultados;
          this.quantidadeRegistros = data.TotalDeRegistros;
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }

  filtroMonitoramento() {
    this.paginator.pageIndex = 0;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.app.exibirLoading();

          return this._juridicoService.obterMonitoramentoObs(
            this.paginator.pageIndex,
            this.busca.texto,
            this.paginator.pageSize,
            this.exibirErros,
            this.exibirDesatualizados
          );
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe(
        (data: any) => {
          this.data = data.Resultados;
          this.dataOriginal = data.Resultados;
          this.quantidadeRegistros = data.TotalDeRegistros;
          this.app.esconderLoading();
        },
        (erro: any) => {
          this.app.esconderLoading();
        }
      );
  }
}
