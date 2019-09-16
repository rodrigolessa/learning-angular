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
  selector: "app-eliminar-imagens-duplicadas",
  templateUrl: "./eliminar-imagens-duplicadas.html",
  styleUrls: ["./eliminar-imagens-duplicadas.scss"]
})
export class EliminarImagensDuplicadasComponent implements OnInit {
  imagemProcesso: any = {};
  ultimaImagemId = "";
  imagemExcluida = [];
  exibirAlert: string;
  continuarExibindo;
  breadcumbs = {
    titulo: "Eliminar imagens duplicadas",
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
        titulo: "Eliminar imagens duplicadas",
        link: "/eliminarimagensduplicadas",
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

  removerImagem(m) {
    this.imagemExcluida.unshift(m);
    m.igual = false;
  }

  desfazerUltimaImagem() {
    this.app.exibirLoading();
    this._utilitarioService.desfazerImagens(this.ultimaImagemId).subscribe(
      (data: any) => {
        this.imagemProcesso = data;
        this.imagemExcluida = [];
        this.ultimaImagemId = "";
        this.app.esconderLoading();
      },
      (resErro: any) => {
        console.log("Erro ao tentar desfazer a exclusão", resErro);
        this.app.esconderLoading();
      }
    );
  }

  desfazerImagem() {
    if (this.imagemExcluida != null && this.imagemExcluida.length > 0) {
      const img = this.imagemExcluida.shift();

      this.imagemProcesso.processos.forEach(element => {
        if (img === element) {
          element.igual = true;
          return;
        }
      });
    }
  }

  salvar() {
    this.app.exibirLoading();
    this._utilitarioService.salvarImagens(this.imagemProcesso).subscribe(
      (data: any) => {
        this.ultimaImagemId = this.imagemProcesso.id;
        this.obterImagens();
      },
      (resErro: any) => {
        console.log("Erro ao tentar salvar", resErro);
        this.app.esconderLoading();
      }
    );
  }

  excluirTodos() {
    this.imagemProcesso.processos.forEach(element => {});
    this.salvar();
  }

  acaoClicada(evento) {
    if (evento === "desfazer" && this.ultimaImagemId !== "") {
      this.desfazerUltimaImagem();
    } else {
      this.snackBar.open("Não há imagem a serem desfeitas", "OK", {
        duration: 5000
      });
    }
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.salvar();
      this.exibirAlert = "salvar";
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.desfazerUltimaImagem();
      this.exibirAlert = "desfazer";
    }
    if (event.keyCode === KEY_CODE.DOW_ARROW) {
      this.excluirTodos();
      this.exibirAlert = "excluirTodos";
    }
  }
}
