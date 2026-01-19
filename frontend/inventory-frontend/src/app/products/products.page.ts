import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';
import { ProductsService, CreateProductPayload } from './products.service';
import { Product } from './models/products.interfaces';
import { ProductFormComponent } from './components/products-form/products-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ButtonComponent } from '../shared/ui/button/button.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ProductFormComponent, ProductsListComponent],
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPageComponent implements OnInit {
  @ViewChild(ProductFormComponent) formComp?: ProductFormComponent;

  products: Product[] = [];
  loading = false;
  saving = false;
  deletingId: number | null = null;
  errorMsg = '';

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.load();
  }

  private extractErrorMessage(err: unknown, fallback: string): string {
    if (err instanceof HttpErrorResponse) {
      const body = err.error;
      if (body?.message) {
        return Array.isArray(body.message) ? body.message.join(', ') : body.message;
      }
    }
    return fallback;
  }

  load(): void {
    this.errorMsg = '';
    this.loading = true;

    this.productsService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => (this.products = data),
        error: (err) => (this.errorMsg = this.extractErrorMessage(err, 'No se pudo cargar la lista de productos.')),
      });
  }

  onCreate(payload: CreateProductPayload): void {
    this.errorMsg = '';
    this.saving = true;

    this.productsService
      .create(payload)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.formComp?.reset();
          this.load();
        },
        error: (err) => (this.errorMsg = this.extractErrorMessage(err, 'No se pudo crear el producto.')),
      });
  }

  onDelete(id: number): void {
    const ok = confirm('¿Seguro que deseas eliminar este producto?');
    if (!ok) return;

    this.errorMsg = '';
    this.deletingId = id;

    this.productsService
      .remove(id)
      .pipe(finalize(() => (this.deletingId = null)))
      .subscribe({
        next: () => this.load(),
        error: (err) => (this.errorMsg = this.extractErrorMessage(err, 'No se pudo eliminar el producto.')),
      });
  }
}
