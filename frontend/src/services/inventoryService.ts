import api from "../api/client";

export interface InventoryTransaction {
  id: number;
  product_id: number;
  transaction_type: string;
  quantity: number;
  note: string | null;
  created_at: string;
}

export interface InventoryTransactionCreate {
  product_id: number;
  transaction_type: string;
  quantity: number;
  note?: string;
}

export async function getTransactions(): Promise<InventoryTransaction[]> {
  const response = await api.get("/inventory/transactions");
  return response.data;
}

export async function createTransaction(
  transaction: InventoryTransactionCreate
): Promise<InventoryTransaction> {
  const response = await api.post(
    "/inventory/transaction",
    transaction
  );

  return response.data;
}

export async function getProductHistory(
  productId: number
): Promise<InventoryTransaction[]> {
  const response = await api.get(
    `/inventory/product/${productId}`
  );

  return response.data;
}
