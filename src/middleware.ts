import { NextResponse, type NextRequest } from "next/server";
import { getBrandIdFromDomain } from "./utils/domain-utils";

// Handle brand detection
const handleBrandDetection = (request: NextRequest) => {
  const hostname = request.nextUrl.hostname;
  const detectedBrandId = getBrandIdFromDomain(hostname);

  if (detectedBrandId) {
    // Create a response
    const response = NextResponse.next();

    // Set brand cookie if not already set or if different
    const currentBrandCookie = request.cookies.get("current-brand-id")?.value;
    if (currentBrandCookie !== detectedBrandId) {
      response.cookies.set("current-brand-id", detectedBrandId, {
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  }

  return NextResponse.next();
};

export default function middleware(request: NextRequest) {
  try {
    // Handle brand detection first
    const brandResponse = handleBrandDetection(request);
    if (brandResponse) {
      return brandResponse;
    }
    // Continue with the request if no redirects are needed
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: [
    // Match all routes except for Next.js internals and static files
    "/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
