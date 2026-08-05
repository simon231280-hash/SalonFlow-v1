import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";
import StatCard from "../../components/dashboard/StatCard";
import { getDashboardSummary } from "../../services/dashboardService";

interface DashboardSummary {
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

function formatMMK(value: string) {
  return `Ks ${Number(value).toLocaleString()}`;
}

export default function Dashboard() {
  const [data, setData] =
    useState<DashboardSummary | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const result = await getDashboardSummary();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back to SalonFlow.
          </p>
        </div>
      </div>

      {!data ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          Loading dashboard...
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            <StatCard
              title="Today's Sales"
              value={formatMMK(data.today_sales)}
              icon="💵"
              color="bg-green-100"
            />

            <StatCard
              title="Expected Revenue"
              value={formatMMK(data.expected_revenue)}
              icon="📈"
              color="bg-blue-100"
            />

            <StatCard
              title="Today's Appointments"
              value={data.today_appointments}
              icon="📅"
              color="bg-purple-100"
            />

            <StatCard
              title="Customers"
              value={data.customers}
              icon="👥"
            />

            <StatCard
              title="Employees"
              value={data.employees}
              icon="💇"
            />

            <StatCard
              title="Products"
              value={data.products}
              icon="🧴"
            />

            <StatCard
              title="Low Stock"
              value={data.low_stock}
              icon="⚠️"
              color="bg-yellow-100"
            />

            <StatCard
              title="Pending Invoices"
              value={data.pending_invoices}
              icon="🧾"
              color="bg-orange-100"
            />

            <StatCard
              title="Paid Invoices"
              value={data.paid_invoices}
              icon="✅"
              color="bg-emerald-100"
            />
          </div>

          {/* Bottom Section */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                📋 Today's Summary
              </h2>

              <div className="space-y-3 text-gray-700">

                <div className="flex justify-between">
                  <span>Total Customers</span>
                  <strong>{data.customers}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Total Employees</span>
                  <strong>{data.employees}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Total Products</span>
                  <strong>{data.products}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Pending Invoices</span>
                  <strong className="text-orange-600">
                    {data.pending_invoices}
                  </strong>
                </div>

              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                ⚡ Quick Status
              </h2>

              <div className="space-y-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Sales Today
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {formatMMK(data.today_sales)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Expected Revenue
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatMMK(data.expected_revenue)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Low Stock Alerts
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    {data.low_stock}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </>
      )}
    </AppLayout>
  );
}
