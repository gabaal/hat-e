import products from "../SCproducts.json";
import productJSON from "../components/update-products-json";
import Link from "next/link";
import Image from "next/image";

export default async function page() {
  // await productJSON();
  console.log(products);
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col items-center">
        <h1 className="mt-4 mb-8 text-3xl font-semibold text-gray-800">
          The Hat-e Shop
        </h1>
        <div className="flex justify-center mt-14">
          <Image
            className="rounded-lg"
            src="/WhiteBgLogo.png"
            height={250}
            width={250}
            alt="Logo for Hat brand"
          />
        </div>
      </div>
      {products.map((product) => {
        return (
          <div
            key={product.product_id}
            className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.product_name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {product.product_description}
              </p>
              <Link href={`shop/${product.product_id}`}>
                <img
                  className="object-cover object-center h-70 w-70"
                  src={product.product_image_url}
                  alt={product.product_name}
                />
              </Link>

              <p className="mt-4 text-lg font-bold text-gray-800">
                £{product.product_price}
              </p>
              <div className="flex items-center mt-4">
                <p className="mr-2">
                  Avg Customer Review {product.average_rating}
                </p>

                <button
                  className="text-sm font-semibold px-3 py-1 bg-[#AAE292] rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
                  data-item-id={product.product_id}
                  data-item-image={product.product_image_url}
                  data-item-name={product.product_name}
                  data-item-price={product.product_price}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
