import type {
  LowStockReport,
} from "../../services/reportService";

interface Props {
  products: LowStockReport[];
}

export default function LowStockTable({
  products,
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow mt-8">

      <div className="border-b p-5">

        <h2 className="text-xl font-semibold text-red-600">
          Low Stock Products
        </h2>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b bg-red-50">

            <th className="text-left p-4">
              Product
            </th>

            <th className="text-left p-4">
              Current Stock
            </th>

            <th className="text-left p-4">
              Minimum Stock
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.product_id}
              className="border-b hover:bg-red-50"
            >

              <td className="p-4">
                {product.product_name}
              </td>

              <td className="p-4 font-semibold text-red-600">
                {product.current_stock}
              </td>

              <td className="p-4">
                {product.minimum_stock}
              </td>

            </tr>

          ))}

          {products.length === 0 && (

            <tr>

              <td
                colSpan={3}
                className="text-center p-8 text-gray-500"
              >

                No low stock products.

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}
