import { Component } from '@angular/core';

import { to_do } from '../product';

@Component({
  selector: 'all-item',
  templateUrl: './all_item.component.html',
  styleUrls: ['./all_item.component.css'],
})
export class AllItemComponent {
  to_do = to_do;
  
}
