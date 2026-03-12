import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Define the base URL for our PHP API
  // Note: Ensure this path matches where your XAMPP server files are located
  private baseUrl = 'http://localhost/AngularApp3/backend';

  constructor(private http: HttpClient) { }

  // Method to fetch all books from the PHP backend
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/list.php`);
  }

  // Method to send a new book to the PHP backend
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/add.php`, book);
  }

  // deleteBook(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/delete.php?id=${id}`);
  // }
}
