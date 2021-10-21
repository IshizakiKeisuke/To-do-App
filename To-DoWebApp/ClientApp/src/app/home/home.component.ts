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
   /* var input_task = new FormGroup({
      to: new FormControl(''), 
    })*/
    // this.to_do.push({ id: this.id_count, to: JSON.stringify(input_task.value) });
    this.to_do.push({ id: this.id_count ,to:"otamesi"})

  }
  

}
