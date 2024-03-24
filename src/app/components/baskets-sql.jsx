import { sql } from "@vercel/postgres";

// Get All Baskets
export async function GetBaskets() {
  const baskets = await sql`SELECT * FROM baskets`;
  console.log(baskets);
  return baskets;
}

// Get Basket by ID
export async function GetBasket(params) {
  const basket_id = params.id; // Assuming you're passing the basket_id in params
  try {
      const basket = await sql`SELECT * FROM baskets WHERE basket_id = ${basket_id}`;
      console.log(basket);
      return basket;
  } catch (error) {
      console.error('Error fetching basket:', error);
      throw error;
  }
}

// Delete Basket by ID
export async function DeleteBasket(params) {
  const basket_id = params.id; // Assuming you're passing the basket_id in params
  try {
      await sql`DELETE FROM basket_items WHERE basket_id = ${basket_id}`;
      await sql`DELETE FROM baskets WHERE basket_id = ${basket_id}`;
      console.log(`Basket with ID ${basket_id} deleted successfully`);
  } catch (error) {
      console.error('Error deleting basket:', error);
      throw error;
  }
}

// Create Basket
export async function CreateBasket(params) {
  const { user_id } = params;

  // Check if the user already has an incomplete basket
  const existingBasket = await sql`
      SELECT * FROM baskets
      WHERE user_id = ${user_id} AND completed = false
      LIMIT 1
  `;

  if (existingBasket.length > 0) {
      throw new Error('User already has an incomplete basket');
  }

  // If user does not have an incomplete basket, create a new one
  try {
      await sql`
          INSERT INTO baskets (user_id)
          VALUES (${user_id})
      `;
      console.log('Basket created successfully');
  } catch (error) {
      console.error('Error creating basket:', error);
      throw error;
  }
}



// Function to create the trigger function and trigger
export async function createProductStockUpdateTrigger() {
  try {
    await sql.begin(async (sql) => {
      // Function to update product stock
      await sql.query(`
        CREATE OR REPLACE FUNCTION update_product_stock()
        RETURNS TRIGGER AS
        $$
        DECLARE
            basket_item RECORD;
        BEGIN
            -- Loop through basket items associated with the basket
            FOR basket_item IN SELECT * FROM basket_items WHERE basket_id = NEW.basket_id LOOP
                -- Update product stock by subtracting basket item quantity
                UPDATE products
                SET stock_quantity = stock_quantity - basket_item.quantity
                WHERE product_id = basket_item.product_id;
            END LOOP;

            RETURN NEW;
        END;
        $$
        LANGUAGE plpgsql;
      `);

      // Trigger to call the function
      await sql.query(`
        CREATE TRIGGER update_product_stock_trigger
        AFTER UPDATE OF completed ON baskets
        FOR EACH ROW
        WHEN (NEW.completed = true)
        EXECUTE FUNCTION update_product_stock();
      `);
    });
    console.log('Product stock update trigger created successfully');
  } catch (error) {
    console.error('Error creating product stock update trigger:', error);
    throw error;
  }
}

// Update Basket Completion Status by ID
// Sets the basket completed to true and runs the createProductStockUpdateTrigger() function to update the product stock (quantity of each product in basket deducted from the stock of each product)
export async function UpdateBasketCompletion(params) {
  const { id, completed } = params;
  try {
      await sql`
          UPDATE baskets
          SET 
              completed = ${completed}
          WHERE 
              basket_id = ${id}
      `;
      console.log(`Basket with ID ${id} marked as completed: ${completed}`);

      if (completed) {
          // Call the function to create the trigger when the basket is completed
          await createProductStockUpdateTrigger();
      }
  } catch (error) {
      console.error('Error updating basket completion status:', error);
      throw error;
  }
}
