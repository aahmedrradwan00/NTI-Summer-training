import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() items: any[] = [];
  @Output() filteredItems = new EventEmitter<any[]>();
  minPrice: number = 0;
  maxPrice: number = 1000;
  minRating: number = 0;
  maxRating: number = 5;

  filterItems() {
    const filteredItems = this.items.filter(item => {
      return (
        item.price >= this.minPrice &&
        item.price <= this.maxPrice &&
        item.rating >= this.minRating &&
        item.rating <= this.maxRating
      );
    });

    this.filteredItems.emit(filteredItems);
  }
}
