import { sql } from "@vercel/postgres";

// Get All Reviews
export async function GetReviews() {
  const reviews = await sql`SELECT * FROM reviews`;
  console.log(reviews);
  return reviews;
}

// Get Review by ID
export async function GetReview(params) {
  const review_id = params.id;
  try {
      const review = await sql`SELECT * FROM reviews WHERE review_id = ${review_id}`;
      console.log(review);
      return review;
  } catch (error) {
      console.error('Error fetching review:', error);
      throw error;
  }
}

// Create Review
export async function CreateReview(params) {
  const { product_id, rating, comment } = params;
  
  // Validate rating 1 - 5
  if (![1, 2, 3, 4, 5].includes(rating)) {
    throw new Error('Rating must be an integer value between 1 and 5.');
  }
  
  try {
      await sql`
          INSERT INTO reviews (product_id, rating, comment)
          VALUES (${product_id}, ${rating}, ${comment})
      `;
      console.log('Review created successfully');
  } catch (error) {
      console.error('Error creating review:', error);
      throw error;
  }
}

// Update Review by ID
export async function UpdateReview(params) {
  const { id, product_id, rating, comment } = params;
  
  // Validate rating 1 - 5
  if (![1, 2, 3, 4, 5].includes(rating)) {
    throw new Error('Rating must be an integer value between 1 and 5.');
  }
  
  try {
      await sql`
          UPDATE reviews
          SET 
              product_id = ${product_id},
              rating = ${rating},
              comment = ${comment}
          WHERE 
              review_id = ${id}
      `;
      console.log(`Review with ID ${id} updated successfully`);
  } catch (error) {
      console.error('Error updating review:', error);
      throw error;
  }
}

// Delete Review by ID
export async function DeleteReview(params) {
  const review_id = params.id;
  try {
      await sql`DELETE FROM reviews WHERE review_id = ${review_id}`;
      console.log(`Review with ID ${review_id} deleted successfully`);
  } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
  }
}