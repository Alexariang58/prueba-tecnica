export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: string; // viene serializado en JSON
  updatedAt: string;
};
