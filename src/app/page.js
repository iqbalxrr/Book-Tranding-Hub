import Hero from "@/components/Hero";
import TopCategories from "@/components/TopCategories";
import TopRated from "@/components/TopRated";
import FeaturedBooks from "@/components/FeaturedBooks";
import LatestNews from "@/components/LatestNews";
import FeaturedAuthors from "@/components/FeaturedAuthors";
import Testmonial from "@/components/Testmonial";
import CtaSection from "@/components/CtaSection";




export default function Home() {
  return (
    <div>
       <Hero />
       <FeaturedBooks/>
       <TopCategories />
      <TopRated/>
      <CtaSection/>
      <Testmonial/>
      <FeaturedAuthors/> 
      <LatestNews/>
    </div>
  );
}
