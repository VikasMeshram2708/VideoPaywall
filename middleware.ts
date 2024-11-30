// export { auth as middleware } from "@/auth"

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const publicPath = new Set(["/user/login", "/user/signup"]);
  const isPublicPath = publicPath.has(path);

  if (!req.auth && !isPublicPath) {
    return Response.redirect(new URL("/user/login", req.url));
  }
  if (req.auth && isPublicPath) {
    return Response.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/user/login", "/user/signup", "/user/:path*"],
};
