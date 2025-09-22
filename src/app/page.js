import Image from "next/image";
import Hero from "@/components/Hero";
import Featured from "@/components/FeaturedBooks";
import TopCategories from "@/components/TopCategories";
import FeaturedBooks from "@/components/FeaturedBooks";

import TopRatedBooks from "../components/TopRatedBooks";

import TopRated from "@/components/TopRated";



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
