
import { Heart, BookOpen } from 'lucide-react'
import BookDonationButton from './BookDonationButton'
import MoneyDonationButton from './MoneyDonationButton'

export default function Donation() {
  
  return (
    <section className="bg-[#FFEFEF] py-16 px-6 text-center  shadow-sm">
      <h2 
        className="text-3xl text-[#FF7B6B] font-bold  mb-3"
      >
        Give the Gift of Reading 📖
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Your small contribution can make a big difference.  
        Donate books or funds to help students and readers who can’t afford books.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-8">
        {/* Book Donation Card */}
        <div className="bg-white rounded-2xl p-6 w-full md:w-1/3 hover:scale-105 transition duration-700">
          <BookOpen className="mx-auto text-indigo-500 mb-3" size={40} />
          <h3 className="text-xl font-semibold mb-2">Donate Books</h3>
          <p className="text-gray-500 mb-4">
            Share your old books with others who need them.  
            Every donated book helps someone continue their learning journey.
          </p>

          <BookDonationButton />

        </div>

        {/* Monetary Donation Card */}
        <div className="bg-white rounded-2xl p-6 w-full md:w-1/3 hover:scale-105 transition duration-700">
          <Heart className="mx-auto text-pink-500 mb-3" size={40} />
          <h3 className="text-xl font-semibold mb-2">Support Our Mission</h3>
          <p className="text-gray-500 mb-4">
            Help us maintain the platform and support literacy projects.  
            Even $1 makes a difference!
          </p>

            <MoneyDonationButton />

        </div>
      </div>
    </section>
  )
}

