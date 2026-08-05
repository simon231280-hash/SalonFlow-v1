import api from "../api/client";

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string | null;
  description: string | null;
  cost_price: number;
  selling_price: number;
  stock_quantity: number;
  minimum_stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductCreate {
  name: string;
  sku: string;
  category?: string;
  description?: string;
  cost_price: number;
  selling_price: number;
  stock_quantity: number;
  minimum_stock: number;
}

export interface ProductUpdate {
  name?: string;
  sku?: string;
  category?: string;
  description?: string;
  cost_price?: number;
  selling_price?: number;
  stock_quantity?: number;
  minimum_stock?: number;
  is_active?: boolean;
}

export async function getProducts(): Promise<Product[]> {
  const response = await api.get("/products");
  return response.data;
}

export async function getLowStockProducts(): Promise<Product[]> {
  const response = await api.get("/products/low-stock");
  return response.data;
}

export async function createProduct(
  product: ProductCreate
): Promise<Product> {
  const response = await api.post("/products", product);
  return response.data;
}

export async function updateProduct(
  id: number,
  product: ProductUpdate
): Promise<Product> {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
}

export async function deleteProduct(
  id: number
): Promise<void> {
  await api.delete(`/products/${id}`);
}
