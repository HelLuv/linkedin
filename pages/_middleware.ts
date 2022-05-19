import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";


export async function middleware(req: any) {

  const {pathname, origin} = req.nextUrl;

  if (pathname === "/") {
    const session = await getToken({
      req,
      secret: process.env.NEXT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    if (!session) return NextResponse.redirect(`${origin}/home`);
  }
}