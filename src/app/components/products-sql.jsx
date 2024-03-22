import { sql } from "@vercel/postgres";

export default async function GetProducts() {
  const products = await sql`SELECT * FROM products`;
  console.log(products);
  return (products);
}