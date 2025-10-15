import Cookies from "js-cookie";

/**
 * Get brand from cookies (server-side)
 */
export const getBrandFromServerCookies = async (): Promise<string | null> => {
  try {
    const brandCookie = Cookies.get("current-brand-id");
    return brandCookie || null;
  } catch (error) {
    // If cookies() is not available (e.g., in middleware), return null
    return null;
  }
};

/**
 * Get brand from cookies (client-side)
 */
export const getBrandFromClientCookies = (): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const brandCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("current-brand-id=")
  );

  if (brandCookie) {
    return brandCookie.split("=")[1]?.trim() || null;
  }

  return null;
};

/**
 * Set brand cookie (client-side)
 */
export const setBrandCookie = (brandId: string): void => {
  if (typeof document === "undefined") return;

  document.cookie = `current-brand-id=${brandId}; path=/; max-age=${
    60 * 60 * 24 * 30
  }; samesite=lax`;
};
