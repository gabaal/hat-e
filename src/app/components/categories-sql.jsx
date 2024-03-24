import { sql } from "@vercel/postgres";

// Create Category
export async function CreateCategory(params) {
  const { category_name } = params;
  
  try {
      const result = await sql`
          INSERT INTO categories (category_name)
          VALUES (${category_name})
          RETURNING category_id;
      `;
      
      const categoryId = result[0].category_id;
      console.log(`Category created successfully with ID: ${categoryId}`);
      return categoryId;
  } catch (error) {
      console.error('Error creating category:', error);
      throw error;
  }
}

// Get All Categories
export async function GetCategories() {
  try {
      const categories = await sql`SELECT * FROM categories`;
      console.log(categories);
      return categories;
  } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
  }
}

// Get Category by ID
export async function GetCategory(params) {
  const category_id = params.id;
  try {
      const category = await sql`SELECT * FROM categories WHERE category_id = ${category_id}`;
      console.log(category);
      return category;
  } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
  }
}

// Update Category by ID
export async function UpdateCategory(params) {
  const { id, category_name } = params;
  try {
      await sql`
          UPDATE categories
          SET 
              category_name = ${category_name}
          WHERE 
              category_id = ${id}
      `;
      console.log(`Category with ID ${id} updated successfully`);
  } catch (error) {
      console.error('Error updating category:', error);
      throw error;
  }
}

// Delete Category by ID
export async function DeleteCategory(params) {
  const category_id = params.id;
  try {
      // Delete category from products
      await sql`UPDATE products SET category_id = NULL WHERE category_id = ${category_id}`;
      
      // Delete category itself
      await sql`DELETE FROM categories WHERE category_id = ${category_id}`;
      
      console.log(`Category with ID ${category_id} deleted successfully`);
  } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
  }
}