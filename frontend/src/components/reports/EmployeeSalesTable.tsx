import type {
  EmployeeSalesReport,
} from "../../services/reportService";

interface Props {
  employees: EmployeeSalesReport[];
}

export default function EmployeeSalesTable({
  employees,
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow mt-8">

      <div className="border-b p-5">

        <h2 className="text-xl font-semibold">
          Employee Performance
        </h2>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b bg-gray-50">

            <th className="text-left p-4">
              Employee
            </th>

            <th className="text-left p-4">
              Appointments
            </th>

            <th className="text-left p-4">
              Revenue
            </th>

          </tr>

        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr
              key={employee.employee_id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4">
                {employee.employee_name}
              </td>

              <td className="p-4">
                {employee.completed_appointments}
              </td>

              <td className="p-4">
                {employee.total_revenue}
              </td>

            </tr>

          ))}

          {employees.length === 0 && (

            <tr>

              <td
                colSpan={3}
                className="text-center p-8 text-gray-500"
              >

                No employee sales available.

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}
