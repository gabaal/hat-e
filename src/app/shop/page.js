import products from "../SCproducts.json";
import productJSON from "../components/update-products-json";
import Link from "next/link";

export default async function page() {
  // await productJSON();
  console.log(products);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <h1 className="mt-4 text-3xl text-gray-800">The Hat-e Shop</h1>
      {products.map((product) => {
        
        return (
          <div
            key={product.product_id}
            className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
            
            <h3 className="text-lg font-semibold">{product.product_name}</h3>
            <p className="mt-2 text-m text-gray-600">{product.product_description}</p>
            <Link href={`shop/${product.product_id}`}>
            <img className="mt-4" src={product.product_image_url} height={400}  />
            </Link>
            
            <p className="mt-4 text-lg font-bold text-gray-800">£{product.product_price}</p>
            <p>Avg Customer Review {product.average_rating}</p>
            <p>
              <button
                className="hover:text-gray-900 hover:shadow-md rounded-md px-4 py-2 bg-[#AAE292] text-black hover:bg-gray-300 snipcart-add-item"
                data-item-id={product.product_id}
                data-item-image={product.product_image_url}
                data-item-name={product.product_name}
                data-item-price={product.product_price}
              >
                Add to Cart 
              </button>
              <p>
              </p>
            </p>
          </div>
          
        );
      })}
    </div>
  );
}