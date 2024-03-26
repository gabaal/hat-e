import products from "../SCproducts.json";
import Image from "next/image";
import Link from "next/link";
export default function page() {
  console.log(products);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <h1></h1>
      {products.map((product) => {
        return (
          <div
            key={product.product_id}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >

            
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link href={`shop/${product.product_id}`}>
              <Image src={product.image_url} height={400} width={300} />
            </Link>

            <p>
              <button
                className="snipcart-add-item"
                data-item-id={product.product_id}
                data-item-image={product.product_image_url}
                data-item-name={product.product_name}
                data-item-price={product.product_price}
              >
                Add to Cart
              </button>
            </p>
          </div>
        );
      })}
    </div>
  );
}
