import React from 'react';
import Table from './Table';


export default function Tabs({book}) {
    const tabs = [
        {
            label: "Description",
            content: (
                <p>
                    {book?.description}
                </p>
            ),
        },
        {
            label: "Additional Information",
            content: (
               <Table 
               book={book}
               />
            ),
        },
        {
            label: "Reviews (3)",
            content: (
                <div className="flex items-start gap-4">
                    <img
                        src="https://i.pravatar.cc/50"
                        alt="user"
                        className="w-18 h-18 rounded-full"
                    />
                    <div>
                        <h3 className="font-semibold">Leslie Alexander</h3>
                        <p className="text-sm text-gray-500">February 10, 2024 at 2:37 pm</p>
                        <p className="mt-2">
                            Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architect.
                            Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architect.
                            Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto…
                        </p>
                        <div className="mt-2 text-orange-500">⭐⭐⭐⭐☆</div>
                    </div>
                </div>
            ),
        },
    ];



    return (
        <div className='flex flex-col items-center px-3 lg:px-16'>

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
                        <div role="tabpanel" className="tab-content p-8 border-y-1 border-y-gray-200">
                            {tab.content}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
