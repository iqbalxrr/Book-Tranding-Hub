// src/components/TopRated.jsx

import Image from "next/image";

const topRatedBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    image: "/book1.png",
    rating: 4.9,
    description: "An easy & proven way to build good habits and break bad ones.",
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    image: "/book2.png",
    rating: 4.8,
    description: "Learn how to focus without distraction in a noisy world.",
  },
  {
    id: 3,
    title: "The Lean Startup",
    author: "Eric Ries",
    image: "/book3.png",
    rating: 4.7,
    description: "A revolutionary approach to building successful startups.",
  },
  {
    id: 4,
    title: "Zero to One",
    author: "Peter Thiel",
    image: "/book4.png",
    rating: 4.6,
    description: "Notes on startups and how to build the future.",
  },
  {
    id: 5,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    image: "/book5.png",
    rating: 4.8,
    description: "Powerful lessons in personal change and leadership.",
  },
  {
    id: 6,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    image: "/book6.png",
    rating: 4.7,
    description: "What the rich teach their kids about money that the poor don't.",
  },
];

export default function TopRated() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            ⭐ Top Rated Books
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most loved books by readers around the world.  
            These highly rated books are a must-read for anyone looking  
            to gain knowledge, inspiration, and new perspectives.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {topRatedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#FFEFEF] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
            >
              <Image
                src={book.image}
                alt={book.title}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
                <p className="text-yellow-500 font-bold mb-3">
                  ⭐ {book.rating}
                </p>
                <p className="text-gray-600 text-sm flex-grow">
                  {book.description}
                </p>
                <button className="mt-4 bg-[#FF7B6B] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
