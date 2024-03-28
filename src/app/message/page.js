import Link from "next/link";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"

export default function NewMessage() {
  
  async function handleSaveMessage (formData) {
    'use server'
    
    const name = formData.get("name")
    const email = formData.get('email')
    const comment = formData.get('comment')
    
    console.log(name, email, comment)
    await sql`
      INSERT INTO messages
        (name, email, comment)
        VALUES (${name}, ${email}, ${comment})`
        
      revalidatePath("/")
      redirect("/")
   }
   
   return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">Contact Us</h1>
      <form action={handleSaveMessage} className="max-w-md mx-auto">
        
      <label className="block mb-2" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        required
      />
      <label className="block mb-2" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="text"
        className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        required
      />

      <label className="block mb-2" htmlFor="message">
        Message
      </label>
      <textarea
        id="comment"
        name="comment"
        className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        required
      ></textarea>
      <div className="text-center">
        <button
          type="submit"
          className="bg-[#AAE292] hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </div>
        
        </form>
    </div>
   )
}