import { Heart, BookOpen } from 'lucide-react'
import BookDonationButton from './BookDonationButton'
import MoneyDonationButton from './MoneyDonationButton'

export default function Donation() {
  const primaryColor = 'text-[#FF7B6B]'; // Define a single primary color for consistency

  return (
    // Updated background to a soft light gray for a cleaner look
    <section className=" py-20 px-4 text-center">
      
      {/* Title - Bigger, bolder, and using a modern, deep indigo color */}
      <h2 
        className={`text-5xl font-extrabold text-[#1E2939] tracking-tight mb-4`}
      >
        Empower a Reader
      </h2>
      
      {/* Description - Darker text for better contrast and readability */}
      <p className="text-gray-700 max-w-3xl mx-auto mb-12 text-lg">
        Your contribution, no matter how small, fuels our mission to provide books and educational resources to those who need them most.
      </p>

      {/* Donation Card Container */}
      <div className="flex flex-col lg:flex-row justify-center gap-8 max-w-5xl mx-auto">
        
        {/* Book Donation Card */}
        <div 
          className="bg-white rounded-3xl p-8 w-full lg:w-1/2 shadow-2xl transition duration-500 hover:shadow-indigo-300/50 hover:scale-[1.02] border border-gray-100"
        >
          <BookOpen className={`mx-auto ${primaryColor} mb-4`} size={48} />
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Donate Books</h3>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Share your unused books and directly impact a student's learning journey. We handle the logistics—you provide the literacy.
          </p>

          <BookDonationButton />

        </div>

        {/* Monetary Donation Card */}
        <div 
          className="bg-white rounded-3xl p-8 w-full lg:w-1/2 shadow-2xl transition duration-500 hover:shadow-indigo-300/50 hover:scale-[1.02] border border-gray-100"
        >
          {/* Using the same primary color for visual cohesion */}
          <Heart className={`mx-auto ${primaryColor} mb-4`} size={48} /> 
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Support Our Mission</h3>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Monetary donations help us acquire new books, maintain the platform, and fund literacy programs in underserved communities.
          </p>
          
          <MoneyDonationButton />

        </div>
      </div>
    </section>
  )
}