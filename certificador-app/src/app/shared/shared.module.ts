import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';
import { DialogComponent } from './dialog/dialog.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ChartComponent } from './chart/chart.component';
import { ClickOutDirective } from './click-out.directive';



@NgModule({
  declarations: [SideMenuComponent, HeaderComponent, AlertComponent, DialogComponent, FooterComponent, BreadcrumbComponent, ChartComponent, ClickOutDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
