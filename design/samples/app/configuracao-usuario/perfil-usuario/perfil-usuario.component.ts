import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-perfil-usuario",
  templateUrl: "./perfil-usuario.component.html",
  styleUrls: ["./perfil-usuario.component.scss"]
})
export class PerfilUsuarioComponent implements OnInit {

  breadcumbs = {
    titulo: "Perfis de usuários",
    paginas: [
      {
        titulo: "Home",
        link: "/"
      },
      {
        titulo: "Perfis de usuários",
        link: "/perfisusuarios",
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
