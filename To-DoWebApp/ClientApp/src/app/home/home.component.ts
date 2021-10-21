import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { to_do } from '../product';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  to_do = to_do;

  id_count = to_do.length;
  
  input_task = new FormGroup({
    to : new FormControl(''), 
  })

  inputItem(): void {
    this.to_do.push({ to: this.input_task.value.to });
    console.log(this.id_count);
  }
}
