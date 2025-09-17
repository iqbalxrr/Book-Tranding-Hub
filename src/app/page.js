import Image from "next/image";
import Hero from "@/components/Hero";
import TopRatedBooks from "../components/TopRatedBooks";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Top Rated Books Section */}
      <TopRatedBooks />
    </div>
  );
}
