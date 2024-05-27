"use client";

import React, { useState, useEffect } from "react";
const Bookmarked = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("savedItems") || "[]");
    setBookmarkedItems(savedItems);
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Saved Items
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {bookmarkedItems.map((item: any, i) => (
            <div className="group relative" key={i}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={item.owner.avatar_url}
                  alt={item.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={item.html_url}>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      {item.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {item.stargazers_count} stars
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarked;
