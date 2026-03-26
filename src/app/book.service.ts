import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Base URL for our XAMPP PHP backend
  private baseUrl = 'http://localhost/AngularApp3/backend';

  // Inject HttpClient so we can make GET, POST, DELETE requests
  constructor(private http: HttpClient) { }

  // Get all books from the database
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/list.php`);
  }

  // Send a new book to the database via POST
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/add.php`, book);
  }

  // Delete a book by its ID using a query parameter
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete.php?id=${id}`);
  }
}
