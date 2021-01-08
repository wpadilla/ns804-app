import { Component, OnInit } from '@angular/core';
import TodoEntity from '../store/models/todo.model';
import { LoadTodoAction } from '../store/actions/todo.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit {
  todo: TodoEntity;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.todo = params['todo'];
    });
  }

}
