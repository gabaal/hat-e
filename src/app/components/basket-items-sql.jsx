import { sql } from "@vercel/postgres";

// Get All Basket Items
export async function GetBasketItems() {
  const basketItems = await sql`SELECT * FROM basket_items`;
  console.log(basketItems);
  return basketItems;
}

// Get Basket Item by ID
export async function GetBasketItem(params) {
  const item_id = params.id;
  try {
      const basketItem = await sql`SELECT * FROM basket_items WHERE item_id = ${item_id}`;
      console.log(basketItem);
      return basketItem;
  } catch (error) {
      console.error('Error fetching basket item:', error);
      throw error;
  }
}

// Delete Basket Item by ID
export async function DeleteBasketItem(params) {
  const item_id = params.id;
  try {
      await sql`DELETE FROM basket_items WHERE item_id = ${item_id}`;
      console.log(`Basket Item with ID ${item_id} deleted successfully`);
  } catch (error) {
      console.error('Error deleting basket item:', error);
      throw error;
  }
}

// Create Basket Item
export async function CreateBasketItem(params) {
  const { basket_id, product_id, quantity } = params;
  try {
      await sql`
          INSERT INTO basket_items (basket_id, product_id, quantity)
          VALUES (${basket_id}, ${product_id}, ${quantity})
      `;
      console.log('Basket item created successfully');
  } catch (error) {
      console.error('Error creating basket item:', error);
      throw error;
  }
}

// Add Product to Basket
export async function AddProductToBasket(params) {
  const { basket_id, product_id, quantity } = params;
  try {
      // Check if the product is already in the basket
      const existingItem = await sql`
          SELECT * FROM basket_items
          WHERE basket_id = ${basket_id} AND product_id = ${product_id}
      `;

      if (existingItem.rows.length > 0) {
          // If the product is already in the basket, update its quantity
          await sql`
              UPDATE basket_items
              SET quantity = quantity + ${quantity}
              WHERE basket_id = ${basket_id} AND product_id = ${product_id}
          `;
      } else {
          // If the product is not in the basket, create a new basket item
          await CreateBasketItem({ basket_id, product_id, quantity });
      }

      console.log('Product added to basket successfully');
  } catch (error) {
      console.error('Error adding product to basket:', error);
      throw error;
  }
}
