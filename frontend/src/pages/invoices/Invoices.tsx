import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import InvoiceTable from "../../components/invoices/InvoiceTable";
import InvoiceDialog from "../../components/invoices/InvoiceDialog";

import {
  getInvoices,
  deleteInvoice,
} from "../../services/invoiceService";

import type {
  Invoice,
} from "../../services/invoiceService";

export default function Invoices() {

  const [invoices, setInvoices] =
    useState<Invoice[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] =
    useState(true);
  const [selectedInvoice, setSelectedInvoice] =
    useState<Invoice | null>(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {

    try {

      const data =
        await getInvoices();

      setInvoices(data);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to load invoices."
      );

    } finally {

      setLoading(false);

    }

  }
  async function handleDelete(
    invoice: Invoice
  ) {

    const confirmed = window.confirm(
      `Delete invoice ${invoice.invoice_number}?`
    );

    if (!confirmed) return;

    try {

      await deleteInvoice(invoice.id);

      await loadInvoices();

    } catch (error) {

      console.error(error);

      alert(
        "Unable to delete invoice."
      );

    }

  }

  return (

    <AppLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Invoices
          </h1>

          <p className="text-slate-600 mt-2">
            Manage customer invoices.
          </p>

        </div>

      </div>

      {loading ? (

        <div className="bg-white rounded-xl shadow p-8 text-center">
          Loading invoices...
        </div>

      ) : (

        <InvoiceTable
         invoices={invoices}
         onView={(invoice) =>
         navigate(`/invoices/${invoice.id}`)
      }
         onDelete={handleDelete}
   />
 )}  
      
      {selectedInvoice && (
        <InvoiceDialog
         invoice={selectedInvoice}
         onClose={() =>
         setSelectedInvoice(null)
    }
  />
)}
    </AppLayout>

  );

}
