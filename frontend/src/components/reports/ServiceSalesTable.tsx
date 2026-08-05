import type {
  ServiceSalesReport,
} from "../../services/reportService";

interface Props {
  services: ServiceSalesReport[];
}

export default function ServiceSalesTable({
  services,
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow mt-8">

      <div className="border-b p-5">

        <h2 className="text-xl font-semibold">
          Service Sales
        </h2>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b bg-gray-50">

            <th className="text-left p-4">
              Service
            </th>

            <th className="text-left p-4">
              Bookings
            </th>

            <th className="text-left p-4">
              Revenue
            </th>

          </tr>

        </thead>

        <tbody>

          {services.map((service) => (

            <tr
              key={service.service_name}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4">
                {service.service_name}
              </td>

              <td className="p-4">
                {service.total_bookings}
              </td>

              <td className="p-4">
                {service.total_revenue}
              </td>

            </tr>

          ))}

          {services.length === 0 && (

            <tr>

              <td
                colSpan={3}
                className="text-center p-8 text-gray-500"
              >

                No service sales available.

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}
