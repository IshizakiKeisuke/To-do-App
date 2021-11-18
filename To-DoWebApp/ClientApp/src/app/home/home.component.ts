import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit, Output } from '@angular/core';
import { FormGroup, SelectMultipleControlValueAccessor } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { TodoItem } from './todoitem.model';
import { AddTodoItemRequest, TodoItemService } from './todoitem.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
                                                                                                                  
export class HomeComponent implements OnInit {
  to_do_list = [] ;

  todoViewMode = "AllTask";

  constructor(private todoItemService: TodoItemService) { }

  ngOnInit(): void {
    this.showTodoItemList();
  }

  showTodoItemList() {
    this.todoItemService.getTodoItemList()
    .subscribe((to_do_items: TodoItem[]) => {
      this.to_do_list = to_do_items;
    });
  }


  input_task = new FormGroup({
    name: new FormControl(''),
  })

  inputItem(): void {
    if (this.input_task.value.name.length > 0 && this.input_task.value.name.length <= 500) {
      this.todoItemService.addTodoItem({
        name: this.input_task.value.name,
        isComplete: false
      }).subscribe(
        () =>this.showTodoItemList()
      );
    }
  }

  deleteTask(todoItem:TodoItem) {
    this.todoItemService.deleteTodoItrem(todoItem).subscribe(todoItem =>this.showTodoItemList());
  }

  changeIsCompleteStatus(todoItem:TodoItem, switchIsComplete: boolean) {
    todoItem.isComplete = switchIsComplete;
    this.todoItemService.changeTodoItem(todoItem).subscribe(
      () =>this.showTodoItemList()
    );
  }

  changeShowAllTask(){
    this.todoViewMode = "AllTask";
  };

  changeShowCpTask(){
    this.todoViewMode = "CpTask";
  }
}


