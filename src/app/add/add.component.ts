import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book';

// Add book form with optional cover image upload
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  book: Book = { title: '', author: '', type: '', description: '', price: 0, imageName: '' };

  selectedFile: File | null = null;
  error = '';
  success = '';

  constructor(
    private bookService: BookService,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Capture the file the user selects
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.book.imageName = this.selectedFile.name;
    }
  }

  // Upload the selected image file to the backend
  uploadFile(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost/AngularApp3/backend/upload.php', formData).subscribe({
      next: (res) => console.log('Image uploaded:', res),
      error: (err) => console.error('Image upload failed:', err)
    });
  }

  // Submit the new book to the database
  onSubmit(f: NgForm) {
    if (f.invalid) return;

    if (!this.book.imageName) {
      this.book.imageName = '';
    }

    this.bookService.addBook(this.book).subscribe({
      next: () => {
        if (this.selectedFile) {
          this.uploadFile();
        }

        this.success = 'Book added successfully!';
        this.book = { title: '', author: '', description: '', price: 0, type: '', imageName: '' };
        this.selectedFile = null;
        this.router.navigate(['/list']);
      },
      error: () => {
        this.error = 'Error adding book. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }
}

