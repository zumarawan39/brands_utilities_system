"use client";

import useBrand from "@/hooks/useBrand";
import { initializeBrandFromDomain } from "@/utils/domain-utils";
import { brandUtils } from "@/utils/brand-utils";
import { useEffect } from "react";

interface BrandInitializerProps {
  children?: React.ReactNode;
}

export function BrandInitializer({ children }: BrandInitializerProps) {
  const { applyBrandTheme, currentBrand } = useBrand();
  

  useEffect(() => {
    // Query string override: ?brand=brandId (dev helper)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const qsBrand = params.get("brand");
      if (qsBrand) {
        brandUtils.setCurrentBrand(qsBrand);
      }
    }

    // Initialize brand from domain if not already set
    if (!currentBrand) {
      initializeBrandFromDomain();
    }

    // Apply brand theme
    applyBrandTheme();
  }, [currentBrand, applyBrandTheme]);

  // This component doesn't render anything, it just initializes the brand
  return children ? <>{children}</> : null;
}

export default BrandInitializer;
