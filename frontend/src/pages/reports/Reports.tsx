import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";

import ReportCard from "../../components/reports/ReportCard";
import ServiceSalesTable from "../../components/reports/ServiceSalesTable";
import ProductSalesTable from "../../components/reports/ProductSalesTable";
import EmployeeSalesTable from "../../components/reports/EmployeeSalesTable";
import LowStockTable from "../../components/reports/LowStockTable";

import TopCustomersTable from "../../components/reports/TopCustomersTable";
import FrequentCustomersTable from "../../components/reports/FrequentCustomersTable";
import InventoryValuationTable from "../../components/reports/InventoryValuationTable";
import StockMovementsTable from "../../components/reports/StockMovementsTable";
import CustomerLifetimeValueTable from "../../components/reports/CustomerLifetimeValueTable";

import {
  getDailySales,
  getMonthlySales,
  getServiceSales,
  getProductSales,
  getEmployeeSales,
  getLowStockReport,
  getTopCustomers,
  getFrequentCustomers,
  getInventoryValuation,
  getStockMovements,
  getCustomerLifetimeValue,
} from "../../services/reportService";

import type {
  DailySalesReport,
  MonthlySalesReport,
  ServiceSalesReport,
  ProductSalesReport,
  EmployeeSalesReport,
  LowStockReport,
  TopCustomerReport,
  FrequentCustomerReport,
  InventoryValuationReport,
  StockMovementReport,
  CustomerLifetimeValueReport,
} from "../../services/reportService";

export default function Reports() {
  const [daily, setDaily] =
    useState<DailySalesReport | null>(null);

  const [monthly, setMonthly] =
    useState<MonthlySalesReport | null>(null);

  const [services, setServices] =
    useState<ServiceSalesReport[]>([]);

  const [products, setProducts] =
    useState<ProductSalesReport[]>([]);

  const [employees, setEmployees] =
    useState<EmployeeSalesReport[]>([]);

  const [lowStock, setLowStock] =
    useState<LowStockReport[]>([]);

  const [topCustomers, setTopCustomers] =
    useState<TopCustomerReport[]>([]);

  const [frequentCustomers, setFrequentCustomers] =
    useState<FrequentCustomerReport[]>([]);

  const [inventory, setInventory] =
    useState<InventoryValuationReport[]>([]);

  const [movements, setMovements] =
    useState<StockMovementReport[]>([]);

  const [lifetime, setLifetime] =
    useState<CustomerLifetimeValueReport[]>([]);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const today = new Date();

      const year = today.getFullYear();

      const month = today.getMonth() + 1;

      const [
        dailyResult,
        monthlyResult,
        serviceResult,
        productResult,
        employeeResult,
        lowStockResult,
        topCustomerResult,
        frequentCustomerResult,
        inventoryResult,
        movementResult,
        lifetimeResult,
      ] = await Promise.all([
        getDailySales(),
        getMonthlySales(year, month),
        getServiceSales(),
        getProductSales(),
        getEmployeeSales(),
        getLowStockReport(),
        getTopCustomers(),
        getFrequentCustomers(),
        getInventoryValuation(),
        getStockMovements(),
        getCustomerLifetimeValue(),
      ]);

      setDaily(dailyResult);
      setMonthly(monthlyResult);
      setServices(serviceResult);
      setProducts(productResult);
      setEmployees(employeeResult);
      setLowStock(lowStockResult);

      setTopCustomers(topCustomerResult);
      setFrequentCustomers(
        frequentCustomerResult
      );
      setInventory(inventoryResult);
      setMovements(movementResult);
      setLifetime(lifetimeResult);
    } catch (error) {
      console.error(
        "Failed to load reports:",
        error
      );
    }
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-8">
        Reports Dashboard
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard
          title="Today's Sales"
          value={`Ks ${daily?.total_sales ?? "0.00"}`}
        />

        <ReportCard
          title="Today's Payments"
          value={daily?.payment_count ?? 0}
        />

        <ReportCard
          title="Monthly Sales"
          value={`Ks ${monthly?.total_sales ?? "0.00"}`}
        />

        <ReportCard
          title="Monthly Invoices"
          value={monthly?.invoice_count ?? 0}
        />
      </div>

      <ServiceSalesTable
        services={services}
      />

      <ProductSalesTable
        products={products}
      />

      <EmployeeSalesTable
        employees={employees}
      />

      <LowStockTable
        products={lowStock}
      />

      <TopCustomersTable
        customers={topCustomers}
      />

      <FrequentCustomersTable
        customers={frequentCustomers}
      />

      <InventoryValuationTable
        products={inventory}
      />

      <StockMovementsTable
        movements={movements}
      />

      <CustomerLifetimeValueTable
        customers={lifetime}
      />
    </AppLayout>
  );
}
