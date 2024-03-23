import { sql } from "@vercel/postgres";

export default async function GetProductReviews({params}) {
  const productReviews = await sql`SELECT 
  product_id,
  review_id,
  rating,
  comment,
  created_at
FROM 
  reviews
WHERE 
  product_id = ${params.id}`
  console.log(productReviews);
  return (productReviews);
}