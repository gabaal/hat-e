// import GetProducts from "../components/products-sql";
// import GetProduct from "../components/products-sql";
// // const productReviews = await GetProductReviews();
// import { GetUsers } from "../components/users-sql";
// // const products = await GetProducts();
// // console.log(`PRODUCTS ${products}`);


// export default async function productJSON() {
//   const products = await GetProducts();
//   console.log(products);
  
//   // const productsjson = JSON.stringify(products)
//   // console.log(productsjson)
  
//   return(
//     <div>
//       <h1>Products</h1>
//       <p>
//         {products.rows.map((product) => (
//           <li key={product.product_id}>
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>{product.image_url}</p>
//             <p>{product.price}</p>
//             <p>{product.stock}</p>
//             <p>{product.category}</p>
//           </li>
//         ))}
//       </p>
      
//     </div>
//   )
// }

import GetProducts from "../components/products-sql";
import fs from 'fs';

export default async function productJSON() {
  
  
  const products = await GetProducts();
  console.log(products);

    // // Map over products and rename keys
    // const productsWithRenamedKeys = products.rows.map(product => ({
    //   'data-item-id': product.product_id,
    //   "data-item-name": product.name,
    //   "data-item-description": product.description,
    //   "data-item-image": product.image_url,
    //   "data-item-price": product.price
    // }));
    // console.log(productsWithRenamedKeys);
  
  // Convert products data to JSON
  const productsJSON = JSON.stringify(products.rows, null, 2);
console.log(productsJSON);
  // Write JSON data to a file
fs.writeFileSync('src/app/SCproducts.json', productsJSON);

  return (
    <div>
      <h1>Products</h1>
      <p>JSON file generated successfully!</p>
    </div>
  );
}