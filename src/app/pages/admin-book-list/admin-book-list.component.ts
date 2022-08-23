import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.scss'],
})
export class AdminBookListComponent implements OnInit {
  books: Book[] = [];
  dataSource!: MatTableDataSource<Book>;
  displayedColumns: string[] = [
    'No',
    'Picture',
    'Title',
    'Author',
    'Price',
    'Stock',
    'CategoryName',
    'Actions',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.initTable()
  }

  initTable(){
    this.bookService.getBooks().subscribe((response) => {
      this.books=response;
      this.setBooksNo();
      this.dataSource=new MatTableDataSource<Book>(this.books);
      this.dataSource.paginator=this.paginator
    });
  }

  delete(bookId:string){

  }
  setBooksNo(){
    this.books.forEach((book,index) => {
      this.books[index]['no']= index+1
    });
  }
}
