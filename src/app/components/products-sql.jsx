import { sql } from "@vercel/postgres";

//Get All Products
export default async function GetProducts() {
  const products = await sql`SELECT * FROM products`;
  console.log(products);
  return products;
}

export async function GetProductsforJSON() {
  const products = await sql`SELECT 
  product_id AS data-item-id,
  name AS data-item-name,
  description AS data-item-description,
  image_url AS data-item-image,
  price AS data-item-price
FROM products`;
  console.log(products);
  return products;
}

//Get Product by ID
export async function GetProduct({ params }) {
  const product_id = params.id; // Assuming you're passing the product_id in params
  try {
    const product =
      await sql`SELECT * FROM products WHERE product_id = ${product_id}`;
    console.log(product);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

//Get product reviews for a product by ID
export async function GetProductReviews({ params }) {
  const productReviews = await sql`SELECT 
  product_id,
  review_id,
  rating,
  comment,
  created_at
FROM 
  reviews
WHERE 
  product_id = ${params.id}`;
  console.log(productReviews);
  return productReviews;
}

//Delete Product by ID
export async function DeleteProduct(params) {
  const product_id = params.id; // Assuming you're passing the product_id in params
  try {
    await sql`DELETE FROM products WHERE product_id = ${product_id}`;
    console.log(`Product with ID ${product_id} deleted successfully`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Update Product by ID
export async function UpdateProduct(params) {
  const {
    id,
    name,
    description,
    image_url,
    price,
    stock_quantity,
    category_id,
  } = params;
  try {
    await sql`
          UPDATE products
          SET 
              name = ${name},
              description = ${description},
              image_url = ${image_url},
              price = ${price},
              stock_quantity = ${stock_quantity},
              category_id = ${category_id}
          WHERE 
              product_id = ${id}
      `;
    console.log(`Product with ID ${id} updated successfully`);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Create Product
export async function CreateProduct(params) {
  const { name, description, image_url, price, stock_quantity, category_id } =
    params;
  try {
    await sql`
          INSERT INTO products (name, description, image_url, price, stock_quantity, category_id)
          VALUES (${name}, ${description}, ${image_url}, ${price}, ${stock_quantity}, ${category_id})
      `;
    console.log("Product created successfully");
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}
