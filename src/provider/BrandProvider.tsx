"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { BrandConfig, BrandColorScheme, BrandAssets } from "../utils/types";
import { brandUtils, brandHelpers } from "../utils/brand-utils";

interface BrandContextType {
  // Current brand data
  currentBrand: BrandConfig | null;
  brandColors: BrandColorScheme;
  brandAssets: BrandAssets;

  // Utility functions
  getBrand: (brandId: string) => BrandConfig | null;
  getAllBrands: () => BrandConfig[];
  setCurrentBrand: (brandId: string) => void;

  // Brand-specific helpers
  getLogo: (theme?: "light" | "dark") => string;
  getFavicon: () => string;
  hasFeature: (feature: keyof BrandConfig["features"]) => boolean;
  getSetting: <K extends keyof BrandConfig["settings"]>(
    setting: K
  ) => BrandConfig["settings"][K];

  // Theme utilities
  applyBrandTheme: () => void;
  generateCSSVariables: () => Record<string, string>;

  // Loading state
  isLoading: boolean;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

interface BrandProviderProps {
  children: ReactNode;
  initialBrandId?: string;
}

export const BrandProvider: React.FC<BrandProviderProps> = ({
  children,
  initialBrandId,
}) => {
  const [currentBrand, setCurrentBrandState] = useState<BrandConfig | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  // Initialize brand
  useEffect(() => {
    const initializeBrand = () => {
      setIsLoading(true);

      // Set initial brand if provided
      if (initialBrandId) {
        brandUtils.setCurrentBrand(initialBrandId);
      }

      // Get current brand
      const brand = brandUtils.getCurrentBrand();
      setCurrentBrandState(brand);

      // Apply brand theme
      brandHelpers.initializeBrandTheme();

      setIsLoading(false);
    };

    initializeBrand();
  }, [initialBrandId]);

  // Set current brand
  const setCurrentBrand = (brandId: string) => {
    brandUtils.setCurrentBrand(brandId);
    const brand = brandUtils.getCurrentBrand();
    setCurrentBrandState(brand);
    brandHelpers.initializeBrandTheme();
  };

  // Get brand colors
  const brandColors =
    currentBrand?.colorScheme || brandHelpers.getCurrentBrandColors();

  // Get brand assets
  const brandAssets =
    currentBrand?.assets || brandHelpers.getCurrentBrandAssets();

  // Get logo URL
  const getLogo = (theme: "light" | "dark" = "light"): string => {
    return theme === "dark" ? brandAssets.logo.dark : brandAssets.logo.light;
  };

  // Get favicon URL
  const getFavicon = (): string => {
    return brandAssets.logo.favicon;
  };

  // Check if brand has feature
  const hasFeature = (feature: keyof BrandConfig["features"]): boolean => {
    return currentBrand?.features[feature] || false;
  };

  // Get brand setting
  const getSetting = <K extends keyof BrandConfig["settings"]>(
    setting: K
  ): BrandConfig["settings"][K] => {
    return currentBrand?.settings[setting] || brandHelpers.getSetting(setting);
  };

  // Apply brand theme
  const applyBrandTheme = () => {
    brandHelpers.initializeBrandTheme();
  };

  // Generate CSS variables
  const generateCSSVariables = () => {
    return brandHelpers.generateCSSVariables();
  };

  const contextValue: BrandContextType = {
    currentBrand,
    brandColors,
    brandAssets,
    getBrand: brandUtils.getBrand,
    getAllBrands: brandUtils.getAllBrands,
    setCurrentBrand,
    getLogo,
    getFavicon,
    hasFeature,
    getSetting,
    applyBrandTheme,
    generateCSSVariables,
    isLoading,
  };

  return (
    <BrandContext.Provider value={contextValue}>
      {children}
    </BrandContext.Provider>
  );
};

// Custom hook to use brand context
export const useBrandContext = (): BrandContextType => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error("useBrandContext must be used within a BrandProvider");
  }
  return context;
};

export default BrandProvider;
