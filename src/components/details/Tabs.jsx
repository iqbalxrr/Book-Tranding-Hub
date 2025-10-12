import React from "react";
import Table from "./Table";
import ReviewForm from "@/components/details/ReviewForm";


export default function Tabs({ book }) {
  const tabs = [
    {
      label: "Description",
      content: <p>{book?.description}</p>,
    },
    {
      label: "Additional Information",
      content: <Table book={book} />,
    },
    {
  label: "Reviews",
  content: (
    <ReviewForm bookId={book._id || book.id} />
  ),
},
  ];

  return (
    <div className="flex flex-col items-center px-3 lg:px-16">
      <div role="tablist" className="tabs tabs-bordered justify-center">
        {tabs.map((tab, idx) => (
          <React.Fragment key={tab.label}>
            <input
              type="radio"
              name="my_tabs"
              role="tab"
              aria-label={tab.label}
              defaultChecked={idx === 0}
              className="tab px-1 py-2 text-base md:text-xl font-semibold checked:text-[#FF7B6B] text-center mb-3"
            />
            <div
              role="tabpanel"
              className="tab-content p-8 border-y-1 border-y-gray-200"
            >
              {tab.content}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
