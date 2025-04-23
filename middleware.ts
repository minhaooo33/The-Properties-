import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
    console.log("MIDDLEWARE",request.url);
    if(request.method === "POST") {
        return NextResponse.next();
    }

    const cookiesStore = await cookies();
    const token = cookiesStore.get("firebaseAuthToken")?.value;

    if (!token &&request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.next();
    };
        
    if(token && request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", request.url));
    }
      
    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
      }

    const decodedToken = decodeJwt(token);
    if(!decodedToken.admin) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login","/admin-dashboard", "/admin-dashboard/:path*",],
  
};