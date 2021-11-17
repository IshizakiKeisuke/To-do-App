import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    this.showTodoItems();
  }

  showTodoItems() {
    this.todoItemService.getTodoItems()
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
      }).subscribe();

      this.showTodoItems();
    }
  }

  deleteTask(num: number) {
    this.to_do_list.splice(num, 1);
  }

  changeIsCompleteStatus(index: number, isComplete: boolean) {
    this.to_do_list[index].isComplete = isComplete;
  }

  changeShowAllTask() {
    this.todoViewMode = "AllTask";
  }

  changeShowCpTask() {
    this.todoViewMode ="CpTask";
  }
}


