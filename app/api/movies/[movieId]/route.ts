import { getServerSession } from "next-auth";
import authOptions from "../../../../auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const movies = await prismadb.movie.findMany();
      return NextResponse.json(movies);
    } catch (error) {
      return NextResponse.json(error);
    }
  } else {
    // Handle the case where there is no session
    return new Response(null, { status: 401 }); // 401 Unauthorized
  }
}
