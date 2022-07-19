import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await req.cookies.get("token");
  console.log(token);
}
