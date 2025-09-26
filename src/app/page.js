import Hero from "@/components/Hero";
import TopCategories from "@/components/TopCategories";
import TopRated from "@/components/TopRated";
import FeaturedBooks from "@/components/FeaturedBooks";
import LatestNews from "@/components/LatestNews";
import WhatClientSay from "@/components/WhatClientSay";
import CtaSection from "@/components/CtaSection";



export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedBooks />
      <TopCategories />
      <TopRated />
      <CtaSection />
      <LatestNews />
      <WhatClientSay />
    </div>
  );
}
