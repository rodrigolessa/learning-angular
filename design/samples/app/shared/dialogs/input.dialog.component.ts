import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-input.dialog",
  templateUrl: "input.dialog.component.html",
  styleUrls: ["./input.dialog.component.scss"]
})
export class InputDialogComponent implements OnInit {
  descricao;
  constructor(
    public thisDialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.descricao = this.data.Descricao;
  }

  fecharDialog() {}

  onCloseConfirm() {
    this.thisDialogRef.close(this.descricao);
  }
}



