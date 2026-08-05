import { useEffect, useState } from "react";
import type { Product } from "../../services/productService";

interface Props {
  product?: Product | null;
  onSave: (product: {
    id?: number;
    name: string;
    sku: string;
    category?: string;
    description?: string;
    cost_price: number;
    selling_price: number;
    stock_quantity: number;
    minimum_stock: number;
    is_active?: boolean;
  }) => Promise<void>;
  onClose: () => void;
}

export default function ProductForm({
  product,
  onSave,
  onClose,
}: Props) {

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [costPrice, setCostPrice] = useState<number | "">("");
  const [sellingPrice, setSellingPrice] = useState<number | "">("");
  const [stockQuantity, setStockQuantity] = useState<number | "">("");
  const [minimumStock, setMinimumStock] = useState<number | "">("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setCategory(product.category ?? "");
      setDescription(product.description ?? "");
      setCostPrice(product.cost_price);
      setSellingPrice(product.selling_price);
      setStockQuantity(product.stock_quantity);
      setMinimumStock(product.minimum_stock);
      setIsActive(product.is_active ?? true);
    }
  }, [product]);


  async function submit(e: React.FormEvent) {
    e.preventDefault();

    await onSave({
      ...(product?.id ? { id: product.id } : {}),
      name,
      sku,
      category,
      description,
      cost_price: Number(costPrice),
      selling_price: Number(sellingPrice),
      stock_quantity: Number(stockQuantity),
      minimum_stock: Number(minimumStock),
      is_active: isActive,
    });
  }


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center overflow-y-auto">

      <div className="bg-white rounded-xl p-6 w-[520px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-6">
          {product ? "Edit Product" : "Add Product"}
        </h2>


        <form onSubmit={submit} className="space-y-3">


          <div>
            <label className="block mb-1 font-medium">
              Product Name *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Enter the product name that staff will recognize.
              Example: L'Oréal Shampoo, Hair Color Cream, Face Mask
            </p>

            <input
              required
              className="w-full border rounded-lg p-3"
              placeholder="Example: Professional Hair Shampoo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div>
            <label className="block mb-1 font-medium">
              SKU / Product Code *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              A unique code used for stock tracking.
              Example: SHAMP-001, COLOR-RED-01
            </p>

            <input
              required
              className="w-full border rounded-lg p-3"
              placeholder="Example: HC-001"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>


          <div>
            <label className="block mb-1 font-medium">
              Category
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Group products to make inventory easier.
              Example: Shampoo, Hair Color, Skin Care
            </p>

            <input
              className="w-full border rounded-lg p-3"
              placeholder="Example: Hair Care"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>


          <div>
            <label className="block mb-1 font-medium">
              Product Description
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Optional details about the product.
              Example: 500ml moisturizing shampoo
            </p>

            <textarea
              className="w-full border rounded-lg p-3"
              placeholder="Enter product details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>


          <div>
            <label className="block mb-1 font-medium">
              Cost Price *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              The amount your salon pays to purchase this product.
            </p>

            <input
              required
              min="0"
              type="number"
              step="0.01"
              className="w-full border rounded-lg p-3"
              placeholder="Example: 15000"
              value={costPrice}
              onChange={(e) => 
                setCostPrice(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }
            />
          </div>


          <div>
            <label className="block mb-1 font-medium">
              Selling Price *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              The price charged to customers.
            </p>

            <input
              required
              min="0"
              type="number"
              step="0.01"
              className="w-full border rounded-lg p-3"
              placeholder="Example: 20000"
              value={sellingPrice}
              onChange={(e) =>
                setCostPrice(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }

            />
          </div>


          <div>
            <label className="block mb-1 font-medium">
              Current Stock Quantity *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              How many units are currently available.
              Example: 25 bottles
            </p>

            <input
              required
              min="0"
              type="number"
              className="w-full border rounded-lg p-3"
              placeholder="Example: 50"
              value={stockQuantity}
              onChange={(e) =>
                setCostPrice(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }

            />
          </div>


          <div>
            <label className="block mb-1 font-medium">
              Minimum Stock Alert Level *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              When stock reaches this number, the system will show a low stock warning.
              Example: Alert when fewer than 5 items remain.
            </p>

            <input
              required
              min="0"
              type="number"
              className="w-full border rounded-lg p-3"
              placeholder="Example: 5"
              value={minimumStock}
              onChange={(e) =>
                setCostPrice(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }

            />
          </div>


          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />

            <span>
              Active Product
            </span>
          </label>


          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="border rounded-lg px-4 py-2"
            >
              Cancel
            </button>


            <button
              className="bg-blue-600 text-white rounded-lg px-4 py-2"
            >
              Save Product
            </button>

          </div>


        </form>

      </div>

    </div>
  );
}
