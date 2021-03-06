import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from './todoitem.model';

export type AddTodoItemRequest = Omit<TodoItem, 'id'>;

@Injectable()
export class TodoItemService {
  constructor(private http: HttpClient) {

  }

  getTodoItemList() {
    return this.http.get<TodoItem[]>("api/TodoItems");
  }

  addTodoItem(todoItem: AddTodoItemRequest){
    return this.http.post<TodoItem>( "api/TodoItems" ,todoItem);
  }

  changeTodoItem(todoItem: TodoItem, switchIsComplete: boolean) {
    return this.http.put<TodoItem>("api/TodoItems/" + todoItem.id, { switchIsComplete: switchIsComplete });
  }

  deleteTodoItem(todoItem:TodoItem){
    return this.http.delete<TodoItem>("api/TodoItems/" + todoItem.id);
  }

}
