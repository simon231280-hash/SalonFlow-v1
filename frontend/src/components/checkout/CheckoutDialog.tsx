import { useState } from "react";
import type { Invoice } from "../../services/invoiceService";

interface Props {
  invoice: Invoice;
  onClose: () => void;
  onPay: (
    invoice: Invoice,
    payment: {
      amount: string;
      payment_method: string;
      reference_number?: string;
      notes?: string;
    }
  ) => Promise<void>;
}

export default function CheckoutDialog({
  invoice,
  onClose,
  onPay,
}: Props) {

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const [amount, setAmount] =
    useState(invoice.balance);

  const [referenceNumber, setReferenceNumber] =
    useState("");

  const [notes, setNotes] =
    useState("");

  async function submit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    await onPay(invoice, {
      amount,
      payment_method: paymentMethod,
      reference_number: referenceNumber,
      notes,
    });

  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl w-[550px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Checkout
        </h2>

        <form
          onSubmit={submit}
          className="space-y-4"
        >

          <div>

            <label className="font-semibold">
              Invoice
            </label>

            <input
              className="w-full border rounded-lg p-3 bg-gray-100"
              value={invoice.invoice_number}
              readOnly
            />

          </div>

          <div>

            <label className="font-semibold">
              Customer
            </label>

            <input
              className="w-full border rounded-lg p-3 bg-gray-100"
              value={`${invoice.customer.first_name} ${invoice.customer.last_name ?? ""}`}
              readOnly
            />

          </div>

          <div>

            <label className="font-semibold">
              Payment Method
            </label>

            <select
              className="w-full border rounded-lg p-3"
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            >

              <option>Cash</option>
              <option>Card</option>
              <option>KBZPay</option>
              <option>WavePay</option>

            </select>

          </div>

          <div>

            <label className="font-semibold">
              Amount
            </label>

            <input
              type="number"
              step="0.01"
              className="w-full border rounded-lg p-3"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />

          </div>

          <div>

            <label className="font-semibold">
              Reference Number
            </label>

            <input
              className="w-full border rounded-lg p-3"
              value={referenceNumber}
              onChange={(e) =>
                setReferenceNumber(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label className="font-semibold">
              Notes
            </label>

            <textarea
              className="w-full border rounded-lg p-3"
              rows={3}
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="border rounded-lg px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white rounded-lg px-4 py-2"
            >
              Complete Payment
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
