import { useEffect, useState } from "react";
import { toast } from "sonner";

import AppLayout from "../../components/layout/AppLayout";
import InventoryTable from "../../components/inventory/InventoryTable";
import InventoryForm from "../../components/inventory/InventoryForm";
import InventorySummary from "../../components/inventory/InventorySummary";

import {
  getTransactions,
  createTransaction,
} from "../../services/inventoryService";

import {
  getProducts,
  type Product,
} from "../../services/productService";

interface InventoryTransaction {
  id: number;
  product_id: number;
  transaction_type: string;
  quantity: number;
  note: string | null;
  created_at: string;
}

export default function Inventory() {
  const [transactions, setTransactions] =
    useState<InventoryTransaction[]>([]);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [showForm, setShowForm] =
    useState(false);

  const [defaultTransactionType, setDefaultTransactionType] =
    useState("stock_in");

  const [showLowStockOnly, setShowLowStockOnly] =
    useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [
        transactionData,
        productData,
      ] = await Promise.all([
        getTransactions(),
        getProducts(),
      ]);

      setTransactions(transactionData);
      setProducts(productData);

    } catch (error) {
      console.error(error);
      toast.error("Unable to load inventory.");
    }
  }

  function openTransactionForm(
    type: string
  ) {
    setDefaultTransactionType(type);
    setShowForm(true);
  }

  async function handleSave(transaction: {
    product_id: number;
    transaction_type: string;
    quantity: number;
    note: string;
  }) {
    try {
      await createTransaction(transaction);

      toast.success(
        "Inventory transaction saved successfully."
      );

      await loadData();

      setShowForm(false);

    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.detail ??
        "Unable to save inventory transaction.";

      toast.error(message);
    }
  }

  const displayedProducts =
    showLowStockOnly
      ? products.filter(
          (product) =>
            product.stock_quantity <=
            product.minimum_stock
        )
      : products;

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() =>
              openTransactionForm(
                "stock_in"
              )
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Stock In
          </button>

          <button
            onClick={() =>
              openTransactionForm(
                "stock_out"
              )
            }
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            - Stock Out
          </button>
        </div>
      </div>

      <div className="mb-5">
        <button
          onClick={() =>
            setShowLowStockOnly(
              !showLowStockOnly
            )
          }
          className="border rounded-lg px-4 py-2"
        >
          {showLowStockOnly
            ? "Show All Products"
            : "Show Low Stock Only"}
        </button>
      </div>

      <InventorySummary
        products={products}
      />

      <InventoryTable
        transactions={transactions}
        products={displayedProducts}
      />

      {showForm && (
        <InventoryForm
          products={products}
          defaultTransactionType={
            defaultTransactionType
          }
          onSave={handleSave}
          onClose={() =>
            setShowForm(false)
          }
        />
      )}
    </AppLayout>
  );
}
