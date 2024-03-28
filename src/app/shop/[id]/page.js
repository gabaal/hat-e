import { sql } from "@vercel/postgres";
import Image from "next/image";
import productsArray from "../../SCproducts.json";
import NewMessage from "../../message/page";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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
  async function handleSaveMessage(formData) {
    "use server";

    const product_id = postId;
    const rating = formData.get("rating");
    const comment = formData.get("comment");

    console.log(product_id, rating, comment);
    await sql`
      INSERT INTO reviews
        (product_id, rating, comment)
        VALUES (${product_id}, ${rating}, ${comment})`;

    revalidatePath(`/shop/${postId}`);
    // redirect("/shop/${postId}")
  }

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
              ${product.product_price}
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
      <h1 className="text-2xl mb-4 text-center mt-4">Leave a review</h1>
      <form action={handleSaveMessage} className="max-w-md mx-auto">
        <label className="block mb-2" htmlFor="rating">
          rating
        </label>
        <select
          id="rating"
          name="rating"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
          required
        >
          <option value="">Select rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label className="block mb-2" htmlFor="comment">
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
          required
        ></textarea>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#AAE292] hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
