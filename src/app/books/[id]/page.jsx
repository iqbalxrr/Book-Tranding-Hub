"use server";

import BookMarkButton from "@/components/AllButtons/BookMarkButton";
import ExchangedButton from "@/components/AllButtons/ExchangedButton";
import Buttons from "@/components/details/Buttons";
import RelatedBooks from "@/components/details/RelatedBooks";
import Tabs from "@/components/details/Tabs";
import LiveChatButton from "@/components/Live Chat/LiveChatButton";
import LiveLocation from "@/components/LiveLocation/LiveLocation";
import ReadMore from "@/components/modal/ReadMore";
import React from "react";
import { TbArrowsCross } from "react-icons/tb";

const DetailesPage = async ({ params }) => {
  const { id } = await params;

  // Fetch book data directly using fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`);
  const data = await res.json();

  const {
    authorName,
    bookImage,
    bookName,
    category,
    description,
    format,
    language,
    publishYear,
    location,
    status,
    tags,
    totalPages,
    bookOwner
  } = data?.book || {};

  console.log(bookOwner);

  return (
    <div className="mt-20 space-y-24">
      {/* Header */}
      <div className="flex justify-center items-center w-full h-[300px] bg-[url(/detailsBG.jpg)] bg-cover bg-center">
        <div className="text-center space-y-3">
          <h1 className="text-3xl lg:text-4xl font-bold text-black drop-shadow">
            Book Details
          </h1>
          <Buttons />
        </div>
      </div>

      {/* Description */}
      <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row gap-12">
        {/* Left Column */}
        <div className="md:w-5/12 space-y-6">
          <div className="flex justify-center bg-gray-50 w-full px-6 py-8 md:py-12 border border-gray-200 rounded-2xl shadow">
            <img
              src={bookImage}
              alt={bookName}
              className="max-w-[250px] h-auto rounded-lg"
            />
          </div>

          <div className="mt-6">
            <LiveLocation locationName={location} />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-7/12">
          <div className="">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h2 className="text-4xl font-bold mb-2">{bookName}</h2>
              <h1 className="bg-green-200 px-4 py-1 rounded-4xl font-semibold text-green-800">
                Status: {status}
              </h1>
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-6">{authorName}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <ReadMore book={data?.book} />
              <ExchangedButton bookId={data?.book?._id} status={data?.book?.status} bookOwner={bookOwner}/>
              <LiveChatButton bookData={data?.book} />
            </div>
          </div>

          <div className="flex items-center gap-3 my-6">
            <BookMarkButton book={data?.book} />
            <button className="w-12 h-12 flex justify-center items-center hover:text-white transition duration-500 rounded-full border border-gray-300 hover:bg-[#FF7B6B]">
              <TbArrowsCross />
            </button>
          </div>

          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow">
            <div className="grid grid-cols-2 lg:grid-cols-4 bg-gray-50 p-6 gap-6">
              {[
                { label: "Location", value: location || "N/A" },
                { label: "Tags", value: tags },
                { label: "Total Pages", value: totalPages },
                { label: "Publish Year", value: publishYear },
                { label: "Category", value: category },
                { label: "Format", value: format },
                { label: "Language", value: language },
                { label: "Country", value: "United States" },
              ].map((info, i) => (
                <div key={i}>
                  <h4 className="text-lg font-semibold mb-1">{info.label}</h4>
                  <p className="text-gray-600">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl shadow mt-6">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6">
              {[
                "Give your old books a new home",
                "Discover books without extra cost",
                "Connect with book lovers & exchangers",
                "Read more, spend less",
              ].map((text, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-[#FF7B6B] text-lg">
                    <TbArrowsCross />
                  </span>
                  <p className="text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <Tabs book={data?.book} />
      </div>

      <div className="container mx-auto">
        <RelatedBooks category={data?.book?.category} />
      </div>
    </div>
  );
};

export default DetailesPage;

// ???