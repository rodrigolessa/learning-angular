import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { BreadcumbComponent } from "./breadcumb/breadcumb.component";
import { MaterialModule } from "./material.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { AlertComponent } from "./components/alert.component";
import { PerguntaDialogComponent } from "./dialogs/pergunta.dialog.component";
import { InputDialogComponent } from "./dialogs/input.dialog.component";
import { FormsModule } from "@angular/forms";
import { ChartComponent } from "./chart/chart.component";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    BreadcumbComponent,
    ClickOutsideDirective,
    AlertComponent,
    PerguntaDialogComponent,
    InputDialogComponent,
    ChartComponent
  ],
  imports: [MaterialModule, RouterModule, CommonModule, FormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    BreadcumbComponent,
    MaterialModule,
    ClickOutsideDirective,
    AlertComponent,
    PerguntaDialogComponent,
    InputDialogComponent,
    FormsModule,
    ChartComponent
  ],
  entryComponents: [PerguntaDialogComponent, InputDialogComponent]
})
export class SharedModule {}
