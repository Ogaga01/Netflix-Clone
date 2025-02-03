"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import { useCurrentUser } from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
import useBillboard from "@/hooks/useBillboard";

export default function Home() {
  const { isLoading: isBillBoardLoading } = useBillboard();
  const { data: movies = [], isLoading } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  // const { data: user } = useCurrentUser();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  if (session) {
    if (isLoading || isBillBoardLoading) {
      return (
        <div className="text-white text-xl md:text-3xl h-[56.25vw] flex justify-center items-center">
          Loading...
        </div>
      );
    } else {
      return (
        <>
          <InfoModal visible={isOpen} onClose={closeModal} />
          <Navbar />
          <Billboard />
          <div className="pb-40">
            <MovieList title="Trending Now" data={movies} />
            <MovieList title="My List" data={favorites} />
          </div>
        </>
      );
    }
  }
}
