import { sql } from "@vercel/postgres";

export default async function GetProduct({params}) {
  const product = await sql`SELECT * FROM products WHERE product_id =${params.id}`;
  console.log(product);
  return (product);
}