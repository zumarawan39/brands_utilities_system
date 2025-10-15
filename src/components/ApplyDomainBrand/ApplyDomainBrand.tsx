"use client";

import { useEffect } from "react";
import { getBrandIdFromDomain } from "@/utils/domain-utils";
import { brandUtils, brandHelpers } from "@/utils/brand-utils";
import { DEFAULT_BRAND } from "@/utils/brand-config";

export default function ApplyDomainBrand() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const host = window.location.hostname; // hostname excludes port
console.log("ApplyDomainBrand: host =", host);

    // Only act for the configured dev domain
    if (host === "mybrand.local") {
        console.log("===>");
        
      const brandId = getBrandIdFromDomain(host) || DEFAULT_BRAND.id;
      console.log("Applying brand for domain:", host, "->", brandId);
      
      brandUtils.setCurrentBrand(brandId);
      brandHelpers.initializeBrandTheme();
    }
  }, []);

  return null;
}
