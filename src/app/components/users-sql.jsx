import { sql } from "@vercel/postgres";

// Get All Users
export async function GetUsers() {
  const users = await sql`SELECT * FROM users`;
  console.log(users);
  return (users);
}

// Get User by ID
export async function GetUser(params) {
  const user_id = params.id; // Assuming you're passing the user_id in params
  try {
      const user = await sql`SELECT * FROM users WHERE user_id = ${user_id}`;
      console.log(user);
      return user;
  } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
  }
}

//Delete User by ID
export async function DeleteUser(params) {
  const user_id = params.id; // Assuming you're passing the user_id in params
  try {
      await sql`DELETE FROM users WHERE user_id = ${user_id}`;
      console.log(`User with ID ${user_id} deleted successfully`);
  } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
  }
}

// Update User by ID
export async function UpdateUser(params) {
  const { id, clerk_id, full_name, email, address_1, address_2, address_3, postcode, phone_number } = params;
  try {
      await sql`
          UPDATE users
          SET 
              clerk_id = ${clerk_id},
              full_name = ${full_name},
              email = ${email},
              address_1 = ${address_1},
              address_2 = ${address_2},
              address_3 = ${address_3},
              postcode = ${postcode},
              phone_number = ${phone_number}
          WHERE 
              user_id = ${id}
      `;
      console.log(`User with ID ${id} updated successfully`);
  } catch (error) {
      console.error('Error updating user:', error);
      throw error;
  }
}

// Create User
export async function CreateUser(params) {
  const { clerk_id, full_name, email, address_1, address_2, address_3, postcode, phone_number } = params;
  try {
      await sql`
          INSERT INTO users (clerk_id, full_name, email, address_1, address_2, address_3, postcode, phone_number)
          VALUES (${clerk_id}, ${full_name}, ${email}, ${address_1}, ${address_2}, ${address_3}, ${postcode}, ${phone_number})
      `;
      console.log('User created successfully');
  } catch (error) {
      console.error('Error creating user:', error);
      throw error;
  }
}