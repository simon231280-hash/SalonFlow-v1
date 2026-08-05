interface TopCustomer {
  customer_id: number;
  customer_name: string;
  total_visits: number;
  total_spent: string;
}

interface Props {
  customers: TopCustomer[];
}

export default function TopCustomersTable({
  customers,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">
        Top Spending Customers
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Customer</th>
            <th className="text-center py-2">Visits</th>
            <th className="text-right py-2">
              Total Spent (MMK)
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.customer_id}
              className="border-b"
            >
              <td className="py-2">
                {customer.customer_name}
              </td>

              <td className="text-center">
                {customer.total_visits}
              </td>

              <td className="text-right">
                Ks {customer.total_spent}
              </td>
            </tr>
          ))}

          {customers.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="text-center py-4 text-gray-500"
              >
                No customer data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
