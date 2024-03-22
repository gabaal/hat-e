import Image from "next/image";
import GetProducts from "./components/products-sql";
const products = await GetProducts()


export default async function Home() {
  return (
    <main>
      <div>
        <h1>Hat-E home page</h1>
      </div>
    </main>
  );
}
