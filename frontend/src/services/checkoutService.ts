import api from "../api/client";

import type { Invoice } from "./invoiceService";


export async function getCheckoutInvoices(): Promise<Invoice[]> {

  const response = await api.get("/invoices");

  return response.data.filter(
    (invoice: Invoice) =>
      !invoice.is_paid
  );

}
