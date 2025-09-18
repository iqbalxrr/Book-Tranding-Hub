import Image from "next/image";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import TopCategories from "@/components/TopCategories";


export default function Home() {
  return (
    <div>
       <Hero />
       <Featured />
       <TopCategories />
      
    </div>
  );
}
