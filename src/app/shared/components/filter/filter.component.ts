import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FilterModules } from '../../modules/filter.module';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FilterModules],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  filterValue = signal('');

  @Output() filterChanged = new EventEmitter<string>();

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValue.set(value);
    this.filterChanged.emit(value);
  }
}
