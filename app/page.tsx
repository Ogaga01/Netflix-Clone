"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";

export default function Home() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <>
      <Navbar />
      <Billboard />
    </>
  );
}
