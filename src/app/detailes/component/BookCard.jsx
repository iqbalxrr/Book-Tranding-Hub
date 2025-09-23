// BookCard.jsx
import { RiPokerHeartsLine } from "react-icons/ri";
import { TbArrowsCross } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa6";

const BookCard = ({ book }) => {
  return (
    <div className="space-y-6 group relative">
      {/* Image */}
      <div className="flex justify-center items-center bg-[#FFEFEF] py-8 rounded-md">
        <img
          className="h-[213px] transition-transform duration-500 ease-in-out transform group-hover:scale-110"
          src={book.image}
          alt={book.title}
        />
      </div>

      {/* Hover actions */}
      <div className="absolute top-24 right-3 flex flex-col gap-3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[<RiPokerHeartsLine />, <TbArrowsCross />, <FaRegEye />].map(
          (Icon, i) => (
            <button
              key={i}
              className="w-9 h-9 flex justify-center items-center hover:text-white transition duration-700 p-2 rounded-full border border-gray-400 hover:bg-[#FF7B6B]"
            >
              {Icon}
            </button>
          )
        )}
      </div>

      {/* Details */}
      <div className="space-y-2.5">
        <h4 className="text-gray-400 font-bold">{book.author}</h4>
        <h2 className="text-2xl font-bold hover:text-[#FF7B6B] transition duration-700">
          {book.title}
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              className="w-8 h-8 rounded-full"
              src={book.reviewerImg}
              alt={book.reviewer}
            />
            <p>{book.reviewer}</p>
          </div>
          <p>{book.rating}</p>
        </div>
      </div>

      {/* Action */}
      <button className="w-full text-[#FF7B6B] bg-[#FFEFEF] rounded-full font-bold py-3 hover:text-white hover:bg-[#FF7B6B] transition duration-700">
        Exchange Book
      </button>
    </div>
  );
};

export default BookCard;
