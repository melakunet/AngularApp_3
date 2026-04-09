import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

// All application routes — protected routes require login via AuthGuard
export const routes: Routes = [
  { path: 'list',        component: ListComponent,     canActivate: [AuthGuard] },
  { path: 'add',         component: AddComponent,      canActivate: [AuthGuard] },
  { path: 'update/:id',  component: UpdateComponent,   canActivate: [AuthGuard] },
  { path: 'delete',      redirectTo: '/list',           pathMatch: 'full' },
  { path: 'login',       component: LoginComponent },
  { path: 'register',    component: RegisterComponent },
  { path: '',            redirectTo: '/login',          pathMatch: 'full' }
];
