import api from "../api/client";

export interface CustomerSummary {
  id: number;
  first_name: string;
  last_name: string | null;
}

export interface InvoiceItem {
  id: number;
  service_name: string;
  quantity: number;
  unit_price: string;
  total_price: string;
}
export interface InvoiceProductItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: string;
  total_price: string;
}

export interface PaymentSummary {
  id: number;
  amount: string;
  payment_method: string;
  reference_number: string | null;
  created_at: string;
}

export interface Invoice {
  id: number;
  invoice_number: string;

  customer: CustomerSummary;

  appointment_id: number;
  user_id: number;

  subtotal: string;
  discount: string;
  tax: string;
  total: string;

  status: string;
  payment_method: string | null;

  created_at: string;

  items: InvoiceItem[];
  product_items: InvoiceProductItem[];
  payments: PaymentSummary[];

  paid_amount: string;
  balance: string;
  payment_count: number;
  is_paid: boolean;
}

export async function getInvoices(): Promise<Invoice[]> {
  const response = await api.get("/invoices");
  return response.data;
}

export async function getInvoice(
  id: number
): Promise<Invoice> {
  const response = await api.get(
    `/invoices/${id}`
  );
  return response.data;
}

export async function deleteInvoice(
  id: number
): Promise<void> {
  await api.delete(`/invoices/${id}`);
}
