import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
const encoder = new TextEncoder();

// i18n middleware'i hazırla
const intlMiddleware = createIntlMiddleware(routing);

// kendi custom middleware'ini oluştur
export async function middleware(req: NextRequest) {
  // önce i18n işlemini yap
  const intlResponse = intlMiddleware(req);

  // sonra token kontrolü vs. burada yapılacak
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token")?.value;
  const pathnameParts = url.pathname.split("/");
  const locale = pathnameParts[1];
  const isAdminPath = pathnameParts[2] === "admin";

  if (isAdminPath) {
    if (!token) {
      url.pathname = `/${locale}/giris`;
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(token, encoder.encode(JWT_SECRET));
      return intlResponse; // token geçerli, i18n middleware'den döndür
    } catch (err) {
      console.error("Token doğrulama hatası:", err);
      url.pathname = `/${locale}/giris`;
      return NextResponse.redirect(url);
    }
  }

  return intlResponse; // admin değilse direkt i18n üzerinden dön
}
export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)", // i18n matcher
    "/tr/admin/:path*",
    "/en/admin/:path*",
    "/de/admin/:path*",
  ],
};
