import { brandUtils } from "./brand-utils";
import { DOMAIN_BRAND_MAP } from "./brand-config";
import { getBrandFromClientCookies } from "./cookie-utils";

/**
 * Get the current domain from various sources
 */
export const getCurrentDomain = (): string => {
  // Server-side: try to get from headers
  if (typeof window === "undefined") {
    // This will be handled by the server component
    return "";
  }

  // Client-side: get from window.location
  return window.location.hostname;
};

/**
 * Extract brand ID from domain
 */
export const getBrandIdFromDomain = (domain: string): string | null => {
  // Direct domain match
  if (DOMAIN_BRAND_MAP[domain]) {
    return DOMAIN_BRAND_MAP[domain];
  }

  // Subdomain match (e.g., odine.example.com -> odine)
  const subdomain = domain.split(".")[0];
  if (subdomain && subdomain !== "www" && subdomain !== "localhost") {
    return subdomain;
  }

  // Check if domain contains brand name
  for (const [brandDomain, brandId] of Object.entries(DOMAIN_BRAND_MAP)) {
    if (domain.includes(brandDomain.replace(".com", ""))) {
      return brandId;
    }
  }

  return null;
};

/**
 * Detect brand from current domain
 */
export const detectBrandFromDomain = (): string | null => {
  // First check cookies (set by middleware)
  const cookieBrand = getBrandFromClientCookies();
  if (cookieBrand) {
    return cookieBrand;
  }

  // Fallback to domain detection
  const domain = getCurrentDomain();
  if (!domain) return null;

  return getBrandIdFromDomain(domain);
};

/**
 * Get header value safely
 */
const getHeaderValue = (
  headers: Headers | Record<string, string>,
  key: string
): string | undefined => {
  if (headers instanceof Headers) {
    return headers.get(key) || undefined;
  }
  return headers[key];
};

/**
 * Get brand from request headers (for SSR)
 */
export const getBrandFromHeaders = (
  headers: Headers | Record<string, string>
): string | null => {
  // Try different header names that might contain the domain
  const host =
    getHeaderValue(headers, "host") ||
    getHeaderValue(headers, "x-forwarded-host") ||
    getHeaderValue(headers, "x-host");
  const referer =
    getHeaderValue(headers, "referer") ||
    getHeaderValue(headers, "x-forwarded-referer");

  if (host) {
    const brandId = getBrandIdFromDomain(host);
    if (brandId) return brandId;
  }

  if (referer) {
    try {
      const url = new URL(referer);
      const brandId = getBrandIdFromDomain(url.hostname);
      if (brandId) return brandId;
    } catch (error) {
      // Invalid URL, continue
    }
  }

  return null;
};

/**
 * Initialize brand based on domain
 */
export const initializeBrandFromDomain = (): void => {
  const brandId = detectBrandFromDomain();
  if (brandId) {
    brandUtils.setCurrentBrand(brandId);
  }
};

/**
 * Get brand configuration for SSR
 */
export const getBrandForSSR = (
  headers?: Headers | Record<string, string>
): string | null => {
  if (headers) {
    return getBrandFromHeaders(headers);
  }

  // Fallback to client-side detection
  return detectBrandFromDomain();
};
