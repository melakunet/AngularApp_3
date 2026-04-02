# Reader Home (AngularApp3)

**Assignment 5 for Angular Development Course**
**Course Code:** MWD4B (Angular)
**Student:** Etefworkie Melaku
**Date:** April 2026

## Features

- **Book List:** View all books with cover images, type badge, and price.
- **Add Book:** Form to add a new book with optional cover image upload.
- **Edit Book:** Pre-filled form to update book details and replace the cover image.
- **Delete Book:** Delete a book from the list with a confirmation prompt.
- **File Upload:** Book cover images stored in `backend/uploads/`.

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
