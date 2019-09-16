import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, PageEvent } from "@angular/material";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { fromEvent } from "rxjs";
import { AppComponent } from "../../../app.component";
import { JuridicoService } from "../../juridico.service";

@Component({
  selector: "app-chave-usuarios",
  templateUrl: "./chave-usuarios.component.html",
  styleUrls: ["./chave-usuarios.component.scss"]
})
export class ChaveUsuariosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("txtFiltro") txtFiltro: ElementRef;

  title = "Chave dos usuarios";
  breadcumbs = {
    titulo: "Chave dos Usuários",
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
        titulo: "Chave dos usuários",
        link: "/juridico/chaveusuarios",
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
  busca: any = {
    texto: ""
  };
  data = [];
  dataFiltro = [];
  dataOriginal = [];
  dataSource = new MatTableDataSource<ChaveUsuariosComponent>(this.data);
  columnsToDisplay = ["Nome", "Chave", "Situacao", "Limite"];
  isLoadingResults = false;
  isRateLimitReached = false;
  pageEvent: PageEvent;

  constructor(
    private router: Router,
    private _juridicoService: JuridicoService,
    private app: AppComponent
  ) {
    app.esconderLoading(true);
  }

  ngOnInit() {
    this.app.traduzirPaginator(this.paginator);
    this.obterChaveUsuarios();
  }

  obterChaveUsuarios() {
    this.app.exibirLoading();

    this._juridicoService.obterChaveUsuarios().then(
      (data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].Situacao === "1") {
            data[i].Status = "Ativo";
          } else {
            data[i].Status = "Inativo";
          }
        }

        this.dataOriginal = data;
        this.dataSource.data = data;


        this.dataSource.paginator = this.paginator;
        this.app.esconderLoading();
      },
      (resErro: any) => {
        console.log("Erro obter tribunais", resErro);
        this.app.esconderLoading();
      }
    );
  }

  filtrarChaveUsuario() {
    const dataAux = [];

    this.dataOriginal.forEach((item, index) => {
      if (item.Nome != null &&
        item.Nome.toUpperCase().indexOf(this.busca.texto.toUpperCase()) !==
          -1
      ) {
        dataAux.push(item);
      }
    });
    this.dataSource.data = dataAux;
  }

  limparBusca() {
    this.busca.texto = "";
    this.dataSource.data = this.dataOriginal;
  }
}
