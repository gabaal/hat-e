

import { GetProductsAndReviewsAvg } from './products-sql';
import fs from 'fs';

export default async function productJSON() {
  
  const products = await GetProductsAndReviewsAvg();
  // console.log(products);

  // Convert products data to JSON
  const productsJSON = JSON.stringify(products.rows, null, 2);
// console.log(productsJSON);
  // Write JSON data to a file
fs.writeFileSync('src/app/SCproducts.json', productsJSON);

  return (
    <div>
    </div>
  );
}