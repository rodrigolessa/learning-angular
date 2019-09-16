import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatPaginator, MatTableDataSource } from "@angular/material";
import {
  trigger,
  state,
  transition,
  style,
  animate
} from "@angular/animations";
import { Tribunal } from "./tribunal.model";
import { JuridicoService } from "../../juridico.service";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { AppComponent } from "../../../app.component";

@Component({
  selector: "app-tribunal",
  templateUrl: "./tribunal.component.html",
  styleUrls: ["./tribunal.component.scss"],
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
export class TribunalComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("txtFiltro") txtFiltro: ElementRef;

  busca: any = {
    texto: ""
  };
  dataSource = new MatTableDataSource<Tribunal>();
  dataTribunais;
  dataOriginal;
  title = "Tribunal";
  expandedElement: Tribunal;
  columnsToDisplay = ["Nome", "Site", "IconeDetalhe"];
  columnsToDisplayDetails = ["Nome", "Descricao", "Mascara"];
  breadcumbs = {
    titulo: "Tribunal",
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
        titulo: "Tribunal",
        link: "/juridico/tribunal",
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

  constructor(
    private router: Router,
    private _juridicoService: JuridicoService,
    public dialog: MatDialog,
    private app: AppComponent
  ) {
    app.esconderLoading(true);
  }

  ngOnInit() {
    this.app.traduzirPaginator(this.paginator);
    this.obter();
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }

  obter() {
    this.busca.texto = "";
    this.app.exibirLoading();

    this._juridicoService.obterTribunais().then(
      (data: any) => {
        for (let i = 0; i < data.length; i++) {
          data[i].detalhes = [];
          data[i].Parametro.forEach(paramentro => {
            paramentro.Campo.forEach(campo => {
              data[i].detalhes.push({
                Nome: paramentro.Nome,
                Url: paramentro.Url,
                Descricao: campo.Descricao,
                Mascara: campo.Mascara
              });
            });
          });
        }
        this.dataSource.data = data;
        this.dataOriginal = data;
        this.dataSource.paginator = this.paginator;
        this.app.esconderLoading();
      },
      (resErro: any) => {
        console.log("Erro obter tribunais", resErro);
        this.app.esconderLoading();
      }
    );
  }

  filtrarTribunais() {
    const dataAux = [];
    this.dataOriginal.forEach((item, index) => {
      if (
        item.Nome != null &&
        item.Nome.toUpperCase().indexOf(
          this.busca.texto.toUpperCase()
        ) !== -1
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

  acaoClicada(evento) {
    console.log(evento);
  }

}
