import { useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";
import ProductTable from "../../components/products/ProductTable";
import ProductForm from "../../components/products/ProductForm";

import type { Product } from "../../services/productService";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSave(product: {
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
  }) {
    try {
      if (product.id) {
        await updateProduct(product.id, product);
      } else {
        await createProduct({
          name: product.name,
          sku: product.sku,
          category: product.category,
          description: product.description,
          cost_price: product.cost_price,
          selling_price: product.selling_price,
          stock_quantity: product.stock_quantity,
          minimum_stock: product.minimum_stock,
        });
      }

      await loadProducts();

      setEditingProduct(null);
      setShowForm(false);

    } catch (error) {
      console.error(error);
      alert("Unable to save product.");
    }
  }

  async function handleDelete(product: Product) {

    const confirmed = window.confirm(
      `Delete "${product.name}"?`
    );

    if (!confirmed) return;

    try {

      await deleteProduct(product.id);

      await loadProducts();

    } catch (error) {

      console.error(error);

      alert("Unable to delete product.");

    }

  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  function handleClose() {
    setEditingProduct(null);
    setShowForm(false);
  }

  return (
    <AppLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Product
        </button>

      </div>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}

    </AppLayout>
  );
}
