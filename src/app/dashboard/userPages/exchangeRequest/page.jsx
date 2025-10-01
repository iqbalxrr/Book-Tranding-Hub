"use client"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const books = [
  {
    image: "/book1.png",
    author: "Harper Lee",
    title: "To Kill a Mockingbird",
    exchangerName: "Alice Johnson",
    exchangerEmail: "alice.johnson@example.com",
  },
  {
    image: "/book2.png",
    author: "George Orwell",
    title: "1984",
    exchangerName: "David Smith",
    exchangerEmail: "david.smith@example.com",
  },
  {
    image: "/book3.png",
    author: "J.K. Rowling",
    title: "Harry Potter and the Sorcerer’s Stone",
    exchangerName: "Sophia Brown",
    exchangerEmail: "sophia.brown@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
  {
    image: "/book4.png",
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    exchangerName: "James Wilson",
    exchangerEmail: "james.wilson@example.com",
  },
]

export default function ExchangeRequests() {

  const handleAccept = (email) => {
    console.log("Accepted:", email)
  }

  const handleReject = (email) => {
    console.log("Rejected:", email)
  }

  return (
    <div className="h-screen flex justify-center">
      <div className="max-w-4xl w-full">
        <Table>
          <TableCaption className="caption-top text-3xl font-semibold mb-5">
            Exchange Requests
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Book Name</TableHead>
              <TableHead>Exchanger Name</TableHead>
              <TableHead>Exchanger Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={book?.image}
                    alt={book.title}
                    className="w-8 h-10 object-cover rounded-md mx-auto"
                  />
                </TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.exchangerName}</TableCell>
                <TableCell>{book.exchangerEmail}</TableCell>
                <TableCell className="flex gap-3 justify-center">

                  <Button
                    className="bg-green-500 relative overflow-hidden px-4 py-2 text-white rounded-sm group"
                    onClick={() => handleAccept(book.exchangerEmail)}
                  >
                    <span className="relative z-10">Accept</span>
                    <span className="absolute inset-0 bg-green-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                  </Button>

                  <Button
                    className="bg-red-500 relative overflow-hidden px-4 py-2 text-white rounded-sm group"
                    onClick={() => handleReject(book.exchangerEmail)}
                  >
                    <span className="relative z-10">Reject</span>
                    <span className="absolute inset-0 bg-red-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
