import type { Service } from "../../services/serviceService";

interface Props {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export default function ServiceTable({
  services,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table className="w-full bg-white rounded-xl shadow">

      <thead>

        <tr className="border-b">
          <th className="p-4 text-left">Service</th>
          <th className="p-4 text-left">Category</th>
          <th className="p-4 text-left">Duration</th>
          <th className="p-4 text-left">Price</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-center">Actions</th>
        </tr>

      </thead>

      <tbody>

        {services.map((service) => (

          <tr
            key={service.id}
            className="border-b"
          >

            <td className="p-4">
              {service.name}
            </td>

            <td className="p-4">
              {service.category}
            </td>

            <td className="p-4">
              {service.duration_minutes} min
            </td>

            <td className="p-4">
              {service.price.toFixed(2)}
            </td>

            <td className="p-4">
              {service.is_active ? "Active" : "Inactive"}
            </td>

            <td className="p-4 flex justify-center gap-2">

              <button
                onClick={() => onEdit(service)}
                className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(service)}
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
