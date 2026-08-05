import type {
  ProductSalesReport,
} from "../../services/reportService";

interface Props {
  products: ProductSalesReport[];
}

export default function ProductSalesTable({
  products,
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow mt-8">

      <div className="border-b p-5">

        <h2 className="text-xl font-semibold">
          Product Sales
        </h2>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b bg-gray-50">

            <th className="text-left p-4">
              Product
            </th>

            <th className="text-left p-4">
              Units Sold
            </th>

            <th className="text-left p-4">
              Revenue
            </th>

            <th className="text-left p-4">
              Current Stock
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.product_name}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4">
                {product.product_name}
              </td>

              <td className="p-4">
                {product.units_sold}
              </td>

              <td className="p-4">
                {product.total_revenue}
              </td>

              <td className="p-4">
                {product.current_stock}
              </td>

            </tr>

          ))}

          {products.length === 0 && (

            <tr>

              <td
                colSpan={4}
                className="text-center p-8 text-gray-500"
              >

                No product sales available.

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}
