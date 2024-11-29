import { signUpSchema } from "@/app/models/UserSchema";
import { ErrorHandler } from "@/lib/errorHandler";
import prisma from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = signUpSchema.safeParse(await request.json());

    if (!reqBody.success) {  
        const errMsg = reqBody.error.issues.map((e) => ({
        filed: e.path.join(""),
        message: e.message,
      }));

      return NextResponse.json(
        {
          message: errMsg,
        },
        {
          status: 400,
        }
      );
    }

    const { email, password, avatar_url, name } = reqBody.data;
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      return NextResponse.json(
        {
          message: "User Already Exists",
        },
        {
          status: 400,
        }
      );
    }

    const pwHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: pwHash,
        avatar_url,
        name,
      },
    });

    return NextResponse.json(
      {
        message: "User Registered Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
