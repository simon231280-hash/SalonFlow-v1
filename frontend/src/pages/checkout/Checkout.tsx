import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";
import CheckoutTable from "../../components/checkout/CheckoutTable";
import CheckoutDialog from "../../components/checkout/CheckoutDialog";

import { getCheckoutInvoices } from "../../services/checkoutService";
import { createPayment } from "../../services/paymentService";

import type { Invoice } from "../../services/invoiceService";

export default function Checkout() {

  const [invoices, setInvoices] =
    useState<Invoice[]>([]);

  const [showDialog, setShowDialog] =
    useState(false);

  const [selectedInvoice, setSelectedInvoice] =
    useState<Invoice | null>(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {

    const data =
      await getCheckoutInvoices();

    setInvoices(data);

  }

  function handleCheckout(
    invoice: Invoice
  ) {

    setSelectedInvoice(invoice);

    setShowDialog(true);

  }

  async function handlePayment(
    invoice: Invoice,
    payment: {
      amount: string;
      payment_method: string;
      reference_number?: string;
      notes?: string;
    }
  ) {

    try {

      await createPayment({

        invoice_id: invoice.id,

        amount: payment.amount,

        payment_method: payment.payment_method,

        reference_number:
          payment.reference_number,

        notes:
          payment.notes,

      });

      await loadInvoices();

      setShowDialog(false);

      setSelectedInvoice(null);

      alert("Payment completed successfully.");

    } catch (error) {

      console.error(error);

      alert("Unable to complete payment.");

    }

  }

  return (

    <AppLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Checkout
        </h1>

      </div>

      <CheckoutTable
        invoices={invoices}
        onCheckout={handleCheckout}
      />

      {showDialog && selectedInvoice && (

        <CheckoutDialog
          invoice={selectedInvoice}
          onClose={() => {

            setShowDialog(false);

            setSelectedInvoice(null);

          }}
          onPay={handlePayment}
        />

      )}

    </AppLayout>

  );

}
