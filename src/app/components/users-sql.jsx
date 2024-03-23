import { sql } from "@vercel/postgres";

export default async function GetUsers() {
  const products = await sql`SELECT * FROM users`;
  console.log(products);
  return (products);
}