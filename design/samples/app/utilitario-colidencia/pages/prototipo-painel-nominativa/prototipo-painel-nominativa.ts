import { Component, OnInit, HostListener } from "@angular/core";
import { UtilitarioColidenciaService } from "../../utilitario-colidencia.service";
import { AppComponent } from "../../../app.component";
import { MatSnackBar } from "@angular/material";

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  DOW_ARROW = 40
}

@Component({
  selector: "app-prototipo-painel-nominativa",
  templateUrl: "./prototipo-painel-nominativa.html",
  styleUrls: ["./prototipo-painel-nominativa.scss"]
})
export class PrototipoPainelNominativaComponent implements OnInit {
  imagemProcesso: any = {};
  ultimaImagemId = "";
  imagemExcluida = [];
  exibirAlert: string;
  continuarExibindo;
  breadcumbs = {
    titulo: "Protótipo do Painel nominativa",
    paginas: [
      {
        titulo: "Home",
        link: "/"
      },
      {
        titulo: "Utilitário de colidência",
        link: "/eliminarimagensduplicadas"
      },
      {
        titulo: "Protótipo do Painel nominativa",
        link: "/prototipopainelnominativa",
        atual: true
      }
    ],
    acoes: [
      {
        titulo: "Desfazer última avaliação",
        icone: "reply",
        codigo: "desfazer"
      }
    ]
  };

  constructor(
    private _utilitarioService: UtilitarioColidenciaService,
    private snackBar: MatSnackBar,
    private app: AppComponent
  ) {}

  ngOnInit() {
    this.obterImagens();
  }

  obterImagens() {
    this.app.exibirLoading();
    this._utilitarioService.obterImagens().subscribe(
      (data: any) => {
        if (data !== null) {
          this.imagemProcesso = data;
          this.imagemExcluida = [];
          this.continuarExibindo = true;
        } else {
          this.snackBar.open("Acabou!", "OK");
          this.continuarExibindo = false;
        }

        this.app.esconderLoading();
      },
      (resErro: any) => {
        console.log("Erro ao exibir imagens", resErro);
        this.app.esconderLoading();
      }
    );
  }

  acaoClicada(evento) {
    if (evento === "desfazer" && this.ultimaImagemId !== "") {
    } else {
      this.snackBar.open("Não há imagem a serem desfeitas", "OK", {
        duration: 5000
      });
    }
  }
}
