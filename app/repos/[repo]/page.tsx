"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./style.css";

const RepoPage = ({ params, searchParams }: any) => {
  const [items, setItems] = useState([]);

  const page = parseInt(searchParams.page) || 1;
  const repo = params.repo || "";
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(repo, page);
      setItems(data);
    };
    getData();
  }, [repo, page]);

  const saveItemToLocalStorage = (item: any) => {
    const existingItems = JSON.parse(
      localStorage.getItem("savedItems") || "[]"
    );
    const updatedItems = [...existingItems, item];
    localStorage.setItem("savedItems", JSON.stringify(updatedItems));
    alert("Item saved to localStorage!");
  };

  async function fetchData(repo: string, page: number) {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${repo}&per_page=${ITEMS_PER_PAGE}&page=${page}`
    );
    const data = await response.json();
    return data.items;
  }

  return (
    <div className="container">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Repository
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {items.map((item: any, i) => (
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
                <div className="button_box">
                  <button
                    onClick={() => saveItemToLocalStorage(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {page > 1 && (
                <Link
                  href={`/repos/${repo}?page=${page - 1}`}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}
              {[...Array(10)].map((_, i) => (
                <Link
                  key={i + 1}
                  href={`/repos/${repo}?page=${i + 1}`}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === i + 1
                      ? "bg-indigo-600 text-white"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  } focus:z-20 focus:outline-offset-0`}
                  aria-current={page === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </Link>
              ))}
              {page < 10 && (
                <Link
                  href={`/repos/${repo}?page=${page + 1}`}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoPage;
