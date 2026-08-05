import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";

import {
  getInvoice,
  type Invoice,
} from "../../services/invoiceService";

import {
  createPayment,
} from "../../services/paymentService";

export default function InvoiceDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [invoice, setInvoice] =
    useState<Invoice | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [showPaymentForm, setShowPaymentForm] =
    useState(false);

  const [paymentAmount, setPaymentAmount] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("cash");

  const [referenceNumber, setReferenceNumber] =
    useState("");

  useEffect(() => {
    loadInvoice();
  }, []);

  async function loadInvoice() {
    try {
      const data = await getInvoice(
        Number(id)
      );

      setInvoice(data);

    } catch (error) {
      console.error(error);

      alert(
        "Unable to load invoice."
      );

    } finally {
      setLoading(false);
    }
  }

  async function handlePayment() {
    if (!invoice) return;

    try {
      await createPayment({
        invoice_id: invoice.id,
        amount: paymentAmount,
        payment_method: paymentMethod,
        reference_number:
          referenceNumber || undefined,
      });

      alert(
        "Payment saved successfully."
      );

      setPaymentAmount("");
      setReferenceNumber("");
      setShowPaymentForm(false);

      await loadInvoice();

    } catch (error: any) {

      console.error(error);

      alert(
        error?.response?.data?.detail ??
        "Unable to save payment."
      );
    }
  }


  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">
          Loading...
        </div>
      </AppLayout>
    );
  }


  if (!invoice) {
    return (
      <AppLayout>
        <div className="p-8">
          Invoice not found.
        </div>
      </AppLayout>
    );
  }


  return (
    <AppLayout>

      <div className="mx-auto max-w-4xl bg-white rounded-xl shadow p-8">

        <div className="flex justify-between mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Invoice {invoice.invoice_number}
            </h1>

            <p className="text-slate-600">
              {invoice.customer.first_name}{" "}
              {invoice.customer.last_name ?? ""}
            </p>

            <p className="mt-2">
              Status:
              <span className="ml-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                {invoice.status}
              </span>
            </p>

          </div>


          <button
            onClick={() => navigate(-1)}
            className="rounded bg-slate-600 px-4 py-2 text-white"
          >
            Back
          </button>

        </div>


        <h2 className="font-semibold text-xl mb-3">
          Services
        </h2>


        <table className="w-full mb-8">

          <thead>
            <tr className="border-b">

              <th className="text-left py-2">
                Service
              </th>

              <th className="text-center">
                Qty
              </th>

              <th className="text-right">
                Total
              </th>

            </tr>
          </thead>


          <tbody>

            {invoice.items.map(item => (

              <tr key={item.id}>

                <td className="py-2">
                  {item.service_name}
                </td>

                <td className="text-center">
                  {item.quantity}
                </td>

                <td className="text-right">
                  {Number(item.total_price).toLocaleString()} Ks
                </td>

              </tr>

            ))}

          </tbody>

        </table>


        <h2 className="font-semibold text-xl mb-3">
          Products
        </h2>


        {invoice.product_items.length === 0 ? (

          <p className="mb-8 text-slate-500">
            No products.
          </p>

        ) : (

          <table className="w-full mb-8">

            <thead>
              <tr className="border-b">

                <th className="text-left py-2">
                  Product
                </th>

                <th className="text-center">
                  Qty
                </th>

                <th className="text-right">
                  Total
                </th>

              </tr>
            </thead>


            <tbody>

              {invoice.product_items.map(item => (

                <tr key={item.id}>

                  <td className="py-2">
                    Product #{item.product_id}
                  </td>

                  <td className="text-center">
                    {item.quantity}
                  </td>

                  <td className="text-right">
                    {Number(item.total_price).toLocaleString()} Ks
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}


        <h2 className="font-semibold text-xl mb-3">
          Payments
        </h2>


        {invoice.payments.length === 0 ? (

          <p className="text-slate-500 mb-4">
            No payments yet.
          </p>

        ) : (

          invoice.payments.map(payment => (

            <div
              key={payment.id}
              className="flex justify-between border-b py-2"
            >

              <span>
                {payment.payment_method}
              </span>

              <span>
                {Number(payment.amount).toLocaleString()} Ks
              </span>

            </div>

          ))

        )}


        <div className="mt-8 border-t pt-6 space-y-3">

          <div className="flex justify-between">
            <span>Total</span>

            <strong>
              {Number(invoice.total).toLocaleString()} Ks
            </strong>

          </div>


          <div className="flex justify-between">
            <span>Paid</span>

            <strong>
              {Number(invoice.paid_amount).toLocaleString()} Ks
            </strong>

          </div>


          <div className="flex justify-between">
            <span>Balance</span>

            <strong>
              {Number(invoice.balance).toLocaleString()} Ks
            </strong>

          </div>


        </div>


        {invoice.balance !== "0.00" && (

          <div className="mt-8">

            {!showPaymentForm ? (

              <button
                onClick={() =>
                  setShowPaymentForm(true)
                }
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Add Payment
              </button>

            ) : (

              <div className="border rounded-lg p-5 space-y-4">

                <h3 className="font-semibold text-lg">
                  Add Payment
                </h3>


                <input
                  type="number"
                  placeholder="Amount"
                  value={paymentAmount}
                  onChange={(e) =>
                    setPaymentAmount(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3"
                />


                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3"
                >

                  <option value="cash">
                    Cash
                  </option>

                  <option value="card">
                    Card
                  </option>

                  <option value="mobile">
                    Mobile Payment
                  </option>

                </select>


                <input
                  type="text"
                  placeholder="Reference number (optional)"
                  value={referenceNumber}
                  onChange={(e) =>
                    setReferenceNumber(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3"
                />


                <button
                  onClick={handlePayment}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  Save Payment
                </button>


              </div>

            )}

          </div>

        )}


      </div>

    </AppLayout>
  );
}
