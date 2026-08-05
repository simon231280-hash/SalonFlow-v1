interface FrequentCustomer {
  customer_id: number;
  customer_name: string;
  total_visits: number;
}

interface Props {
  customers: FrequentCustomer[];
}

export default function FrequentCustomersTable({
  customers,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">
        Most Frequent Customers
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">
              Customer
            </th>

            <th className="text-right py-2">
              Visits
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

              <td className="text-right">
                {customer.total_visits}
              </td>
            </tr>
          ))}

          {customers.length === 0 && (
            <tr>
              <td
                colSpan={2}
                className="py-4 text-center text-gray-500"
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
