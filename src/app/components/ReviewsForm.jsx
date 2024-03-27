"use client";

import { useState } from "react";
import { sql } from "@vercel/postgres";
export default function ReviewsForm({ params }) {
  const [reviews, setReviews] = useState({
    name: "",
    rating: "",
    comment: "",
  });
  const handleChange = (e) => {
    setReviews({ ...reviews, [e.target.name]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    await sql`
          INSERT INTO reviews (product_id, rating, comment)
          VALUES (${product_id}, ${rating}, ${comment})
      `;
  }
  //review function, link fetch request from db
  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-500 font-bold">
          Name:{" "}
        </label>
        <input
          type="text"
          id="name"
          //   value={reviews.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div>
        <label htmlFor="comment" className="block text-gray-500 font-bold">
          Comment:{" "}
        </label>
        <textarea
          id="comment"
          //   value={reviews.comment}
          onChange={handleChange}
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <button type="submit"> submit </button>
    </form>
  );
}
