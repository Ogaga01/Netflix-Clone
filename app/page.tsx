"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Home() {
  const { data: user } = useCurrentUser();
  useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  return (
    <>
      <h1 className="text-4xl text-green-500">Hello there</h1>;
      <p className="text-white">Logged in as {user?.name}</p>
      <button
        className="h-10 w-full bg-white"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </>
  );
}
