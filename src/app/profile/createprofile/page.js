import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"
import ClerkCurrentUser from "@/app/components/ClerkCurrentUser";


export default async function NewProfile() {
      //Get the clerk user id of the current logged in user
  const clerk_id = await ClerkCurrentUser();
  console.log(`Clerk ID returned from ClerkCurrentUser() ${clerk_id}`)
  
      // Fetch user data based on clerk_id
  const userQuery = await sql`SELECT * FROM users WHERE clerk_id = ${clerk_id}`; // Assuming clerk_id is unique, so we only fetch the first result
  console.log('User data:', userQuery);
  
  async function handleSaveProfile (formData) {
    'use server'

    
    //Get the values from the form
    const full_name = formData.get("full_name");
    const email = formData.get("email");
    const address_1 = formData.get("address_1");
    const address_2 = formData.get("address_2");
    const address_3 = formData.get("address_3");
    const postcode = formData.get("postcode");
    const phone_number = formData.get("phone_number");
    
    await sql `INSERT INTO users (clerk_id, full_name, email, address_1, address_2, address_3, postcode, phone_number)
    VALUES (${clerk_id}, ${full_name}, ${email}, ${address_1}, ${address_2}, ${address_3}, ${postcode}, ${phone_number})
`
// revalidatePath("/profile")
// redirect("/profile")
  }
  return (
    <div>
      <h1>New Profile</h1>
      <form action={handleSaveProfile}>
        <label>
          Full Name:
          <input name="full_name" />
        </label>
        <label>
          Email:
          <input name="email" />
        </label>
        <label>
          Address 1:
          <input name="address_1" />
        </label>
        <label>
          Address 2:
          <input name="address_2" />
        </label>
        <label>
          Address 3:
          <input name="address_3" />
        </label>
        <label>
          Postcode:
          <input name="postcode" />
          </label>
          <label>
            Phone Number:
            <input name="phone_number" />
            </label>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Save Profile
          </button>
      </form>
    </div>
  )
}