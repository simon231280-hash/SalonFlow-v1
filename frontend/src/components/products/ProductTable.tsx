import type { Product } from "../../services/productService";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table className="w-full bg-white rounded-xl shadow">

      <thead>

        <tr className="border-b">

          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">SKU</th>
          <th className="p-4 text-left">Category</th>
          <th className="p-4 text-left">Price</th>
          <th className="p-4 text-left">Stock</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-center">Actions</th>

        </tr>

      </thead>

      <tbody>

        {products.map((product) => (

          <tr
            key={product.id}
            className="border-b"
          >

            <td className="p-4">
              {product.name}
            </td>

            <td className="p-4">
              {product.sku}
            </td>

            <td className="p-4">
              {product.category ?? "-"}
            </td>

            <td className="p-4">
              {Number(product.selling_price).toFixed(2)}
            </td>

            <td className="p-4">
              {product.stock_quantity}
            </td>

            <td className="p-4">
              {product.is_active ? "Active" : "Inactive"}
            </td>

            <td className="p-4 flex justify-center gap-2">

              <button
                onClick={() => onEdit(product)}
                className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(product)}
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
