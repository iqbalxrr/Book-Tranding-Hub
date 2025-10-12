"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

export default function AddNewBook() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  // 🔑 ImgBB API Key
  const imgbbApiKey = "5db559a13c9f779e3398fe1e81c15a64";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Upload Image to ImgBB
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      setUploading(false);
      return response.data.data.url;
    } catch (error) {
      setUploading(false);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed!",
        text: "Please try again later.",
      });
      console.error(error);
      return null;
    }
  };

  // ✅ Handle Form Submit
  const onSubmit = async (data) => {
    setLoading(true);

    let imageUrl = "";
    if (data.bookImage[0]) {
      imageUrl = await uploadImage(data.bookImage[0]);
    }

    const newBook = {
      ...data,
      bookImage: imageUrl,
      bookOwner: user?.email || "unknown",
      status: "available",
    };

    try {
      const res = await axios.post("/api/books", newBook);
      if (res?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Book Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something went wrong!",
          text: "Please check your inputs and try again.",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        text: "Please try again later.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen py-30">
      {/* Header Section */}
      <section className="bg-[url('/ratting-bg.jpg')] py-22 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Add New Book
          </h1>
          <div className="mt-2 text-gray-600">
            <a href="/">Home</a> /{" "}
            <span className="text-red-500 underline">
              <a href="/addNewBooks"> Add new Books</a>
            </span>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div className="container mx-auto p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Book Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Book Name</label>
            <input
              type="text"
              {...register("bookName", { required: "Book name is required" })}
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-semibold mb-1">
              Author Name
            </label>
            <input
              type="text"
              {...register("authorName", { required: "Author name is required" })}
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author name"
            />
          </div>

          {/* Book Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Upload Book Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("bookImage", { required: "Book image is required" })}
              className="w-full p-2 border border-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            {uploading && (
              <p className="text-blue-500 text-xs mt-1">Uploading image...</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Kids Toys">Kids Toys</option>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold mb-1">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="Dhaka, Bangladesh"
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-1">Tags</label>
            <select
              {...register("tags")}
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-semibold mb-1">
              Total Pages
            </label>
            <input
              type="number"
              {...register("totalPages")}
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="330"
            />
          </div>

          {/* Publish Year */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Publish Year
            </label>
            <input
              type="number"
              {...register("publishYear")}
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="2021"
            />
          </div>

          {/* Format */}
          <div>
            <label className="block text-sm font-semibold mb-1">Format</label>
            <select
              {...register("format")}
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-semibold mb-1">Language</label>
            <select
              {...register("language")}
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-semibold mb-1">
              Read Free Text
            </label>
            <textarea
              {...register("readFreeText")}
              rows="3"
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="Write some free reading content..."
            ></textarea>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="4"
              className="w-full p-3 border border-gray-400 focus:ring-2 focus:ring-blue-500"
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
              disabled={loading || uploading}
              className="text-white bg-gradient-to-r from-[#FF7B6B] to-[#FF4E4E] rounded-full font-bold py-3 px-8 shadow-lg hover:opacity-90 transition duration-500"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
