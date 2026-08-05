import api from "../api/client";

/* ---------- Daily ---------- */

export interface DailySalesReport {
  date: string;
  total_sales: string;
  invoice_count: number;
  payment_count: number;
}

export async function getDailySales(
  reportDate?: string
): Promise<DailySalesReport> {
  const response = await api.get(
    "/reports/sales/daily",
    {
      params: {
        report_date: reportDate,
      },
    }
  );

  return response.data;
}

/* ---------- Monthly ---------- */

export interface MonthlySalesReport {
  year: number;
  month: number;
  total_sales: string;
  invoice_count: number;
  payment_count: number;
}

export async function getMonthlySales(
  year: number,
  month: number
): Promise<MonthlySalesReport> {
  const response = await api.get(
    "/reports/sales/monthly",
    {
      params: {
        year,
        month,
      },
    }
  );

  return response.data;
}

/* ---------- Service Sales ---------- */

export interface ServiceSalesReport {
  service_name: string;
  total_bookings: number;
  total_revenue: string;
}

export async function getServiceSales() {
  const response = await api.get(
    "/reports/sales/services"
  );

  return response.data;
}

/* ---------- Product Sales ---------- */

export interface ProductSalesReport {
  product_name: string;
  units_sold: number;
  total_revenue: string;
  current_stock: number;
}

export async function getProductSales() {
  const response = await api.get(
    "/reports/sales/products"
  );

  return response.data;
}

/* ---------- Employee Sales ---------- */

export interface EmployeeSalesReport {
  employee_id: number;
  employee_name: string;
  completed_appointments: number;
  total_revenue: string;
}

export async function getEmployeeSales() {
  const response = await api.get(
    "/reports/sales/employees"
  );

  return response.data;
}

/* ---------- Low Stock ---------- */

export interface LowStockReport {
  product_id: number;
  product_name: string;
  current_stock: number;
  minimum_stock: number;
}

export async function getLowStockReport() {
  const response = await api.get(
    "/reports/inventory/low-stock"
  );

  return response.data;
}

/* ---------- Inventory Valuation ---------- */

export interface InventoryValuationReport {
  product_id: number;
  product_name: string;
  stock_quantity: number;
  unit_price: string;
  stock_value: string;
}

export async function getInventoryValuation() {
  const response = await api.get(
    "/reports/inventory/valuation"
  );

  return response.data;
}

/* ---------- Stock Movements ---------- */

export interface StockMovementReport {
  product_name: string;
  transaction_type: string;
  quantity: number;
  note: string | null;
  created_at: string;
}

export async function getStockMovements() {
  const response = await api.get(
    "/reports/inventory/stock-movement"
  );

  return response.data;
}

/* ---------- Top Customers ---------- */

export interface TopCustomerReport {
  customer_id: number;
  customer_name: string;
  total_visits: number;
  total_spent: string;
}

export async function getTopCustomers() {
  const response = await api.get(
    "/reports/customers/top-spenders"
  );

  return response.data;
}

/* ---------- Frequent Customers ---------- */

export interface FrequentCustomerReport {
  customer_id: number;
  customer_name: string;
  total_visits: number;
}

export async function getFrequentCustomers() {
  const response = await api.get(
    "/reports/customers/most-frequent"
  );

  return response.data;
}

/* ---------- Customer Lifetime Value ---------- */

export interface CustomerLifetimeValueReport {
  customer_id: number;
  customer_name: string;
  total_visits: number;
  total_spent: string;
  average_spent: string;
  first_visit: string | null;
  last_visit: string | null;
}

export async function getCustomerLifetimeValue() {
  const response = await api.get(
    "/reports/customers/lifetime-value"
  );

  return response.data;
}
