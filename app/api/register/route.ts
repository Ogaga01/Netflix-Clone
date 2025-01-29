import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    // Define three vars extracted from req.body
    const { email, userName, password } = await req.json();

    // Check to see if there is already an email registered for the email provided by the user.
    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered :(" });
    }

    // Hash the user's password.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save the hashed password into a new user model.
    const user = await prismadb.user.create({
      data: {
        email,
        userName,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
