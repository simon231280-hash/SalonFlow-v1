import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AppLayout from "../../components/layout/AppLayout";
import CustomerTable from "../../components/customers/CustomerTable";
import CustomerForm from "../../components/customers/CustomerForm";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerService";

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load customers.");
    }
  }

  async function handleSave(customer: {
    id?: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
  }) {
    try {
      if (customer.id) {
        await updateCustomer(customer.id, {
          first_name: customer.first_name,
          last_name: customer.last_name,
          phone: customer.phone,
          email: customer.email || null,
        });

        toast.success("Customer updated successfully.");

      } else {
        await createCustomer({
          first_name: customer.first_name,
          last_name: customer.last_name,
          phone: customer.phone,
          email: customer.email || null,
        });

        toast.success("Customer added successfully.");
      }

      await loadCustomers();

      setEditingCustomer(null);
      setShowForm(false);

    } catch (error) {
      console.error(error);
      toast.error("Unable to save customer.");
    }
  }

  async function handleDelete(customer: Customer) {

    const confirmed = window.confirm(
      `Delete ${customer.first_name} ${customer.last_name}?`
    );

    if (!confirmed) return;

    try {

      await deleteCustomer(customer.id);

      await loadCustomers();

      toast.success("Customer deleted successfully.");

    } catch (error) {

      console.error(error);

      toast.error("Unable to delete customer.");

    }

  }

  function handleEdit(customer: Customer) {
    setEditingCustomer(customer);
    setShowForm(true);
  }

  function handleClose() {
    setEditingCustomer(null);
    setShowForm(false);
  }

  return (
    <AppLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <button
          onClick={() => {
            setEditingCustomer(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Customer
        </button>

      </div>

      <CustomerTable
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <CustomerForm
          customer={editingCustomer}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}

    </AppLayout>
  );
}
