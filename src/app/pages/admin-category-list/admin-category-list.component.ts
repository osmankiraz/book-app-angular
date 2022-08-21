import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.scss'],
})
export class AdminCategoryListComponent implements OnInit {
  categories!: Category[];
  dataSource!: MatTableDataSource<Category>;
  displayedColumns: string[] = ['No', 'Name', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  delete(categoryId: string) {
    this.categoryService.deleteCategory(categoryId).subscribe((response) => {
      // this.getCategories();
      const category = this.categories.filter((x) => x._id == categoryId)[0];
      const index = this.categories.indexOf(category);
      this.categories.splice(index, 1);
      this.setCategoryNo()
      this.dataSource = new MatTableDataSource<Category>(this.categories);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
      this.setCategoryNo()
      this.dataSource = new MatTableDataSource<Category>(this.categories);
      this.dataSource.paginator = this.paginator;
    });
  }

  setCategoryNo(){
    this.categories.forEach((categories, index) => {
      this.categories[index]['no'] = index + 1;
    });
  }
}
