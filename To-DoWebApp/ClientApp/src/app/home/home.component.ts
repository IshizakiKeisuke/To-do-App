import { Component, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { cp_to_do, to_do } from '../product';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  to_do_list= to_do;
  cp_to_do_list= cp_to_do;

  id_count = to_do.length;

  TaskStatus = {
    Complete: 'Complete',
    InProgress: 'InProgress',
  }
    listStatus = "false";


  input_task = new FormGroup({
    to: new FormControl(''),
  })

  inputItem(): void {
    if (this.input_task.value.to.length > 0 && this.input_task.value.to.length <= 500) {
      this.to_do_list.push({ to: this.input_task.value.to });
    }
  }

  deleteTask(num: number) {
    to_do.splice(num, 1);
  }

  deleteCpTask(num: number) {
    cp_to_do.splice(num, 1);
  }

  mvTask(num: number) {
    cp_to_do.push(to_do[num]);
    to_do.splice(num, 1);
  }

  mvCpTask(num: number) {
    to_do.push(cp_to_do[num]);
    cp_to_do.splice(num, 1);
  }

  changeShowAllTask() {
    console.log("All task");
    this.listStatus ="InProgress";
  }

  changeShowCpTask() {
    console.log("Cp task");
    this.listStatus = "Complete";
  }
}
