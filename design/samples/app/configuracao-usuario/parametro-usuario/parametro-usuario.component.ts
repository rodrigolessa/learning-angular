import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-parametro-usuario",
  templateUrl: "./parametro-usuario.component.html",
  styleUrls: ["./parametro-usuario.component.scss"]
})
export class ParametroUsuarioComponent implements OnInit {

  breadcumbs = {
    titulo: "Parâmetros de usuários",
    paginas: [
      {
        titulo: "Home",
        link: "/"
      },
      {
        titulo: "Parâmetro de Usuarios",
        link: "/parametrosusuarios",
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

  constructor() { }

  ngOnInit() {
  }

}
