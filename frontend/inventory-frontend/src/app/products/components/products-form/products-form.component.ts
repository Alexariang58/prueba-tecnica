import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { CreateProductPayload } from '../../products.service';

type ProductForm = FormGroup<{
  name: FormControl<string>;
  price: FormControl<number | null>;
  stock: FormControl<number | null>;
}>;

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductFormComponent {
  @Input() saving = false;
  @Output() create = new EventEmitter<CreateProductPayload>();

  form: ProductForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    stock: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    this.create.emit({
      name: v.name,
      price: Number(v.price),
      stock: Number(v.stock),
    });
  }

  reset(): void {
    this.form.reset({ name: '', price: null, stock: null });
  }

  isInvalid(controlName: keyof ProductForm['controls']): boolean {
    const c = this.form.controls[controlName];
    return c.invalid && (c.touched || c.dirty);
  }
}
