'use client'

import { useState } from 'react';
import products from "../SCproducts.json";
import Link from "next/link";
import Image from "next/image";

import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { SignedIn } from "@clerk/nextjs";
export default function Page() {
  const [sortOption, setSortOption] = useState(null);
  const [isDescending, setIsDescending] = useState(true);

  const sortedProducts = [...products].sort((a, b) => {
    let comparison = 0;
    switch (sortOption) {
      case 'price':
        comparison = a.product_price - b.product_price;
        break;
      case 'name':
        comparison = a.product_name.localeCompare(b.product_name);
        break;
      case 'review':
        comparison = b.average_rating - a.average_rating;
        break;
      default:
        break;
    }
    return isDescending ? comparison : -comparison;
  });

  const handleSortOptionChange = (option) => {
    if (sortOption === option) {
      setIsDescending(!isDescending);
    } else {
      setIsDescending(true);
      setSortOption(option);
    }
  };


  return (
    <div>
      <div className="flex justify-center mt-4 mb-4 space-x-4">
        <button
          className="text-sm font-semibold px-4 py-2 bg-[#AAE292] rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
          onClick={() => handleSortOptionChange('price')}
        >
          Sort by Price
        </button>
        <button
          className="text-sm font-semibold px-4 py-2 bg-[#AAE292] rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
          onClick={() => handleSortOptionChange('name')}
        >
          Sort by Name
        </button>
        <button
          className="text-sm font-semibold px-4 py-2 bg-[#AAE292] rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
          onClick={() => handleSortOptionChange('review')}
        >
          Sort by Review
        </button>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <div
            key={product.product_id}
            className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.product_name}
                </h3>
                <p className="mt-2 text-lg text-gray-600">
                  {product.product_description}
                </p>

                <Link href={`shop/${product.product_id}`}>
                  <img
                    className="object-cover object-center h-70 w-70"
                    src={product.product_image_url}
                    alt={product.product_name}
                  />
                </Link>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="mt-4 text-lg font-bold text-gray-800">
                    £{product.product_price}
                  </p>
                  {product.average_rating !== "0.0" && (
                    <div className="flex items-center mt-2">
                      <p>Average Reviews:</p>
                      {Array.from({ length: Math.floor(Number(product.average_rating)) }, (_, index) => (
                        <FaStar key={index} className="text-yellow-500 ml-2" />
                      ))}
                      {product.average_rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-500" />}
                      <span className="ml-2">{product.average_rating}</span>
                    </div>
                  )}
                </div>
                <SignedIn>
                <button
                  className="text-sm font-semibold px-4 py-2 bg-[#AAE292] rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400 snipcart-add-item"
                  data-item-id={product.product_id}
                  data-item-image={product.product_image_url}
                  data-item-name={product.product_name}
                  data-item-price={product.product_price}
                >
                  Add to Cart
                </button>
                </SignedIn>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}  