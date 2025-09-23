import Image from "next/image";
import Hero from "@/components/Hero";
import TopCategories from "@/components/TopCategories";
import TopRated from "@/components/TopRated";
import FeaturedBooks from "@/components/FeaturedBooks";
import LatestNews from "@/components/LatestNews";
import DisCount from "@/components/DisCount";



export default function Home() {
  return (
    <div>
       <Hero />
       <FeaturedBooks/>
       <TopCategories />
      <TopRated/>
      <LatestNews/>
      <DisCount/>
    </div>
  );
}
