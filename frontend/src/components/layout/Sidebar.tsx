import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">
        SalonFlow
      </h1>

      <nav className="space-y-3">

        <Link className="block hover:text-blue-400" to="/dashboard">
          Dashboard
        </Link>

        <Link className="block hover:text-blue-400" to="/customers">
          Customers
        </Link>

        <Link className="block hover:text-blue-400" to="/employees">
          Employees
        </Link>

        <Link className="block hover:text-blue-400" to="/services">
          Services
        </Link>

        <Link className="block hover:text-blue-400" to="/products">
          Products
        </Link>

        <Link className="block hover:text-blue-400" to="/inventory">
          Inventory
        </Link>

        <Link className="block hover:text-blue-400" to="/appointments">
          Appointments
        </Link>
	<Link className="block hover:text-blue-400" to="/checkout">
 	  Checkout
	</Link>
        <Link className="block hover:text-blue-400" to="/invoices">
          Invoices
        </Link>

        <Link className="block hover:text-blue-400" to="/reports">
          Reports
        </Link>
        <Link to="/settings">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
