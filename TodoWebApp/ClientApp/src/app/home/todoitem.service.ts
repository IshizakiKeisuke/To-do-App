import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TodoItem, AppUrl } from './todoitem.model';

export type AddTodoItemRequest = Omit<TodoItem, 'id'>;

@Injectable()
export class TodoItemService {
  constructor(private http: HttpClient) {

  }

  getTodoItemList() {
    return this.http.get<TodoItem[]>(AppUrl);
  }

  addTodoItem(todoItem: AddTodoItemRequest){
    return this.http.post<TodoItem>( AppUrl ,todoItem);
  }

  changeTodoItem(todoItem: TodoItem, switchIsComplete: boolean) {
    return this.http.put<TodoItem>( AppUrl + "/" + todoItem.id, { switchIsComplete: switchIsComplete });
  }

  deleteTodoItem(todoItem:TodoItem){
    return this.http.delete<TodoItem>( AppUrl + "/" + todoItem.id);
  }

}
