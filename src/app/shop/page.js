import { sql } from "@vercel/postgres";
import Image from "next/image";

export default async function Page({ params }) {
  const caps = (await sql`SELECT * FROM products`).rows;
  console.log(params.products);

  return (
    <div>
      <h1>Caps</h1>

      <div>
        {caps.map((cap) => (
          <div key={cap.id}>
            <h3>{cap.name}</h3>
            <Image
              className="object-cover rounded-md mb-2"
              src={cap.image_url}
              width={150}
              height={150}
              alt="image of cap"
            />
            <h2>Price: £{cap.price}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
