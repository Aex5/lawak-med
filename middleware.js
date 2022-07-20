import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/auth/login")) {
    const token = await req.cookies.get("token");

    if (token) {
      return NextResponse.redirect("http://localhost:3000/");
    }
  }

  if (req.nextUrl.pathname.startsWith("/posts")) {
    const token = await req.cookies.get("token");

    if (!token) {
      return NextResponse.redirect("http://localhost:3000/auth/login");
    }
  }
}
