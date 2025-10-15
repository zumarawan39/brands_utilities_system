
import {
  BRANDS,
  DEFAULT_BRAND,
  BRAND_ID_MAP,
  DOMAIN_BRAND_MAP,
} from "./brand-config";

// Utility function to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
  }
  return "0, 0, 0"; // fallback
};

// Current brand state (can be stored in localStorage or context)
let currentBrandId: string | null = null;
console.log("Initial currentBrandId =", currentBrandId);

// Initialize current brand from localStorage only (domain detection is handled separately)
if (typeof window !== "undefined") {
  const storedBrandId = localStorage.getItem("currentBrandId");
  if (storedBrandId && BRAND_ID_MAP[storedBrandId]) {
    currentBrandId = storedBrandId;
  } else {
    // Default to the first brand if no stored brand
    currentBrandId = DEFAULT_BRAND.id;
  }
}

export const brandUtils: any = {
  /**
   * Get brand configuration by brand ID
   */
  getBrand: (brandId: string): any | null => {
    return BRANDS.find((brand) => brand.id === brandId) || null;
  },

  /**
   * Get brand ID by brand name
   */
  getBrandId: (brandName: string): string | null => {
    const brand = BRANDS.find(
      (brand) =>
        brand.name.toLowerCase() === brandName.toLowerCase() ||
        brand.displayName.toLowerCase() === brandName.toLowerCase()
    );
    return brand?.id || null;
  },

  /**
   * Get brand name by brand ID
   */
  getBrandName: (brandId: string): string | null => {
    const brand = BRANDS.find((brand) => brand.id === brandId);
    return brand?.displayName || null;
  },

  /**
   * Get all available brands
   */
  getAllBrands: (): any[] => {
    return [...BRANDS];
  },

  /**
   * Get brand configuration by domain
   */
  getBrandByDomain: (domain: string): any | null => {
    const brandId = DOMAIN_BRAND_MAP[domain];
    if (!brandId) return null;
    return brandUtils.getBrand(brandId);
  },

  /**
   * Get current active brand
   */
  getCurrentBrand: (): any | null => {
    if (!currentBrandId) return DEFAULT_BRAND;
    return brandUtils.getBrand(currentBrandId);
  },

  /**
   * Set current brand
   */
  setCurrentBrand: (brandId: string): void => {
    if (BRAND_ID_MAP[brandId]) {
      currentBrandId = brandId;
      if (typeof window !== "undefined") {
        localStorage.setItem("currentBrandId", brandId);
      }
    }
  },

  /**
   * Get brand color scheme by brand ID
   */
  getBrandColors: (brandId: string): any | null => {
    const brand = brandUtils.getBrand(brandId);
    return brand?.colorScheme || null;
  },

  /**
   * Get brand assets by brand ID
   */
  getBrandAssets: (brandId: string): any | null => {
    const brand = brandUtils.getBrand(brandId);
    return brand?.assets || null;
  },
};

// Additional utility functions for common use cases
export const brandHelpers = {
  /**
   * Get current brand's color scheme
   */
  getCurrentBrandColors: (): any => {
    const currentBrand = brandUtils.getCurrentBrand();
    return currentBrand?.colorScheme || DEFAULT_BRAND.colorScheme;
  },

  /**
   * Get current brand's assets
   */
  getCurrentBrandAssets: (): any => {
    const currentBrand = brandUtils.getCurrentBrand();
    return currentBrand?.assets || DEFAULT_BRAND.assets;
  },

  /**
   * Get current brand's logo URL (light or dark theme)
   */
  getCurrentBrandLogo: (theme: "light" | "dark" = "light"): string => {
    const assets = brandHelpers.getCurrentBrandAssets();
    return theme === "dark" ? assets.logo.dark : assets.logo.light;
  },

  /**
   * Get current brand's favicon URL
   */
  getCurrentBrandFavicon: (): string => {
    const assets = brandHelpers.getCurrentBrandAssets();
    return assets.logo.favicon;
  },

  /**
   * Check if current brand has a specific feature
   */
  hasFeature: (feature: keyof any["features"]): boolean => {
    const currentBrand = brandUtils.getCurrentBrand();
    return currentBrand?.features[feature] || false;
  },

  /**
   * Get current brand's setting
   */
  getSetting: <K extends keyof any["settings"]>(
    setting: K
  ): any["settings"][K] => {
    const currentBrand = brandUtils.getCurrentBrand();
    return currentBrand?.settings[setting] || DEFAULT_BRAND.settings[setting];
  },

  /**
   * Generate CSS variables for current brand's color scheme
   */
  generateCSSVariables: (): Record<string, string> => {
    const colors = brandHelpers.getCurrentBrandColors();
    return {
      // Brand colors for Tailwind
      "--brand-primary": colors.primary,
      "--brand-secondary": colors.secondary,
      "--brand-accent": colors.accent,
      "--brand-background": colors.background,
      "--brand-surface": colors.surface,
      "--brand-text-primary": colors.text.primary,
      "--brand-text-secondary": colors.text.secondary,
      "--brand-text-disabled": colors.text.disabled,
      "--brand-border": colors.border,
      "--brand-success": colors.success,
      "--brand-warning": colors.warning,
      "--brand-error": colors.error,
      "--brand-info": colors.info,

      // Additional variables for gradients and other uses
      "--brand-primary-rgb": hexToRgb(colors.primary),
      "--brand-secondary-rgb": hexToRgb(colors.secondary),
      "--brand-accent-rgb": hexToRgb(colors.accent),
    };
  },

  /**
   * Apply brand colors to document root
   */
  // applyBrandColors: (): void => {
  //   if (typeof document !== "undefined") {
  //     const cssVars = brandHelpers.generateCSSVariables();
  //     Object.entries(cssVars).forEach(([key, value]) => {
  //       document.documentElement.style.setProperty(key, value);
  //     });
  //   }
  // },
    applyBrandColors: (): void => {
    if (typeof document !== "undefined") {
      const cssVars = brandHelpers.generateCSSVariables();
      console.log("🎨 Applying CSS variables:", cssVars);
      
      const root = document.documentElement;
      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
        console.log(`✅ Set ${key} = ${value}`);
      });
    }
  },

  /**
   * Update favicon for current brand
   */
  updateFavicon: (): void => {
    if (typeof document !== "undefined") {
      const favicon = brandHelpers.getCurrentBrandFavicon();
      const link = document.querySelector(
        "link[rel*='icon']"
      ) as HTMLLinkElement;
      if (link) {
        link.href = favicon;
      } else {
        const newLink = document.createElement("link");
        newLink.rel = "icon";
        newLink.href = favicon;
        document.head.appendChild(newLink);
      }
    }
  },

  /**
   * Initialize brand theme (apply colors and favicon)
   */
  initializeBrandTheme: (): void => {
    brandHelpers.applyBrandColors();
    brandHelpers.updateFavicon();
  },
};

// Export default brand utils for backward compatibility
export default brandUtils;
