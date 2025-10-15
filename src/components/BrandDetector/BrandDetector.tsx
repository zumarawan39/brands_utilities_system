import BrandProvider from "@/provider/BrandProvider";
import { getBrandFromServerCookies } from "@/utils/cookie-utils";
import { getBrandForSSR } from "@/utils/domain-utils";
import { headers } from "next/headers";


interface BrandDetectorProps {
  children: React.ReactNode;
}

export async function BrandDetector({ children }: BrandDetectorProps) {
  // Get headers for SSR brand detection
  const headersList = await headers();

  // First try to get brand from cookies (set by middleware)
  let detectedBrandId = await getBrandFromServerCookies();

  // If no cookie, try domain detection
  if (!detectedBrandId) {
    detectedBrandId = getBrandForSSR(headersList);
  }

  // Set the detected brand (this will be used by the client-side initialization)
  if (detectedBrandId) {
    // For SSR, we'll pass the brand ID to the provider
    // The provider will handle the actual brand setting on the client
    return (
      <BrandProvider initialBrandId={detectedBrandId}>{children}</BrandProvider>
    );
  }

  // Fallback to default brand
  return <BrandProvider>{children}</BrandProvider>;
}

export default BrandDetector;
