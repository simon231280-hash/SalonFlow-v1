import api from "../api/client";

export interface DashboardSummary {
  today_sales: string;
  today_appointments: number;
  expected_revenue: string;
  customers: number;
  employees: number;
  products: number;
  low_stock: number;
  pending_invoices: number;
  paid_invoices: number;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await api.get<DashboardSummary>(
    "/dashboard/today"
  );

  return response.data;
}
