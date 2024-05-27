"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./style.css";

const Repos = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Search for rebository</h2>
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Enter repository name"
        />
        <Link
          href={`/repos/${searchQuery}?page=1`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn"
        >
          search
        </Link>
      </form>
    </div>
  );
};

export default Repos;
