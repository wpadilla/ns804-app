import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthEffect } from './store/effects/auth.effect';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PublicGuardService } from './services/public-guard.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListService } from './services/todo-list.service';
import { todoListReducer } from './store/reducers/todo-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TodoListComponent
  ],
  imports: [
    JwtModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, }),
    EffectsModule.forRoot([AuthEffect]),
    StoreModule.forRoot({
      auth: authReducer,
      todoList: todoListReducer,
    }),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuardService,
    PublicGuardService,
    TodoListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
