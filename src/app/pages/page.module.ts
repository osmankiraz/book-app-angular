import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { MaterialModule } from '../modules/material/material.module';
import { HeaderComponent } from '../nav/header/header.component';
import { HomeComponent } from './home/home.component';
import { PageRoutingModule } from './page-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeComponent,
    HeaderComponent,
    AdminLayoutComponent,
    AdminHomeComponent,
  ],
  imports: [CommonModule, PageRoutingModule, MaterialModule],
})
export class PageModule {}
