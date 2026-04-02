import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost/AngularApp3/backend';

  constructor(private http: HttpClient) { }

  // Returns all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/list.php`);
  }

  // Returns a single book by ID
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/view.php?id=${id}`);
  }

  // Adds a new book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/add.php`, book);
  }

  // Deletes a book by ID
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete.php?id=${id}`);
  }

  // Sends updated book data including optional image as FormData
  updateBook(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/update.php`, formData);
  }
}
