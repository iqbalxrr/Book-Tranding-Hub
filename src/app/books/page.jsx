"use client";

import React, { useEffect, useState } from "react";
import BookCard from "@/components/details/BookCard";
import baseUrl from "@/hooks/BaseUrl";
import Loading from "@/components/Loading";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const limit = 15;

 
  const fetchBooks = async () => {
    setLoading(true);
    try {
      let url = `/api/books?page=${page}&limit=${limit}`;
      if (search) url += `&search=${search}`;
      if (category) url += `&category=${category}`;

      const res = await baseUrl().get(url);
      setBooks(res.data.books);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchCategories = async () => {
    try {
      const res = await baseUrl().get("/api/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search, category]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen py-30">
      {/* Banner */}
      <section className="bg-[url('/ratting-bg.jpg')] py-22 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            All Books
          </h1>
          <div className="mt-2 text-gray-600">
            <a href="/">Home</a> /{" "}
            <span className="text-red-500">
              <a href="/books">Books</a>
            </span>
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCategory("")}
              className={`px-4 py-2 rounded-full border transition ${
                category === "" ? "bg-red-500 text-white" : "bg-gray-100"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full border transition ${
                  category === cat ? "bg-red-500 text-white" : "bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Books List */}
      <section className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-center">
        {loading ? (
          <Loading />
        ) : books?.length > 0 ? (
          books?.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No books found.
          </p>
        )}
      </section>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Prev
        </button>
        <span className="px-4 py-2 font-semibold">
          {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
