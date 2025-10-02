import Paginationn from '@/components/pagination/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Search, Star, Trash2 } from 'lucide-react';
import React from 'react'


const books = [
    {
        image: "/book1.png",
        author: "Harper Lee",
        title: "To Kill a Mockingbird",
        publishYear: 1960,
        genre: "Classic Fiction",
        rating: 4.9,
        isbn: "9780061120084",
    },
    {
        image: "/book2.png",
        author: "George Orwell",
        title: "1984",
        publishYear: 1949,
        genre: "Dystopian Fiction",
        rating: 4.8,
        isbn: "9780451524935",
    },
    {
        image: "/book3.png",
        author: "J.K. Rowling",
        title: "Harry Potter and the Sorcerer’s Stone",
        publishYear: 1997,
        genre: "Fantasy",
        rating: 4.9,
        isbn: "9780439708180",
    },
    {
        image: "/book4.png",
        author: "F. Scott Fitzgerald",
        title: "The Great Gatsby",
        publishYear: 1925,
        genre: "Classic Literature",
        rating: 4.7,
        isbn: "9780743273565",
    },
    {
        image: "/book-2.png",
        author: "Jane Austen",
        title: "Pride and Prejudice",
        publishYear: 1813,
        genre: "Romance",
        rating: 4.8,
        isbn: "9780141439518",
    },
    {
        image: "/news-1.jpg",
        author: "Mark Twain",
        title: "Adventures of Huckleberry Finn",
        publishYear: 1884,
        genre: "Adventure",
        rating: 4.6,
        isbn: "9780486280615",
    },
    {
        image: "/news-2.jpg",
        author: "J.R.R. Tolkien",
        title: "The Lord of the Rings",
        publishYear: 1954,
        genre: "Fantasy",
        rating: 5.0,
        isbn: "9780618640157",
    },
    {
        image: "/book4.png",
        author: "F. Scott Fitzgerald",
        title: "The Great Gatsby",
        publishYear: 1925,
        genre: "Classic Literature",
        rating: 4.7,
        isbn: "9780743273565",
    },
    {
        image: "/news-3.jpg",
        author: "Mary Shelley",
        title: "Frankenstein",
        publishYear: 1818,
        genre: "Gothic Horror",
        rating: 4.5,
        isbn: "9780486282114",
    },
    {
        image: "/book-2.png",
        author: "Jane Austen",
        title: "Pride and Prejudice",
        publishYear: 1813,
        genre: "Romance",
        rating: 4.8,
        isbn: "9780141439518",
    },
];



export default function page() {

    return (
        <div className='max-w-4xl mx-auto mt-6 space-y-3'>

            <div className='flex justify-between items-center'>
                <h2
                    className="text-gray-500 text-3xl font-semibold mb-5"
                >
                    My Books
                </h2>
                <div className="flex justify-end w-full max-w-md gap-2">
                    <Input
                        type="text"
                        placeholder="Search books..."
                        className="w-2/3"
                    />
                    {/* <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                        <Search className="w-4 h-4" />
                    </Button> */}
                </div>
            </div>

            <div className="h-screen flex justify-center">
                <div className="max-w-4xl w-full">
                    <Table>
                        {/* <TableCaption className="caption-top text-3xl font-semibold mb-5">
                            My Books
                        </TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Book Name</TableHead>
                                <TableHead>Author Name</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Publish Year</TableHead>
                                <TableHead>ISBN</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {books.map((book, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}.</TableCell>
                                    <TableCell>
                                        <img
                                            src={book?.image}
                                            alt={book.title}
                                            className="w-8 h-10 object-cover rounded-md mx-auto"
                                        />
                                    </TableCell>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.genre}</TableCell>
                                    <TableCell>{book.publishYear}</TableCell>
                                    <TableCell>{book.isbn}</TableCell>
                                    <TableCell className="flex gap-2 justify-center">
                                        <Button
                                            title="Mark as featured"
                                            className="bg-yellow-500 hover:bg-yellow-700 transition duration-700">
                                            <Star />
                                        </Button>
                                        <Button
                                            title="Delete"
                                            className="bg-red-500 hover:bg-red-700 transition duration-700">
                                            <Trash2 />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Paginationn />
        </div>


    )
}
