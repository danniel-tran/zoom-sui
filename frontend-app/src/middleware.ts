// Source - https://stackoverflow.com/q
// Posted by Ahmed Wagdi
// Retrieved 2025-11-19, License - CC BY-SA 4.0

import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("it ran");
  
  return NextResponse.next();

  return NextResponse.json({ hello: "middleware" });
}
