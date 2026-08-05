import type { Employee } from "../../services/employeeService";


interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table className="w-full bg-white rounded-xl shadow">

      <thead>

        <tr className="border-b">
          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Position</th>
          <th className="p-4 text-left">Phone</th>
          <th className="p-4 text-left">Email</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-center">Actions</th>
        </tr>

      </thead>

      <tbody>

        {employees.map((employee) => (

          <tr
            key={employee.id}
            className="border-b"
          >

            <td className="p-4">
              {employee.first_name} {employee.last_name}
            </td>

            <td className="p-4">
              {employee.position}
            </td>

            <td className="p-4">
              {employee.phone}
            </td>

            <td className="p-4">
              {employee.email ?? "-"}
            </td>

            <td className="p-4">
              {employee.is_active ? "Active" : "Inactive"}
            </td>

            <td className="p-4 flex justify-center gap-2">

              <button
                onClick={() => onEdit(employee)}
                className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(employee)}
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
