import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

// Application routes
export const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'add', component: AddComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'delete', redirectTo: '/list', pathMatch: 'full' },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];
