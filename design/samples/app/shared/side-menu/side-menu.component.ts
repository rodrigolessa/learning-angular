import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ApplicationRef
} from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"]
})
export class SideMenuComponent implements OnInit {
  @Output() menuAberto = new EventEmitter();

  menuExpandido = false;
  title = "side-menu";

  menus: any = [
    {
      icone: "home",
      titulo: "Home",
      link: "/",
      subMenus: [],
      ativo: false,
      selecionado: false
    },
    {
      icone: "gavel",
      titulo: "Jurídico",
      link: "/juridico/dashboard",
      subMenus: [
        {
          icone: "dashboard",
          titulo: "Dashboard",
          link: "/juridico/dashboard",
          ativo: false
        },
        {
          icone: "visibility",
          titulo: "Monitoramento",
          link: "/juridico/monitoramento",
          ativo: false
        },
        {
          icone: "warning",
          titulo: "Log de monitoramento",
          link: "/juridico/logmonitoramento",
          ativo: false
        },
        {
          icone: "bug_report",
          titulo: "Log de Console",
          link: "/juridico/logconsole",
          ativo: false
        },
        {
          icone: "visibility_off",
          titulo: "Push sem monitoramento",
          link: "/juridico/pushsemmonitoramento",
          ativo: false
        },
        {
          icone: "error",
          titulo: "Log de monitoramento OAB",
          link: "/juridico/logmonitoramentooab",
          ativo: false
        },
        {
          icone: "account_balance",
          titulo: "Tribunal",
          link: "/juridico/tribunal",
          ativo: false
        },
        {
          icone: "supervisor_account",
          titulo: "Chave dos Usuários",
          link: "/juridico/chaveusuarios",
          ativo: false
        }
      ],
      ativo: false,
      selecionado: false
    },
   {
      icone: "image_search",
      titulo: "Utilitário Colidência",
      link: "/utilitario/colidencia/eliminarimagensduplicadas",
      subMenus: [
        {
          icone: "compare",
          titulo: "Eliminar imagens duplicadas",
          link: "/utilitario/colidencia/eliminarimagensduplicadas",
          ativo: false
        },
        {
          icone: "compare",
          titulo: "Protótipo do Painel",
          link: "/utilitario/colidencia/prototipopainelnominativa",
          ativo: false
        }
      ],
      ativo: false,
      selecionado: false
    }

    // , {
    //   icone: "supervised_user_circle",
    //   titulo: "Parâmetro de usuários",
    //   link: "/parametrosusuarios",
    //   subMenus: [
    //     {
    //       icone: "supervisor_account",
    //       titulo: "Perfil de usuário",
    //       link: "/perfisusuarios",
    //       ativo: false
    //     }
    //   ],
    //   ativo: false,
    //   selecionado: false
    // }
   ];

  constructor(private router: Router, private app: ApplicationRef) {
    this.verificarUrlMenu(router.url);

    router.events.subscribe((event: Event) => {
      this.verificaMenu(event);
    });
  }

  verificaMenu = (event: Event): void => {
    if (event instanceof NavigationEnd) {
      this.verificarUrlMenu(event.urlAfterRedirects);
    }

    this.app.tick();
  }

  verificarUrlMenu(url: string) {
    this.menus.forEach(menu => {
      if (url === menu.link) {
        menu.ativo = true;
        menu.selecionado = true;

        menu.subMenus.forEach(sub => {
          sub.ativo = false;
        });

        if (menu.subMenus.length > 0) {
          menu.subMenus[0].ativo = true;
        }
      } else {
        menu.ativo = false;
        menu.selecionado = false;

        menu.subMenus.forEach(sub => {
          if (url === sub.link) {
            menu.ativo = true;
            menu.selecionado = true;
            sub.ativo = true;
          } else {
            sub.ativo = false;
          }
        });
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.menuExpandido = JSON.parse(
        window.localStorage.getItem("menuExpandido")
      );
      this.menuAberto.emit(this.menuExpandido);
    }, 100);
  }

  apagarToken() {
    window.localStorage.removeItem("token");
    this.irPara("login");
  }

  menuSelecionado(menu: any) {
    this.irPara(menu.link);
  }

  expandirMenu() {
    this.menuExpandido = !this.menuExpandido;

    window.localStorage.setItem(
      "menuExpandido",
      JSON.stringify(this.menuExpandido)
    );

    this.menuAberto.emit(this.menuExpandido);
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }
}
