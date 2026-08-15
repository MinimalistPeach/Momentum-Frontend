import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent {
  tasks = [
    { id: 1, title: 'Item 1', done: true },
    { id: 2, title: 'Item 2', done: true },
    { id: 3, title: 'Item 3', done: false }
  ];

  toggle(task: any): void {
    task.done = !task.done;
  }

  get completedCount(): number {
    return this.tasks.filter(t => t.done).length;
  }

  get totalCount(): number {
    return this.tasks.length;
  }

  get progressPct(): number {
    if (this.totalCount === 0) return 0;
    return Math.round((this.completedCount / this.totalCount) * 100);
  }
}
