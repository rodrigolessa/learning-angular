import {
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { AppComponent } from "../../app.component";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {
  constructor(private app: AppComponent) {}

  ngOnInit() {}
}
