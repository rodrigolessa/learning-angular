import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  title = "Footer";

  constructor(private router: Router) {}

  ngOnInit() {}

  apagarToken() {
    window.localStorage.removeItem("token");
    this.irPara("login");
  }

  irPara(url: string) {
    this.router.navigate([`/${url}`]);
  }
}
