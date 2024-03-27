// export default async function Page({ params }) {
//   console.log(params);

//   const cap = (
//     await sql`SELECT * FROM products WHERE product_id = ${params.id}`
//   ).rows[0];

//   return (
//     <div key={cap.product_id}>
//       <div>
//         <h1>{cap.name}</h1>
//       </div>
//       {cap.image_url && (
//         <Image
//           className="object-cover rounded-md mb-2"
//           src={cap.image_url}
//           width={150}
//           height={150}
//           alt="image of cap"
//         />
//       )}

//       <h3>Price: ${cap.price}</h3>
//       <p>{cap.description}</p>
//     </div>
//   );
// }
import { sql } from "@vercel/postgres";
import Image from "next/image";
import productsArray from "../../SCproducts.json";
import { GetProductReviews } from "@/app/components/products-sql";
import { SignedIn } from "@clerk/nextjs";

export default async function Page({ params }) {
  // console.log"params.id);
  // console.log(products);
  // if (!product) {
  //   return (
  //     <div>
  //       <p> No product found </p>
  //     </div>
  //   );
  // }
  //when product found
  // const products = JSON.parse(productsArray);
  const postId = params.id;
  const product = productsArray.find(
    (product) => product.product_id === parseInt(postId)
  );
  console.log(product);

  const reviews = await sql`
    SELECT * 
    FROM reviews 
    WHERE product_id = ${postId}`;

  console.log(reviews);

  return (
    <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h1 className="text-2xl font-semibold">{product.product_name}</h1>
      <p className="mt-2 text-m text-gray-600">{product.product_description}</p>
      <Image
        className="mt-4"
        src={product.product_image_url}
        alt={product.product_name}
        width={500}
        height={100}
      />
      <p className="mt-4 text-lg font-bold text-gray-800">
        £{product.product_price}
      </p>
      <p>
        <SignedIn>
          <button
            className="hover:text-gray-900 hover:shadow-md rounded-md px-4 py-2 bg-[#AAE292] text-black hover:bg-gray-300 snipcart-add-item"
            data-item-id={product.product_id}
            data-item-image={product.product_image_url}
            data-item-name={product.product_name}
            data-item-price={product.product_price}
          >
            Add to Cart
          </button>
        </SignedIn>
      </p>
      <div className="mt-4">
        {reviews.length > 0 && <h3>Reviews</h3>}
        <h3>Reviews</h3>
        {reviews.rows.map((review) => (
          <p key={review.review_id}>
            {review.rating} - {review.comment}
          </p>
        ))}
      </div>
    </div>
  );
}
