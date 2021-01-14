import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { PublicGuardService as PublicGuard } from './services/public-guard.service';
import { RegisterComponent } from './register/register.component';
import { TodoViewComponent } from './todo-view/todo-view.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PublicGuard],

  },
  {
    path: 'todo/:id',
    component: TodoViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-todo',
    component: CreateTodoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
