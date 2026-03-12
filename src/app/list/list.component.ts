import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  // Array to hold the list of books retrieved from the backend
  books: Book[] = [];

  // Inject BookService to communicate with the PHP backend
  constructor(private bookService: BookService) {}

  // Fetch all books from the backend when the component loads
  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => this.books = data,  // Assign returned data to books array
      error: (e) => console.error(e)       // Log any errors to the console
    });
  }
}
