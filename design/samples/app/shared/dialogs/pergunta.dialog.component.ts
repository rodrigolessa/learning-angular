import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-pergunta.dialog",
  templateUrl: "pergunta.dialog.component.html",
  styleUrls: ["./pergunta.dialog.component.scss"]
})
export class PerguntaDialogComponent implements OnInit {
  constructor(
    public thisDialogRef: MatDialogRef<PerguntaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
  }

  fecharDialog() {}
}



