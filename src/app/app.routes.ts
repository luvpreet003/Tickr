import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UsersComponent } from './pages/users/users.component';
import { BoardComponent } from './pages/board/board.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full', // Redirect root to login
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Protect all child routes
    children: [
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'board',
        component: BoardComponent,
      },
      {
        path: 'board/:projectId',
        component: BoardComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Catch-all route
];
