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
