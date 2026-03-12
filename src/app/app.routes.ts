import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

// Define the application routes for navigation
export const routes: Routes = [
  { path: 'list', component: ListComponent },   // Route to display all books
  { path: 'add', component: AddComponent },      // Route to add a new book
  { path: '', redirectTo: '/list', pathMatch: 'full' }  // Default redirect to /list
];
