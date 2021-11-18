import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TodoItem } from './todoitem.model';
import { logging } from 'selenium-webdriver';

export type AddTodoItemRequest = Omit<TodoItem, 'id'>;

@Injectable()
export class TodoItemService {
  constructor(private http: HttpClient) {

  }

  getTodoItemList() {
    return this.http.get<TodoItem[]>("api/TodoItems");
  }

  addTodoItem(todoItem: AddTodoItemRequest){
    return this.http.post<TodoItem>("api/TodoItems",todoItem);
  }

  changeTodoItem(todoItem:TodoItem){
    return this.http.put<TodoItem>("api/TodoItems/" + todoItem.id, todoItem);
  }

  deleteTodoItrem(todoItem:TodoItem){
    return this.http.delete<TodoItem>("api/TodoItems/" + todoItem.id);
  }

}
