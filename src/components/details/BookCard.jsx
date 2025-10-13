// BookCard.jsx
import { RiPokerHeartsLine } from "react-icons/ri";
import { TbArrowsCross } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa6";
import'../../styles/variables.css'
import Link from "next/link";

const BookCard = ({ book }) => {
  return (
    <div className="relative group bg-[#FFEFEF] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500">
      {/* Book Image */}
      <div className="flex justify-center items-center  p-3 ">
        <img
          src={book?.bookImage}
          alt={book?.bookName}
          className="h-[220px] object-cover rounded-2xl transition-transform duration-500 ease-in-out transform group-hover:scale-110"
        />
      </div>

      {/* Hover Action Icons */}
      <div className="absolute top-5 right-5 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[<RiPokerHeartsLine />, <TbArrowsCross />, <FaRegEye />].map(
          (Icon, i) => (
            <button
              key={i}
              className="w-10 h-10 flex justify-center items-center p-2 rounded-full border border-gray-500 hover:bg-[#FF7B6B] hover:text-white transition-all duration-500"
            >
              {Icon}
            </button>
          )
        )}
      </div>

      {/* Book Details */}
      <div className="px-5 space-y-2">
        <h4 className="text-gray-500 font-semibold">{book?.authorName}</h4>
        <h2 className="text-xl font-bold text-gray-900 hover:text-[#FF7B6B] transition-colors duration-500 line-clamp-1">
          {book?.bookName}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-1">
          {book?.description}
        </p>
        <div className="text-gray-500 text-sm space-y-1">
          <p>
            <span className="font-semibold">Category:</span> {book?.category}
          </p>
          <p>
            <span className="font-semibold">Pages:</span> {book?.totalPages} |{" "}
            <span className="font-semibold">Year:</span> {book?.publishYear}
          </p>
        </div>
        <div className="py-4">
        <Link href={`/books/${book?._id}`}>
        <button className="w-full custom-btn rounded-full font-bold py-3  ">
        Exchange
      </button>
        </Link>
      </div>
      </div>
      
    </div>
  );
};

export default BookCard;
