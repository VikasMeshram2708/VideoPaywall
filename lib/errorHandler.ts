import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const ErrorHandler = (request: NextRequest, error: Error) => {
  if (error instanceof ZodError) {
    const filteredErr = error?.issues?.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    return NextResponse.json(
      {
        message: filteredErr,
      },
      {
        status: 422,
      }
    );
  }
  if (error instanceof PrismaClientKnownRequestError) {
    if (process.env.NODE_ENV === "development") {
      console.error("Prisma error stack:", error.stack);
    }
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 422,
      }
    );
  }
  return NextResponse.json(
    {
      message: error.message,
    },
    {
      status: 500,
    }
  );
};
