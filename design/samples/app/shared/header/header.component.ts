import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild
} from "@angular/core";
import { Router } from "@angular/router";
import { AppComponent } from "../../app.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @ViewChild("txtBusca") txtBusca: ElementRef;

  title = "header";
  exibirNotificacaoMenu = false;
  exibirUsuarioMenu = false;
  exibirBuscaMenu = false;
  exibirResultadoBuscaMenu = false;

  itensBusca: any[] = [
    {
      texto: "Processo 2138732-8",
      link: "juridico/monitoramento"
    },
    {
      texto: "Processo 45355343-8",
      link: "juridico/monitoramento"
    },
    {
      texto: "Processo 543534543-8",
      link: "juridico/monitoramento"
    },
    {
      texto: "Processo 11132132-8",
      link: "juridico/monitoramento"
    },
    {
      texto: "Processo 66454432-8",
      link: "juridico/monitoramento"
    }
  ];

  constructor(private router: Router, public app: AppComponent) {}

  ngOnInit() {}

  apagarToken() {
    window.localStorage.removeItem("token");
    this.irPara("login");
  }

  onClickOutside($event) {
    if ($event.value) {
      this.fecharMenus();
    }
  }

  focarBusca() {
    setTimeout(() => {
      this.txtBusca.nativeElement.focus();
    }, 500);
  }

  fecharMenus() {
    this.exibirNotificacaoMenu = false;
    this.exibirUsuarioMenu = false;
    this.exibirBuscaMenu = false;
    this.exibirResultadoBuscaMenu = false;
  }

  selecionarTabBusca(index) {
    if (index === 0) {
      this.itensBusca = [
        {
          texto: "Processo 2138732-8",
          link: "juridico/processos"
        },
        {
          texto: "Processo 45355343-8",
          link: "juridico/processos"
        },
        {
          texto: "Processo 543534543-8",
          link: "juridico/processos"
        },
        {
          texto: "Processo 11132132-8",
          link: "juridico/processos"
        },
        {
          texto: "Processo 66454432-8",
          link: "juridico/processos"
        }
      ];
    } else if (index === 1) {
      this.itensBusca = [
        {
          texto: "Envolvido 45355343-8",
          link: "juridico/processos"
        },
        {
          texto: "Envolvido 66454432-8",
          link: "juridico/processos"
        },
        {
          texto: "Envolvido 543534543-8",
          link: "juridico/processos"
        },
        {
          texto: "Envolvido 11132132-8",
          link: "juridico/processos"
        },
        {
          texto: "Envolvido 132131232-8",
          link: "juridico/processos"
        }
      ];
    } else if (index === 2) {
      this.itensBusca = [
        {
          texto: "Usuário 00099293-8",
          link: "juridico/processos"
        },
        {
          texto: "Usuário 20939302-8",
          link: "juridico/processos"
        },
        {
          texto: "Usuário 77772838-8",
          link: "juridico/processos"
        },
        {
          texto: "Usuário 00002321-8",
          link: "juridico/processos"
        },
        {
          texto: "Usuário 66454432-8",
          link: "juridico/processos"
        }
      ];
    } else {
    }
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }
}
