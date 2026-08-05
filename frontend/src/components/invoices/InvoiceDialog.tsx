import type { Invoice } from "../../services/invoiceService";

interface Props {
  invoice: Invoice;
  onClose: () => void;
}

export default function InvoiceDialog({
  invoice,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Invoice {invoice.invoice_number}
          </h2>

          <button
            onClick={onClose}
            className="px-3 py-2 rounded bg-slate-200 hover:bg-slate-300"
          >
            Close
          </button>
        </div>

        <div className="mb-6">
          <p>
            <strong>Customer:</strong>{" "}
            {invoice.customer.first_name}{" "}
            {invoice.customer.last_name ?? ""}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {invoice.status}
          </p>

          <p>
            <strong>Total:</strong> £
            {Number(invoice.total).toFixed(2)}
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-2">
          Services
        </h3>

        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 text-left">Service</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-right">Price</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map(item => (
              <tr key={item.id} className="border-t">
                <td className="p-2">
                  {item.service_name}
                </td>

                <td className="p-2 text-center">
                  {item.quantity}
                </td>

                <td className="p-2 text-right">
                  £{Number(item.total_price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-lg font-semibold mb-2">
          Products
        </h3>

        <table className="w-full border">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 text-left">
                Product ID
              </th>

              <th className="p-2 text-center">
                Qty
              </th>

              <th className="p-2 text-right">
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            {invoice.product_items.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-4 text-center text-slate-500"
                >
                  No products.
                </td>
              </tr>
            ) : (
              invoice.product_items.map(item => (
                <tr
                  key={item.id}
                  className="border-t"
                >
                  <td className="p-2">
                    #{item.product_id}
                  </td>

                  <td className="p-2 text-center">
                    {item.quantity}
                  </td>

                  <td className="p-2 text-right">
                    £{Number(item.total_price).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}
