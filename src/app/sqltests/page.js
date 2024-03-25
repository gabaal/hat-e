import GetProducts from "../components/products-sql";
import GetProduct from "../components/products-sql";
// const productReviews = await GetProductReviews();
import { GetUsers } from "../components/users-sql";
// const products = await GetProducts();
// console.log(products);

const users = await GetUsers();



export default async function Home() {
  return (
    <main>
      <div>
        <h1>Hat-E home page</h1>
      </div>
    </main>
  );
}