import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import BrowseGenres from "@/components/BrowseGenres";
import TrendingMovies from "@/components/TrendingMovies";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <TrendingMovies />
      <FeaturedCollections />
      <BrowseGenres />
      <FAQ />
    </>
  );
}