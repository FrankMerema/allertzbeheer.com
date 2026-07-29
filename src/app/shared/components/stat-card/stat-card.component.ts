import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
})
export class StatCardComponent {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
}
