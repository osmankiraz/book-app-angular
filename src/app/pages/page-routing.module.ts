import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { AdminBookNeweditComponent } from './admin-book-newedit/admin-book-newedit.component';
import { AdminCategoryNeweditComponent } from './admin-category-newedit/admin-category-newedit.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'category',
        component: AdminCategoryNeweditComponent,
      },
      {
        path: 'category/:id',
        component: AdminCategoryNeweditComponent,
      },
      {
        path: 'book',
        component: AdminBookNeweditComponent,
      },
      {
        path: 'book/:id',
        component: AdminBookNeweditComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
