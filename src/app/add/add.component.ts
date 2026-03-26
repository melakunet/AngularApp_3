import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  // Empty book object to hold the data the user types into the form
  book: Book = {
    title: '',
    author: '',
    type: '',
    description: '',
    price: 0
  };

  // We need BookService to talk to the backend and Router to change pages
  constructor(private bookService: BookService, private router: Router) {}

  // Function called when the user clicks the 'Add Book' submit button
  onSubmit() {
    this.bookService.addBook(this.book).subscribe({
      next: (res) => {
        alert('Book added successfully!');
        
        // Reset the form values
        this.book = { title: '', author: '', description: '', price: 0, type: '' };
        
        // Use the router to go back to the list page so we can see the new book
        this.router.navigate(['/list']);
      },
      error: (e) => console.error('Error adding book', e)
    });
  }
}
