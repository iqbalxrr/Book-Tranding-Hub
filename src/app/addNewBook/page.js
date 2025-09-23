'use client'
import { useForm } from "react-hook-form";
import baseUrl from "../../hooks/BaseUrl";


export default function AddNewBook() {

    const axiosInstance = baseUrl()


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        // You can send data to your API here
        reset();
        const nweBook = {
            ...data
        }
        console.log(nweBook);

        try {
            const {data} = await axiosInstance.post('/api/books', nweBook)

            console.log(data);
        } catch (error) {
            console.log(error);
        }


    };

    return (
        <div className="min-h-screen bg-gray-50 pt-35 pb-8 px-4">
            <div className="container mx-auto bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Add New Book
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Book Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Book Name</label>
                        <input
                            type="text"
                            {...register("bookName", { required: "Book name is required" })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter book name"
                        />
                        {errors.bookName && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.bookName.message}
                            </p>
                        )}
                    </div>

                    {/* Author Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Author Name</label>
                        <input
                            type="text"
                            {...register("authorName", { required: "Author name is required" })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter author name"
                        />
                    </div>

                    {/* Book Image URL */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Book Image URL</label>
                        <input
                            type="url"
                            {...register("bookImage", { required: "Book image URL is required" })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        // placeholder="https://example.com/book.jpg"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            {...register("category")}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Kids Toys">Kids Toys</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                        </select>
                    </div>

                    {/* SKU */}
                    <div>
                        <label className="block text-sm font-medium mb-1">SKU</label>
                        <input
                            type="text"
                            {...register("sku")}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="FTC1020B65D"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Tags</label>
                        <select
                            {...register("tags")}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Tag</option>
                            <option value="Design">Design</option>
                            <option value="Low Book">Low Book</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Education">Education</option>
                        </select>
                    </div>


                    {/* Total Pages */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Total Pages</label>
                        <input
                            type="number"
                            {...register("totalPages")}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="330"
                        />
                    </div>

                    {/* Publish Year */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Publish Year</label>
                        <input
                            type="number"
                            {...register("publishYear")}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="2021"
                        />
                    </div>

                    {/* Format */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Format</label>
                        <select
                            {...register("format")}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Format</option>
                            <option value="Hardcover">Hardcover</option>
                            <option value="Paperback">Paperback</option>
                            <option value="eBook">eBook</option>
                            <option value="Audiobook">Audiobook</option>
                        </select>
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Language</label>
                        <select
                            {...register("language")}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Language</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="Arabic">Arabic</option>
                        </select>
                    </div>

                    {/* Read Free Text */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Read Free Text</label>
                        <textarea
                            {...register("readFreeText")}
                            rows="3"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Write some free reading content..."
                        ></textarea>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows="4"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter book description..."
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="w-full text-white bg-[#FF7B6B] rounded-full font-bold py-2.5 hover:text-[#FF7B6B] hover:bg-[#FFEFEF] hover:border-1 hover:border-[#FF7B6B] transition duration-700"
                        >
                            Add Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

