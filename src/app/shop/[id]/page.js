import { sql } from "@vercel/postgres";
import Image from "next/image";

export default async function Page({ params }) {
  console.log(params);

  const cap = (
    await sql`SELECT * FROM products WHERE product_id = ${params.id}`
  ).rows[0];

  return (
    <div key={cap.product_id}>
      <div>
        <h1>{cap.name}</h1>
      </div>
      {cap.image_url && (
        <Image
          className="object-cover rounded-md mb-2"
          src={cap.image_url}
          width={150}
          height={150}
          alt="image of cap"
        />
      )}

      <h3>Price: £{cap.price}</h3>
      <p>{cap.description}</p>
    </div>
  );
}
