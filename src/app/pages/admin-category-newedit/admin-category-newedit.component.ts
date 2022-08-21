import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-category-newedit',
  templateUrl: './admin-category-newedit.component.html',
  styleUrls: ['./admin-category-newedit.component.scss'],
})
export class AdminCategoryNeweditComponent implements OnInit {
  categoryId?: string;
  category?: Category;
  categoryForm!: UntypedFormGroup;
  title?: string;
  btnText?: string;
  type?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.categoryForm = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
    });
    if (this.categoryId == null) {
      this.title = 'Kategori Ekle';
      this.btnText = 'Ekle';
      this.type = 'add';
    } else {
      this.title = 'Kategori Güncelleme';
      this.btnText = 'Güncelle';
      this.type = 'update';
      this.categoryService
        .getCategoryById(this.categoryId)
        .subscribe((response) => {
          this.category = response;
          this.categoryForm.controls['name'].setValue(this.category?.name);
        });
    }
  }

  onSubmit() {
    if (this.categoryForm?.valid) {
      if (this.type == 'add') {
        this.categoryService
          .addCategory(this.categoryForm.value)
          .subscribe((response) => {
            console.log('kategori ekleme başarılı');
            this.router.navigateByUrl('/admin');
          });
      } else {
        this.categoryService
          .updateCategory(this.categoryId!, this.categoryForm.value)
          .subscribe((response) => {
            console.log('kategori güncelleme başarılı');
            this.router.navigateByUrl('/admin');
          });
      }
    }
  }
}
