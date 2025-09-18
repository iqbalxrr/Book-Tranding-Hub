import React from 'react';



const Featured = () => {
    return (
        <div className='my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-20 mx-auto'>
             
            <div className='space-y-6'>
                <div className=' flex justify-center items-center bg-[#FFEFEF] py-8 rounded-md'>
                    <img src='/book1.png' alt="book" />
                </div>

                <div className='space-y-2.5'>
                 <h4 className='text-gray-400 font-bold'>Author Name</h4>
                 <h2 className='text-2xl font-bold hover:text-[#FF7B6B] transition duration-700'>Book Name</h2>
                 <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <img className='w-8 h-8 rounded-full ' src="/book1.png" alt="" />
                        <p>Reviewr Name</p>
                    </div>
                    <p>Rating</p>
                 </div>
                </div>

                <button
                className='w-full text-[#FF7B6B] bg-[#FFEFEF] rounded-full font-bold py-3 hover:text-white hover:bg-[#FF7B6B] transition duration-700'
                >Exchange Book</button>
            </div>

            <div className='space-y-6'>
                <div className=' flex justify-center items-center bg-[#FFEFEF] py-8 rounded-md'>
                    <img src='/book4.png' alt="book" />
                </div>

                <div className='space-y-2.5'>
                 <h4 className='text-gray-400 font-bold'>Author Name</h4>
                 <h2 className='text-2xl font-bold hover:text-[#FF7B6B] transition duration-700'>Book Name</h2>
                 <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <img className='w-8 h-8 rounded-full ' src="/book1.png" alt="" />
                        <p>Reviewr Name</p>
                    </div>
                    <p>Rating</p>
                 </div>
                </div>

                <button
                className='w-full text-[#FF7B6B] bg-[#FFEFEF] rounded-full font-bold py-3 hover:text-white hover:bg-[#FF7B6B] transition duration-700'
                >Exchange Book</button>
            </div>

            <div className='space-y-6'>
                <div className=' flex justify-center items-center bg-[#FFEFEF] py-8 rounded-md'>
                    <img src='/book3.png' alt="book" />
                </div>

                <div className='space-y-2.5'>
                 <h4 className='text-gray-400 font-bold'>Author Name</h4>
                 <h2 className='text-2xl font-bold hover:text-[#FF7B6B] transition duration-700'>Book Name</h2>
                 <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <img className='w-8 h-8 rounded-full ' src="/book1.png" alt="" />
                        <p>Reviewr Name</p>
                    </div>
                    <p>Rating</p>
                 </div>
                </div>

                <button
                className='w-full text-[#FF7B6B] bg-[#FFEFEF] rounded-full font-bold py-3 hover:text-white hover:bg-[#FF7B6B] transition duration-700'
                >Exchange Book</button>
            </div>

           
       
        </div>
    );
};

export default Featured;