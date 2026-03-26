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
  // We will store the books from the database in this array
  books: Book[] = [];

  // Inject the service to connect to our PHP backend
  constructor(private bookService: BookService) {}

  // This runs automatically when the component loads
  ngOnInit(): void {
    this.loadBooks();
  }

  // Gets the latest list of books from the service
  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data; // Save the pulled data
      },
      error: (e) => console.error('Error fetching books', e)
    });
  }

  // Deletes a book and refreshes the page list
  deleteBook(id: number | undefined): void {
    // Only delete if we have an ID and the user clicks OK
    if (id && confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: (res) => {
          // If successful, reload our books array to show the update
          this.loadBooks(); 
        },
        error: (e) => console.error('Error deleting book', e)
      });
    }
  }
}
