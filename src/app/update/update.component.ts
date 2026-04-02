import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Book } from '../book';
import { BookService } from '../book.service';

// Update form — loads the selected book and saves changes back to the database
@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  bookId!: number;
  book: Book = { title: '', author: '', description: '', price: 0, type: 'Paperback', imageName: '' };

  selectedFile: File | null = null;
  success = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Read the book id from the route segment /update/:id
    this.bookId = +this.route.snapshot.paramMap.get('id')!;

    // Load this specific book directly by ID to pre-fill the form
    this.bookService.getBook(this.bookId).subscribe({
      next: (data: Book) => {
        this.book = {
          ...data,
          id: +data.id!,
          price: +data.price
        };
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Book not found.';
        this.cdr.detectChanges();
      }
    });
  }

  // Capture the file the user selects
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.book.imageName = this.selectedFile.name;
    }
  }

  // Upload the selected image to the backend
  uploadFile(): void {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    this.http.post('http://localhost/AngularApp3/backend/upload.php', formData).subscribe({
      next: (res) => console.log('Image uploaded:', res),
      error: (err) => console.error('Image upload failed:', err)
    });
  }

  // Submit updated book data including optional image as FormData
  updateBook(f: NgForm): void {
    if (f.invalid) return;

    const formData = new FormData();
    formData.append('id',          this.bookId.toString());
    formData.append('title',       this.book.title);
    formData.append('author',      this.book.author);
    formData.append('description', this.book.description);
    formData.append('price',       this.book.price.toString());
    formData.append('type',        this.book.type || 'Paperback');
    formData.append('imageName',   this.book.imageName || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.bookService.updateBook(formData).subscribe({
      next: () => {
        this.success = 'Book updated successfully';
        this.router.navigate(['/list']);
      },
      error: () => {
        this.error = 'Update failed. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }
}
