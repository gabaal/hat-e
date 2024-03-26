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
import productsArray from "@/../products.json";
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

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <Image
        src={product.image_url}
        alt={product.name}
        width={100}
        height={100}
      />
      <p>
        <button
          className="snipcart-add-item"
          data-item-id={product.product_id}
          data-item-image={product.image_url}
          data-item-name={product.name}
          data-item-price={product.price}
        >
          Add to Cart
        </button>
      </p>
    </div>
  );
}
