import { useState } from "react";

import type { Product } from "../../services/productService";


interface Props {

  products: Product[];

  defaultTransactionType: string;

  onSave: (transaction: {
    product_id: number;
    transaction_type: string;
    quantity: number;
    note: string;
  }) => Promise<void>;

  onClose: () => void;

}



export default function InventoryForm({

  products,

  defaultTransactionType,

  onSave,

  onClose,

}: Props) {


  const [productId, setProductId] =
    useState("");

  const [transactionType, setTransactionType] =
    useState(defaultTransactionType);


  const [quantity, setQuantity] =
    useState("");


  const [note, setNote] =
    useState("");



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


      <div className="bg-white rounded-xl p-6 w-[450px]">


        <h2 className="text-2xl font-bold mb-5">

          Inventory Transaction

        </h2>



        <form

          onSubmit={submit}

          className="space-y-4"

        >



          <div>

            <label className="block mb-1 font-medium">

              Product

            </label>


            <select

              className="w-full border rounded-lg p-3"

              value={productId}

              onChange={(e) =>
                setProductId(
                  e.target.value
                )
              }

              required

            >


              <option value="">

                Select Product

              </option>



              {products.map((product) => (

                <option

                  key={product.id}

                  value={product.id}

                >

                  {product.name}

                  {" "}

                  (Stock: {product.stock_quantity})

                </option>

              ))}


            </select>


          </div>



          <div>


            <label className="block mb-1 font-medium">

              Transaction Type

            </label>



            <select

              className="w-full border rounded-lg p-3"

              value={transactionType}

              onChange={(e) =>
                setTransactionType(
                  e.target.value
                )
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


          </div>




          <div>


            <label className="block mb-1 font-medium">

              Quantity

            </label>



            <input

              type="number"

              min="1"

              className="w-full border rounded-lg p-3"

              placeholder="Example: 10"

              value={quantity}

              onChange={(e) =>
                setQuantity(
                  e.target.value
                )
              }

              required

            />


          </div>




          <div>


            <label className="block mb-1 font-medium">

              Note

            </label>



            <textarea

              className="w-full border rounded-lg p-3"

              placeholder="Example: Supplier delivery"

              value={note}

              onChange={(e) =>
                setNote(
                  e.target.value
                )
              }

            />


          </div>




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
