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

  getTodoItemList() {
    return this.http.get<TodoItem[]>("https://localhost:44319/api/TodoItems");
  }

  addTodoItem(todoItem: AddTodoItemRequest){
    return this.http.post<TodoItem>("https://localhost:44319/api/TodoItems",todoItem);
  }

  changeTodoItem(todoItem:TodoItem){
    return this.http.put<TodoItem>("https://localhost:44319/api/TodoItems/" + todoItem.id, todoItem);
  }

  deleteTodoItem(todoItem:TodoItem){
    return this.http.delete<TodoItem>("https://localhost:44319/api/TodoItems/" + todoItem.id);
  }

}
