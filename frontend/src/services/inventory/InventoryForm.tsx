import { useState } from "react";

interface Props {
  onSave: (transaction: {
    product_id: number;
    transaction_type: string;
    quantity: number;
    note: string;
  }) => Promise<void>;

  onClose: () => void;
}

export default function InventoryForm({
  onSave,
  onClose,
}: Props) {
  const [productId, setProductId] = useState("");
  const [transactionType, setTransactionType] =
    useState("stock_in");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");

  async function submit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await onSave({
      product_id: Number(productId),
      transaction_type: transactionType,
      quantity: Number(quantity),
      note,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl p-8 w-96">

        <h2 className="text-2xl font-bold mb-6">
          Inventory Transaction
        </h2>

        <form
          onSubmit={submit}
          className="space-y-4"
        >

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            placeholder="Product ID"
            value={productId}
            onChange={(e) =>
              setProductId(e.target.value)
            }
            required
          />

          <select
            className="w-full border rounded-lg p-3"
            value={transactionType}
            onChange={(e) =>
              setTransactionType(e.target.value)
            }
          >
            <option value="stock_in">
              Stock In
            </option>

            <option value="stock_out">
              Stock Out
            </option>

            <option value="adjustment">
              Adjustment
            </option>
          </select>

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            required
          />

          <textarea
            className="w-full border rounded-lg p-3"
            placeholder="Note"
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
          />

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
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
