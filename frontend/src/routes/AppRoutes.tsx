import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import Settings from "../pages/settings/Settings";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Customers from "../pages/customers/Customers";
import Employees from "../pages/employees/Employees";
import Services from "../pages/services/Services";
import Products from "../pages/products/Products";
import Inventory from "../pages/inventory/Inventory";
import Appointments from "../pages/appointments/Appointments";
import Invoices from "../pages/invoices/Invoices";
import InvoiceDetails from "../pages/invoices/InvoiceDetails";
import Checkout from "../pages/checkout/Checkout";
import Reports from "../pages/reports/Reports";


export default function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customers"
                    element={
                        <ProtectedRoute>
                            <Customers />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <Employees />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/services"
                    element={
                        <ProtectedRoute>
                            <Services />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/inventory"
                    element={
                        <ProtectedRoute>
                            <Inventory />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />
		<Route
    		    path="/checkout"
    		    element={
        		<ProtectedRoute>
            		    <Checkout />
       			 </ProtectedRoute>
    		    }
		/>
                <Route
                    path="/invoices"
                    element={
                        <ProtectedRoute>
                            <Invoices />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/invoices/:id"
                    element={
                        <ProtectedRoute>
                            <InvoiceDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    }
                />
                <Route
                  path="/settings"
                  element={<Settings />}
                />

            </Routes>

        </BrowserRouter>
    );
}
