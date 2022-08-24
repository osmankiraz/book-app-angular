import { Category } from './../../models/category';
import { Book } from './../../models/book';
import { CategoryService } from './../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import {
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { map, mergeMap } from 'rxjs';
type keybook = keyof Book;
@Component({
  selector: 'app-admin-book-newedit',
  templateUrl: './admin-book-newedit.component.html',
  styleUrls: ['./admin-book-newedit.component.scss'],
})
export class AdminBookNeweditComponent implements OnInit {
  formData?: FormData;
  bookId?: string;
  book?: Book;
  keyOfBook: keybook[] = ['categoryBy', 'title', 'author', 'price', 'stock','picture'];
  bookForm?: UntypedFormGroup;
  title?: string;
  btnText?: string;
  type?: string;
  categories: Category[] = [];

  get pictureFile(){
    return this.bookForm?.get("pictureFile")
  }


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });

    this.bookId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (this.bookId == null) {
      this.title = 'Kitap Ekle';
      this.btnText = 'Ekle';
      this.type = 'add';
    } else {
      this.title = 'Kitap Güncelle';
      this.btnText = 'Güncelle';
      this.type = 'update';

      this.bookService.getBookById(this.bookId).subscribe((response) => {
        this.book = response;
        this.keyOfBook.forEach((key) => {
          this.bookForm!.controls[key].setValue(this.book![key]);
        });
      });
    }

    this.bookForm = new UntypedFormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      picture: new FormControl(''),
      categoryBy: new FormControl('',Validators.required),
      pictureFile:new FormControl('',Validators.required)
    });
  }

  uploadImg(files: any) {
    let fileData = files.target.files[0];
    this.formData = new FormData();
    this.formData.append('picture', fileData);
  }

  onSubmit() {
    if (this.bookForm!.valid) {
      if (this.type == 'add') {
        this.bookService
          .saveBookImage(this.formData)
          .pipe(
            map((res) => {
              this.bookForm?.controls['picture'].setValue(res.url);
            }),
            mergeMap(() => {
              return this.bookService.addBook(this.bookForm?.value);
            })
          ).subscribe((response) => {
            this.router.navigateByUrl('/admin');
          });
      } else {
        if (this.formData == null) {
          this.bookService
            .updateBook(this.book?._id!, this.bookForm?.value)
            .subscribe((response) => {
              this.router.navigateByUrl("/admin")
            });
        }else{
          this.bookService
          .saveBookImage(this.formData)
          .pipe(
            map((res) => {
              this.bookForm?.controls['picture'].setValue(res.url);
            }),
            mergeMap(() => {
              return this.bookService.updateBook(this.book?._id!,this.bookForm?.value);
            })
          ).subscribe((response) => {
            this.router.navigateByUrl('/admin');
          });
        }
      }
    }
  }

  displayCategoryName(category: Category): string {
    return category.name as string;
  }
}
