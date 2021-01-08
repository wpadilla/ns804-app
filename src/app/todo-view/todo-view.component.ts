import { Component, OnInit } from '@angular/core';
import TodoEntity from '../store/models/todo.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import AppState from '../store/models/app-state.model';
import { LoadTodoAction } from '../store/actions/todo.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit {
  todo: TodoEntity = {} as any;
  loading: Observable<boolean> = this.store.select((state: AppState) => state.todo && state.todo.loading);
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.select((state: AppState) =>
      state.todoList ? state.todoList.data.find(item => item._id === id) : undefined,
    ).subscribe(item => {
      this.todo = item || {} as any;
      if (!item) {
        this.store.dispatch(new LoadTodoAction(id));
        this.store.select((state: AppState) => state.todo && state.todo.data)
          .subscribe(todoItem => {
            this.todo = todoItem;
            this.loading.subscribe(loadStatus => {
              if (!this.todo && !loadStatus) {
                this.router.navigate(['']);
              }
            });

          });
      }
    });
  }
}
