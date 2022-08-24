import { ActivatedRoute } from '@angular/router';
import { Book } from './../../models/book';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  categoryId: string | null | undefined;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.bookService
          .getBooksByCategoryId(this.categoryId)
          .subscribe((response) => {
            this.books = response;
          });
      } else {
        this.bookService.getBooks().subscribe((response) => {
          this.books = response;
        });
      }
    });
  }
}
