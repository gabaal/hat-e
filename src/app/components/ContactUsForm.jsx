"use client";
import { useState } from "react";

export default function Fetch() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    // This will prevent page refresh
    e.preventDefault();

    fetch("https://XXXXX.XX", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email, message: message }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setSubmitted(true);
        } else {
          setError(res.message);
        }
      })
      .catch((error) => setError(error));
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (submitted) {
    return <p>We've received your message, thank you for contacting us!</p>;
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto">
      <label className="block mb-2" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        required
      />
      <label className="block mb-2" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        required
      />

      <label className="block mb-2" htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
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
  );
}
