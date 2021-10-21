import { Component, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { to_do } from '../product';


import { To_do_list } from '../product';

@Component({
  selector: 'input-task',
  templateUrl: './input-task.component.html',
  styleUrls: ['./input-task.component.css'],
})
export class InputTaskComponent {
  input_list=to_do

  id_count = to_do.length;

  inputItem(): void{
    var input_task = new FormGroup({
      to : new FormControl(''), 
    })
    this.input_list.push({id:this.id_count, to: JSON.stringify(input_task.value)}); 
  }
  
}
