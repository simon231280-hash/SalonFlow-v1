import api from "../api/client";

export interface PaymentCreate {
  invoice_id: number;
  amount: string;
  payment_method: string;
  reference_number?: string;
  notes?: string;
}

export async function createPayment(
  payment: PaymentCreate
) {
  const response = await api.post(
    "/payments",
    payment
  );

  return response.data;
}
