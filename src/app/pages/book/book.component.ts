import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  book?: Book;
  bookId?: string;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.bookService.getBookById(this.bookId).subscribe((response) => {
      this.book=response
    });
  }
}
