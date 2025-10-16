import Hero from "@/components/Hero";
import TopCategories from "@/components/TopCategories";
import TopRated from "@/components/TopRated";
import FeaturedBooks from "@/components/FeaturedBooks";
import LatestNews from "@/components/LatestNews";
import FeaturedAuthors from "@/components/FeaturedAuthors";
import Testmonial from "@/components/Testmonial";
import CtaSection from "@/components/CtaSection";
import DonateSection from "@/components/donation/Donation";
import Donation from "@/components/donation/Donation";




export default function Home() {
  return (
    <div>
       <Hero />
       <FeaturedBooks/>
       <TopCategories />
      <TopRated/>
      <CtaSection/>
      <Donation />
      <Testmonial/>
      <FeaturedAuthors/> 
      <LatestNews/>
    </div>
  );
}
