import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddTodoAction } from '../store/actions/todo.actions';
import { Observable } from 'rxjs';
import AppState from '../store/models/app-state.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  title: FormControl = new FormControl();
  desc: FormControl = new FormControl();
  loading: Observable<boolean> = this.store.select((state: AppState) => state.todo && state.todo.loading);

  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  create() {
    const payload = {
      title: this.title.value,
      desc: this.desc.value,
    };
    this.store.dispatch(new AddTodoAction(payload));
    this.title.disable();
    this.desc.disable();
    this.loading.subscribe(loadStatus => {
      if (!loadStatus){
        this.title.enable();
        this.desc.enable();
        this.router.navigate(['']);
      }
    });
  }
}
