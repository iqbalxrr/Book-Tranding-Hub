import Image from "next/image";
import Hero from "@/components/Hero";

import TopRatedBooks from "../components/TopRatedBooks";

import Featured from "@/components/Featured";
import TopRated from "@/components/TopRated";



export default function Home() {
  return (
    <div>

      {/* Hero Section */}
      <Hero />

      {/* Top Rated Books Section */}
      <TopRatedBooks />
       <Hero/>
      <Featured />
      <TopRated/>

    </div>
  );
}
