

export const BRANDS: any[] = [
  {
    id: "mybrand",
    name: "mybrand",
    displayName: "Practice Brand",
  // domain should be hostname-only so detection matches window.location.hostname
  domain: "mybrand.local",
    description: "Premium eSIM and connectivity solutions",
    colorScheme: {
      primary: "#1e293b",
      secondary: "#be5974",
      accent: "#f59e0b",
      background: "#ffffff",
      surface: "#f8fafc",
      text: {
        primary: "#1e293b",
        secondary: "#64748b",
        disabled: "#94a3b8",
      },
      border: "#e2e8f0",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    assets: {
      logo: {
        light: "/images/app-logo.svg",
        dark: "/images/app-logo.svg",
        favicon: "/favicon.ico",
      },
      images: {
        hero: "/images/best_connect.svg",
        background: "/images/login-bg.svg",
        placeholder: "/images/visitor.svg",
      },
    },
  },
  {
    id: "zumar",
    name: "zumar",
    displayName: "eSIM Go",
    domain: "zumar.local",
    description: "Global eSIM connectivity platform",
    colorScheme: {
      primary: "#7c3aed",
      secondary: "#6b7280",
      accent: "#ec4899",
      background: "#ffffff",
      surface: "#f9fafb",
      text: {
        primary: "#111827",
        secondary: "#6b7280",
        disabled: "#9ca3af",
      },
      border: "#d1d5db",
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626",
      info: "#2563eb",
    },
    assets: {
      logo: {
        light: "/images/app-logo.svg",
        dark: "/images/app-logo.svg",
        favicon: "/favicon.ico",
      },
      images: {
        hero: "/images/best_connect.svg",
        background: "/images/login-bg.svg",
        placeholder: "/images/visitor.svg",
      },
    },
  },
  {
    id: "connectwise",
    name: "connectwise",
    displayName: "ConnectWise",
    domain: "connectwise.com",
    description: "Smart connectivity solutions for businesses",
    colorScheme: {
      primary: "#059669",
      secondary: "#4b5563",
      accent: "#f97316",
      background: "#ffffff",
      surface: "#f3f4f6",
      text: {
        primary: "#1f2937",
        secondary: "#4b5563",
        disabled: "#9ca3af",
      },
      border: "#e5e7eb",
      success: "#047857",
      warning: "#ea580c",
      error: "#b91c1c",
      info: "#1d4ed8",
    },
    assets: {
      logo: {
        light: "/images/app-logo.svg",
        dark: "/images/app-logo.svg",
        favicon: "/favicon.ico",
      },
      images: {
        hero: "/images/best_connect.svg",
        background: "/images/login-bg.svg",
        placeholder: "/images/visitor.svg",
      },
    },
 
  },
];

// Default brand configuration
export const DEFAULT_BRAND: any = BRANDS[0];

// Brand ID mapping for quick lookup
export const BRAND_ID_MAP: Record<string, string> = {
  mybrand: "mybrand",
  zumar: "zumar",
};

// Domain to brand mapping
export const DOMAIN_BRAND_MAP: Record<string, string> = {
  "mybrand.local": "mybrand",
  "zumar.local": "zumar",
};
