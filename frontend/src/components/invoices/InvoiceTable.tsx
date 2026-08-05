import type { Invoice } from "../../services/invoiceService";

interface Props {
  invoices: Invoice[];
  onView: (invoice: Invoice) => void;
  onDelete: (invoice: Invoice) => void;
}

export default function InvoiceTable({
  invoices,
  onView,
  onDelete,
}: Props) {
  return (
    <table className="w-full bg-white rounded-xl shadow">
      <thead>
        <tr className="border-b bg-slate-50">
          <th className="p-4 text-left">Invoice #</th>
          <th className="p-4 text-left">Customer</th>
          <th className="p-4 text-right">Subtotal</th>
          <th className="p-4 text-right">Discount</th>
          <th className="p-4 text-right">Tax</th>
          <th className="p-4 text-right">Total</th>
          <th className="p-4 text-center">Status</th>
          <th className="p-4 text-center">Date</th>
          <th className="p-4 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {invoices.length === 0 ? (
          <tr>
            <td
              colSpan={9}
              className="p-8 text-center text-slate-500"
            >
              No invoices found.
            </td>
          </tr>
        ) : (
          invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="p-4 font-medium">
                {invoice.invoice_number}
              </td>

              <td className="p-4">
                {invoice.customer.first_name}{" "}
                {invoice.customer.last_name ?? ""}
              </td>

              <td className="p-4 text-right">
                £{Number(invoice.subtotal).toFixed(2)}
              </td>

              <td className="p-4 text-right">
                £{Number(invoice.discount).toFixed(2)}
              </td>

              <td className="p-4 text-right">
                £{Number(invoice.tax).toFixed(2)}
              </td>

              <td className="p-4 text-right font-semibold">
                £{Number(invoice.total).toFixed(2)}
              </td>

              <td className="p-4 text-center">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                  {invoice.status}
                </span>
              </td>

              <td className="p-4 text-center">
                {new Date(
                  invoice.created_at
                ).toLocaleDateString()}
              </td>

              <td className="p-4 text-center space-x-2">
  <button
    onClick={() => onView(invoice)}
    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
  >
    View
  </button>

  <button
    onClick={() => onDelete(invoice)}
    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
  >
    Delete
  </button>
</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
