import Image from "next/image";
import Hero from "@/components/Hero";
import Featured from "@/components/FeaturedBooks";
import TopCategories from "@/components/TopCategories";
import FeaturedBooks from "@/components/FeaturedBooks";


export default function Home() {
  return (
    <div>
       <Hero />
       <FeaturedBooks />
       <TopCategories />
    </div>
  );
}
