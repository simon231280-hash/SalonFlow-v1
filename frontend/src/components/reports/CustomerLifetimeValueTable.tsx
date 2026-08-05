interface CustomerLifetimeValue {
  customer_id: number;
  customer_name: string;
  total_visits: number;
  total_spent: string;
  average_spent: string;
  first_visit: string | null;
  last_visit: string | null;
}

interface Props {
  customers: CustomerLifetimeValue[];
}

export default function CustomerLifetimeValueTable({
  customers,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">
        Customer Lifetime Value
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

            <th className="text-right py-2">
              Total Spent
            </th>

            <th className="text-right py-2">
              Average
            </th>

            <th className="text-center py-2">
              First Visit
            </th>

            <th className="text-center py-2">
              Last Visit
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

              <td className="text-right">
                Ks {customer.total_spent}
              </td>

              <td className="text-right">
                Ks {customer.average_spent}
              </td>

              <td className="text-center">
                {customer.first_visit
                  ? new Date(customer.first_visit).toLocaleDateString()
                  : "-"}
              </td>

              <td className="text-center">
                {customer.last_visit
                  ? new Date(customer.last_visit).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}

          {customers.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-4 text-center text-gray-500"
              >
                No customer lifetime data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
