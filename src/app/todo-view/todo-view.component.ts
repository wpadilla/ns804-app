import { Component, OnInit } from '@angular/core';
import TodoEntity from '../store/models/todo.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import AppState from '../store/models/app-state.model';
import { DeleteTodoAction, LoadTodoAction } from '../store/actions/todo.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit {
  todo: TodoEntity = {} as any;
  loading: Observable<boolean> = this.store.select((state: AppState) => state.todo && state.todo.loading);
  id: string = this.route.snapshot.paramMap.get('id');;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.select((state: AppState) =>
      state.todoList ? state.todoList.data.find(item => item._id === this.id) : undefined,
    ).subscribe(item => {
      this.todo = item || {} as any;
      if (!item) {
        this.store.dispatch(new LoadTodoAction(this.id));
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


  deleteTodo() {
    this.store.dispatch(new DeleteTodoAction(this.id));
    this.loading.subscribe(loadStatus => {
      if(!loadStatus) {
        this.router.navigate(['']);
      }
    })
  }
}
