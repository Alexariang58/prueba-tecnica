import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { Product } from '../../models/products.interfaces';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  @Input() products: Product[] = [];
  @Input() loading = false;
  @Input() deletingId: number | null = null;

  @Output() delete = new EventEmitter<number>();
}
