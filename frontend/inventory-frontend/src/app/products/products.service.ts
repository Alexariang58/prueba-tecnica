import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/products.interfaces';

export type CreateProductPayload = {
  name: string;
  price: number;
  stock: number;
};

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly baseUrl = '/api/products'; // proxy -> gateway

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  create(payload: CreateProductPayload): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, payload);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}