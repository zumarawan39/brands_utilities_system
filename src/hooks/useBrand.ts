"use client";
import { useEffect, useState, useCallback } from "react";
import { BrandConfig, BrandColorScheme, BrandAssets } from "../utils/types";
import { brandUtils, brandHelpers } from "../utils/brand-utils";

export interface UseBrandReturn {
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
}

export const useBrand = (): UseBrandReturn => {
  const [currentBrand, setCurrentBrandState] = useState<BrandConfig | null>(
    null
  );

  // Initialize current brand
  useEffect(() => {
    const brand = brandUtils.getCurrentBrand();
    setCurrentBrandState(brand);
  }, []);

  // Set current brand
  const setCurrentBrand = useCallback((brandId: string) => {
    brandUtils.setCurrentBrand(brandId);
    const brand = brandUtils.getCurrentBrand();
    setCurrentBrandState(brand);
  }, []);

  // Get brand colors
  const brandColors =
    currentBrand?.colorScheme || brandHelpers.getCurrentBrandColors();

  // Get brand assets
  const brandAssets =
    currentBrand?.assets || brandHelpers.getCurrentBrandAssets();

  // Get logo URL
  const getLogo = useCallback(
    (theme: "light" | "dark" = "light"): string => {
      return theme === "dark" ? brandAssets.logo.dark : brandAssets.logo.light;
    },
    [brandAssets.logo]
  );

  // Get favicon URL
  const getFavicon = useCallback((): string => {
    return brandAssets.logo.favicon;
  }, [brandAssets.logo.favicon]);

  // Check if brand has feature
  const hasFeature = useCallback(
    (feature: keyof BrandConfig["features"]): boolean => {
      return currentBrand?.features[feature] || false;
    },
    [currentBrand?.features]
  );

  // Get brand setting
  const getSetting = useCallback(
    <K extends keyof BrandConfig["settings"]>(
      setting: K
    ): BrandConfig["settings"][K] => {
      return (
        currentBrand?.settings[setting] || brandHelpers.getSetting(setting)
      );
    },
    [currentBrand?.settings]
  );

  // Apply brand theme
  const applyBrandTheme = useCallback(() => {
    brandHelpers.initializeBrandTheme();
  }, []);

  // Generate CSS variables
  const generateCSSVariables = useCallback(() => {
    return brandHelpers.generateCSSVariables();
  }, []);

  return {
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
  };
};

export default useBrand;
