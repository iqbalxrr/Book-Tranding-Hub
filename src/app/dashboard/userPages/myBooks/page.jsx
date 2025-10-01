import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import React from 'react'


const books = [
  {
    image: "/book1.png",
    author: "Harper Lee",
    title: "To Kill a Mockingbird",
    reviewerImg: "/user1.png",
    reviewer: "Alice Johnson",

  },
  {
    image: "/book2.png",
    author: "George Orwell",
    title: "1984",
    reviewerImg: "/user2.png",
    reviewer: "David Smith",

  },
  {
    image: "/book3.png",
    author: "J.K. Rowling",
    title: "Harry Potter and the Sorcerer’s Stone",
    reviewerImg: "/user3.png",
    reviewer: "Sophia Brown",

  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    reviewerImg: "/user4.png",
    reviewer: "James Wilson",

  },
  {
    image: "/book-2.png",
    author: "Jane Austen",
    title: "Pride and Prejudice",
    reviewerImg: "/user5.png",
    reviewer: "Emily Davis",

  },
  {
    image: "/news-1.jpg",
    author: "Mark Twain",
    title: "Adventures of Huckleberry Finn",
    reviewerImg: "/user6.png",
    reviewer: "Michael Miller",

  },
  {
    image: "/news-2.jpg",
    author: "J.R.R. Tolkien",
    title: "The Lord of the Rings",
    reviewerImg: "/user7.png",
    reviewer: "Olivia Garcia",

  },
  {
    image: "/news-3.jpg",
    author: "Mary Shelley",
    title: "Frankenstein",
    reviewerImg: "/user8.png",
    reviewer: "Ethan Martinez",

  },
];


export default function page() {

  return (
    <div className="">
  <div className="">
    <div className="pl-0 md:pl-10">
      <Table>
        <TableCaption className="caption-top text-3xl font-semibold mb-5 text-center">
          My Books
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Book Name</TableHead>
            <TableHead>Author Name</TableHead>
            <TableHead>Reviewer</TableHead>
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
              <TableCell>{book.reviewer}</TableCell>
              <TableCell className="flex gap-2 justify-center">
                <Button className="bg-green-500 hover:bg-green-700 transition duration-700">
                  <Pencil />
                </Button>
                <Button className="bg-red-500 hover:bg-red-700 transition duration-700">
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
</div>

  )
}
