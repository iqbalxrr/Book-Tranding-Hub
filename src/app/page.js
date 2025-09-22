import Image from "next/image";
import Hero from "@/app/components/Hero";
import Featured from "@/app/components/FeaturedBooks";
import TopCategories from "@/app/components/TopCategories";
import FeaturedBooks from "@/app/components/FeaturedBooks";

import TopRatedBooks from "./components/TopRatedBooks";

import TopRated from "@/app/components/TopRated";



export default function Home() {
  return (
    <div>
       <Hero />
       <FeaturedBooks />
       <TopCategories />

      {/* Hero Section */}
      {/* <Hero /> */}

      {/* Top Rated Books Section */}
      {/* <TopRatedBooks /> */}
      
      <TopRated/>

    </div>
  );
}
