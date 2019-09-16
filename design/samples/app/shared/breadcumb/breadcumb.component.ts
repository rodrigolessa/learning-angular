import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-breadcumb",
  templateUrl: "./breadcumb.component.html",
  styleUrls: ["./breadcumb.component.scss"]
})
export class BreadcumbComponent implements OnInit {
  @Output() actionClick = new EventEmitter();
  @Input() info: any;

  title = "breadcumb";

  constructor(private router: Router) {
  }

  ngOnInit() {
    const paginasAux = [];

    for (let index = 0; index < this.info.paginas.length; index++) {
      paginasAux.push(this.info.paginas[index]);

      if (((index % 2) !== 0 || index === 0) && index !== (this.info.paginas.length - 1)) {
        paginasAux.push({ divisor: true });
      }
    }

    this.info.paginas = paginasAux;
  }

  enviarEvento(codigo) {
    this.actionClick.emit(codigo);
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }
}
