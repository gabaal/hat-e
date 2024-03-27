import { sql } from "@vercel/postgres";
import Image from "next/image";
import productsArray from "../../SCproducts.json";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { GetProductReviews } from "@/app/components/products-sql";
import { SignedIn } from "@clerk/nextjs";

export default async function Page({ params }) {
  // form function

  const postId = params.id;
  const product = productsArray.find(
    (product) => product.product_id === parseInt(postId)
  );
  console.log(product);

  // export function props() {
  //   return (
  //     const formId = ${postId}
  //   )
  // }
  const reviews = await sql`
    SELECT * 
    FROM reviews 
    WHERE product_id = ${postId}`;

  console.log(reviews);

  return (
    //div
    <div>
      <div className="max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h1 className="text-2xl font-semibold">{product.product_name}</h1>
        <p className="mt-2 text-lg text-gray-600">
          {product.product_description}
        </p>
        <Image
          className="mt-4"
          src={product.product_image_url}
          alt={product.product_name}
          width={500}
          height={100}
        />
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-lg font-bold text-gray-800">
              £{product.product_price}
            </p>
          </div>
          <SignedIn>
            <button
              className="text-sm font-semibold px-4 py-2 bg-[#AAE292] rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400 snipcart-add-item"
              data-item-id={product.product_id}
              data-item-image={product.product_image_url}
              data-item-name={product.product_name}
              data-item-price={product.product_price}
            >
              Add to Cart
            </button>
          </SignedIn>
        </div>
        {reviews.rows.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-800">Reviews</h3>
            {reviews.rows.map((review) => (
              <div
                key={review.review_id}
                className="flex items-center font-style: italic"
              >
                {Array.from(
                  { length: Math.floor(review.rating) },
                  (_, index) => (
                    <FaStar key={index} className="text-yellow-500" />
                  )
                )}
                {review.rating % 1 !== 0 && (
                  <FaStarHalfAlt className="text-yellow-500" />
                )}
                <span className="ml-2">{review.comment}</span>
              </div>
            ))}
            {product.average_rating !== "0.0" && (
              <div className="flex items-center mt-2">
                <p>Average Review:</p>
                {Array.from(
                  { length: Math.floor(product.average_rating) },
                  (_, index) => (
                    <FaStar key={index} className="text-yellow-500 ml-2" />
                  )
                )}
                {product.average_rating % 1 !== 0 && (
                  <FaStarHalfAlt className="text-yellow-500" />
                )}
                <span className="ml-2">{product.average_rating}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
