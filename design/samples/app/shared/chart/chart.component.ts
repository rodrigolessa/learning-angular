import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  NgZone
} from "@angular/core";
import { AppComponent } from "../../app.component";
import { Chart } from "chart.js";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit {
  @Input() dataset: any;
  @Input() title: any;
  @Output() closeClick = new EventEmitter();
  @Output() refreshClick = new EventEmitter();
  @ViewChild("dataCanvas") dataCanvas;
  dataChart;
  carregado = false;
  cor = "#000";

  constructor(private app: AppComponent, private zone: NgZone) {}

  ngOnInit() {
    setInterval(() => {
      if (
        (this.dataset.corpo == null ||
          this.dataset.dataset != null ||
          this.dataset.corpo === "") &&
        !this.carregado &&
        !this.dataset.loading
      ) {
        this.carregado = true;

        this.carregarDados();
      }
    }, 1000);
  }

  fechar() {
    this.closeClick.emit(this.dataset.codigo);
  }

  verificarCor() {
    this.cor =
      this.dataset.ehPositivo === undefined
        ? "black"
        : this.dataset.ehPositivo
          ? "#0776a4"
          : "#FF0000";

    if (this.dataset.cor !== undefined && this.dataset.cor !== "") {
      this.cor = this.dataset.cor;
    }

    return this.cor;
  }

  carregarDados() {
    this.dataChart = new Chart(this.dataCanvas.nativeElement, {
      type: this.dataset.tipo,
      data: {
        labels: this.dataset.labels,
        datasets: this.dataset.dataset
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            fontColor: "black"
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "black"
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "black"
              }
            }
          ]
        }
      }
    });
  }

  poolColors(a) {
    const pool = [];
    for (let i = 0; i < a; i++) {
      pool.push(this.dynamicColors());
    }
    return pool;
  }

  dynamicColors() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  atualizar(metod) {
    this.dataset.loading = true;
   this.refreshClick.emit(metod);
 }
}
