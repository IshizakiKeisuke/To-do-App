import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TodoItem } from './todoitem.model';

export type AddTodoItemRequest = Omit<TodoItem, 'id'>;

@Injectable()
export class TodoItemService {
  constructor(private http: HttpClient) {

  }

  getTodoItems() {
    return this.http.get<TodoItem[]>("api/TodoItems");
  }

  addTodoItem(todoItem: AddTodoItemRequest){
    return this.http.post<TodoItem>("api/TodoItems",todoItem);
    
  }

}
