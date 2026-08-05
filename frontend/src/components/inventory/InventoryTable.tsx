import type { Product } from "../../services/productService";


interface InventoryTransaction {

  id: number;

  product_id: number;

  transaction_type: string;

  quantity: number;

  note: string | null;

  created_at: string;

}


interface Props {

  transactions: InventoryTransaction[];

  products: Product[];

}



export default function InventoryTable({

  transactions,

  products,

}: Props) {



  function getProductName(
    productId: number
  ) {

    const product = products.find(
      (item) =>
        item.id === productId
    );


    return product
      ? product.name
      : "Unknown Product";

  }



  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">


      <table className="w-full">


        <thead>

          <tr className="border-b bg-gray-50">


            <th className="p-4 text-left">
              Product
            </th>


            <th className="p-4 text-left">
              Type
            </th>


            <th className="p-4 text-left">
              Quantity
            </th>


            <th className="p-4 text-left">
              Note
            </th>


            <th className="p-4 text-left">
              Date
            </th>


          </tr>

        </thead>



        <tbody>


          {transactions.map(
            (transaction) => (

            <tr
              key={transaction.id}
              className="border-b"
            >


              <td className="p-4 font-medium">

                {getProductName(
                  transaction.product_id
                )}

              </td>



              <td className="p-4 capitalize">

                {transaction.transaction_type.replace(
                  "_",
                  " "
                )}

              </td>



              <td className="p-4">

                {transaction.quantity}

              </td>



              <td className="p-4">

                {transaction.note ?? "-"}

              </td>



              <td className="p-4">

                {new Date(
                  transaction.created_at
                ).toLocaleString()}

              </td>


            </tr>

          ))}


        </tbody>


      </table>


    </div>

  );

}
