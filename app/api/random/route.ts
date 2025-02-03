import { getServerSession } from "next-auth";
import authOptions from "../../../auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const movieCount = await prismadb.movie.count();
      const randomId = Math.floor(Math.random() * movieCount);
      const randomMovies = await prismadb.movie.findMany({
        take: 1,
        skip: randomId,
      });
      return NextResponse.json(randomMovies[0]);
    } catch (error) {
      return NextResponse.json(error);
    }
  } else {
    // Handle the case where there is no session
    return new Response(null, { status: 401 }); // 401 Unauthorized
  }
}
