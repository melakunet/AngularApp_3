# Reader Home (AngularApp3)

**Assignment 3 for Angular Development Course**
**Course Code:** MWD4B (Angular)
**Student:** Etefworkie Melaku
**Date:** March 2026

## Project Overview

This is a comprehensive Book Management Application built with Angular 19 and a PHP/MySQL backend. It demonstrates key Angular concepts including:
- **HTTP Client:** Communicating with a RESTful API (PHP) to perform CRUD operations.
- **Routing:** Navigating between a Book List view and an Add Book form.
- **Services:** Encapsulating data access logic in a reusable `BookService`.
- **Component Design:** Breaking down the UI into modular `ListComponent` and `AddComponent`.
- **UI/UX:** Responsive design using Bootstrap 5, featuring a navigation bar, welcome section, and footer.

## Features

- **Book List:** View all books in the library with their details (Title, Author, Type, Price).
- **Add Book:** A form to add new books to the collection, including selecting the book type (Paperback, Audiobook, etc.).
- **Book Types:** Support for different formats: Paperback, Audiobook, Hardcover, E-Book.
- **Backend Integration:** Full connecting to a MySQL database via PHP scripts.

## Setup Instructions

1.  **Database & Backend:**
    - Import `backend/database.sql` into your MySQL database (e.g., via phpMyAdmin).
    - Ensure the `backend` folder is accessible on your local server (e.g., `htdocs/AngularApp3/backend`).
    - Update `src/app/book.service.ts` if your backend URL differs from `http://localhost/AngularApp3/backend`.

2.  **Frontend (Angular):**
    - Run `npm install` to install dependencies.
    - Run `ng serve` to start the development server.
    - Navigate to `http://localhost:4200/`.

## Technologies

- **Frontend:** Angular 19, TypeScript, Bootstrap 5
- **Backend:** PHP, MySQL

---
*Created as part of the Angular Development curriculum at triOS College.*
