import { Component, OnInit } from '@angular/core';
import TodoEntity from '../store/models/todo.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import AppState from '../store/models/app-state.model';
import { DeleteTodoAction, LoadTodoAction, UpdateTodoAction } from '../store/actions/todo.actions';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit {
  todo: TodoEntity = {} as any;
  loading: Observable<boolean> = this.store.select((state: AppState) => state.todo && state.todo.loading);
  id: string = this.route.snapshot.paramMap.get('id');
  edit = false;
  title: FormControl = new FormControl(this.todo.title);
  desc: FormControl = new FormControl(this.todo.desc);

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
            this.title.setValue(todoItem && todoItem.title);
            this.desc.setValue(todoItem && todoItem.desc);
            this.loading.subscribe(loadStatus => {
              if (!this.todo && !loadStatus) {
                this.router.navigate(['/']);
              }
            });

          });
      }
    }).unsubscribe();
  }

  onEdit(): void {
    this.edit = true;
    this.title.setValue(this.todo && this.todo.title);
    this.desc.setValue(this.todo && this.todo.desc);
  }

  deleteTodo(): void {
    this.store.dispatch(new DeleteTodoAction(this.id));
    this.loading.subscribe(loadStatus => {
      if(!loadStatus ) {
        this.router.navigate(['/']);
      }
      }).unsubscribe();
  }

  update(): void {
    const data = { title: this.title.value, desc: this.desc.value };
    this.store.dispatch(new UpdateTodoAction({id: this.id, data }));
    this.desc.disable();
    this.title.disable();
    this.loading.subscribe(loadStatus => {
      if( !loadStatus ) {
        this.desc.enable();
        this.title.enable();
        this.edit = false;
        this.store.select((state: AppState) => {
          if (state.todo){
            this.todo = state.todo.data;
          }
        })
      }
    }).unsubscribe();
  }
}
