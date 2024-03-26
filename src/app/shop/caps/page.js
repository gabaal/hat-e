import { sql } from "@vercel/postgres";
export default async function Page() {
  const caps = (await sql`SELECT * FROM products`).rows;

  return (
    <div>
      <h1>Caps</h1>
    </div>
  );
}
