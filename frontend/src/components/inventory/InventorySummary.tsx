import type { Product } from "../../services/productService";


interface Props {
  products: Product[];
}


export default function InventorySummary({
  products,
}: Props) {


  function getStatus(product: Product) {

    if (product.stock_quantity === 0) {

      return {
        text: "Out of Stock",
        className: "text-red-600",
      };

    }


    if (
      product.stock_quantity
      <= product.minimum_stock
    ) {

      return {
        text: "Low Stock",
        className: "text-yellow-600",
      };

    }


    return {
      text: "OK",
      className: "text-green-600",
    };

  }



  return (

    <div className="bg-white rounded-xl shadow mb-8">


      <div className="p-5 border-b">

        <h2 className="text-xl font-bold">
          Stock Summary
        </h2>

      </div>



      <table className="w-full">


        <thead>

          <tr className="border-b bg-gray-50">

            <th className="p-4 text-left">
              Product
            </th>


            <th className="p-4 text-left">
              Current Stock
            </th>


            <th className="p-4 text-left">
              Minimum Stock
            </th>


            <th className="p-4 text-left">
              Status
            </th>


          </tr>

        </thead>



        <tbody>


          {products.map((product)=>(

            <tr
              key={product.id}
              className="border-b"
            >

              <td className="p-4">
                {product.name}
              </td>


              <td className="p-4">
                {product.stock_quantity}
              </td>


              <td className="p-4">
                {product.minimum_stock}
              </td>


              <td
                className={`p-4 font-medium ${
                  getStatus(product).className
                }`}
              >

                {getStatus(product).text}

              </td>


            </tr>

          ))}


        </tbody>


      </table>


    </div>

  );

}
