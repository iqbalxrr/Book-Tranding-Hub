import Image from "next/image";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import TopRated from "@/components/TopRated";


export default function Home() {
  return (
    <div>
       <Hero/>
      <Featured />
      <TopRated/>
    </div>
  );
}
