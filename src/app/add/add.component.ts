import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  // Initialize an empty book object to bind to the form
  book: Book = {
    title: '',
    author: '',
    type: '',
    description: '',
    price: 0
  };

  // Inject BookService to send book data to the PHP backend
  constructor(private bookService: BookService) {}

  // Called when the form is submitted
  onSubmit() {
    this.bookService.addBook(this.book).subscribe({
      next: (res) => {
        alert('Book added successfully!');
        // Reset the form after successful submission
        this.book = { title: '', author: '', description: '', price: 0, type: '' };
      },
      error: (e) => console.error('Error adding book', e)  // Log any errors
    });
  }
}
