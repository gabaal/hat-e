
// import GetProducts from "../components/products-sql";
// import fs from 'fs';

// export default async function productJSON() {
  
  
//   const products = await GetProducts();
//   console.log(products);

  
//   // Convert products data to JSON
//   const productsJSON = JSON.stringify(products.rows, null, 2);
// console.log(productsJSON);
//   // Write JSON data to a file
// fs.writeFileSync('src/apSCproducts.json', productsJSON);

//   return (
//     <div>
//       <h1>Products</h1>
//       <p>JSON file generated successfully!</p>
//     </div>
//   );
// }
import { GetProductsAndReviewsAvg } from "../components/products-sql";
import NewMessage from "../message/page";
export default async function Home() {
  return(NewMessage())
  
}
