interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

interface Props {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table className="w-full bg-white rounded-xl shadow">

      <thead>

        <tr className="border-b">

          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Phone</th>
          <th className="p-4 text-left">Email</th>
          <th className="p-4 text-center">Actions</th>

        </tr>

      </thead>

      <tbody>

        {customers.map((customer) => (

          <tr
            key={customer.id}
            className="border-b"
          >

            <td className="p-4">
              {customer.first_name} {customer.last_name}
            </td>

            <td className="p-4">
              {customer.phone}
            </td>

            <td className="p-4">
              {customer.email}
            </td>

            <td className="p-4 flex justify-center gap-2">

              <button
                onClick={() => onEdit(customer)}
                className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(customer)}
                className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}
