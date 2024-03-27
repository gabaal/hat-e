'use client'

import { useState } from 'react';
import products from "../SCproducts.json";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const [sortOption, setSortOption] = useState(null);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'price':
        return a.product_price - b.product_price;
      case 'name':
        return a.product_name.localeCompare(b.product_name);
      case 'review':
        return b.average_rating - a.average_rating;
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex justify-center mt-4">
        <button
          className="mr-4 bg-gray-200 px-4 py-2 rounded-md"
          onClick={() => setSortOption('price')}
        >
          Sort by Price
        </button>
        <button
          className="mr-4 bg-gray-200 px-4 py-2 rounded-md"
          onClick={() => setSortOption('name')}
        >
          Sort by Name
        </button>
        <button
          className="bg-gray-200 px-4 py-2 rounded-md"
          onClick={() => setSortOption('review')}
        >
          Sort by Review
        </button>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <div
            key={product.product_id}
            className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.product_name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {product.product_description}
              </p>
              <Link href={`shop/${product.product_id}`}>
                <img
                  className="object-cover object-center h-70 w-70"
                  src={product.product_image_url}
                  alt={product.product_name}
                />
              </Link>
              <p className="mt-4 text-lg font-bold text-gray-800">
                £{product.product_price}
              </p>
              <div className="flex items-center mt-4">
                <p className="mr-2">
                  Avg Customer Review {product.average_rating}
                </p>
                <button
                  className="text-sm font-semibold px-3 py-1 bg-[#AAE292] rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400 snipcart-add-item"
                  data-item-id={product.product_id}
                  data-item-image={product.product_image_url}
                  data-item-name={product.product_name}
                  data-item-price={product.product_price}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
