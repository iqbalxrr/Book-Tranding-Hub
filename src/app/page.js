import Hero from "@/components/Hero";
import TopCategories from "@/components/TopCategories";
import TopRated from "@/components/TopRated";
import FeaturedBooks from "@/components/FeaturedBooks";
import LatestNews from "@/components/LatestNews";



export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedBooks />
      <TopCategories />
      <TopRated />
      <LatestNews />
    </div>
  );
}
