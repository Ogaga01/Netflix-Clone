import { getServerSession } from "next-auth";
import authOptions from "../../../auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export async function GET(req: Request): Promise<any> {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const movies = await prismadb.movie.findMany();
      return NextResponse.json(movies);
    } catch (error) {
      return NextResponse.json(error);
    }
  }
}
