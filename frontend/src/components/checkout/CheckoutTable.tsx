import type { Invoice } from "../../services/invoiceService";

interface Props {
  invoices: Invoice[];
  onCheckout: (invoice: Invoice) => void;
}

export default function CheckoutTable({
  invoices,
  onCheckout,
}: Props) {
  return (
    <table className="w-full bg-white rounded-xl shadow">

      <thead>

        <tr className="border-b">
          <th className="p-4 text-left">Invoice</th>
          <th className="p-4 text-left">Customer</th>
          <th className="p-4 text-right">Total</th>
          <th className="p-4 text-center">Status</th>
          <th className="p-4 text-center">Action</th>
        </tr>

      </thead>

      <tbody>

        {invoices.map((invoice) => (

          <tr
            key={invoice.id}
            className="border-b"
          >

            <td className="p-4">
              {invoice.invoice_number}
            </td>

            <td className="p-4">
              {invoice.customer.first_name}{" "}
              {invoice.customer.last_name ?? ""}
            </td>

            <td className="p-4 text-right">
              {invoice.total}
            </td>

            <td className="p-4 text-center">
              {invoice.status}
            </td>

            <td className="p-4 text-center">

              <button
                onClick={() => onCheckout(invoice)}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Checkout
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}
