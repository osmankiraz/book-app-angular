import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { MaterialModule } from '../modules/material/material.module';
import { HeaderComponent } from '../nav/header/header.component';
import { HomeComponent } from './home/home.component';
import { PageRoutingModule } from './page-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminCategoryNeweditComponent } from './admin-category-newedit/admin-category-newedit.component';
import { CategoryService } from '../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminCategoryListComponent } from './admin-category-list/admin-category-list.component';
import { AdminBookNeweditComponent } from './admin-book-newedit/admin-book-newedit.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeComponent,
    HeaderComponent,
    AdminLayoutComponent,
    AdminHomeComponent,
    AdminCategoryNeweditComponent,
    AdminCategoryListComponent,
    AdminBookNeweditComponent,
  ],
  imports: [CommonModule, PageRoutingModule, MaterialModule,HttpClientModule ,ReactiveFormsModule],
  providers:[CategoryService]
})
export class PageModule {}
