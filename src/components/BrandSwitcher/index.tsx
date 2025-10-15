"use client";

import React from "react";

import styles from "./brandSwitcher.module.scss";
import useBrand from "@/hooks/useBrand";

interface BrandSwitcherProps {
  className?: string;
  showCurrentBrand?: boolean;
}

export const BrandSwitcher: React.FC<BrandSwitcherProps> = ({
  className = "",
  showCurrentBrand = true,
}) => {
  const { currentBrand, getAllBrands, setCurrentBrand, getLogo, brandColors } =
    useBrand();

  const handleBrandChange = (brandId: string) => {
    setCurrentBrand(brandId);
    // You can add additional logic here like redirecting or reloading data
  };

  return (
    <div className={`${styles.brandSwitcher} ${className}`}>
      {showCurrentBrand && currentBrand && (
        <div className={styles.currentBrand}>
          <img
            src={getLogo("light")}
            alt={`${currentBrand.displayName} Logo`}
            className={styles.brandLogo}
          />
          <span className={styles.brandName}>{currentBrand.displayName}</span>
        </div>
      )}

      <select
        value={currentBrand?.id || ""}
        onChange={(e) => handleBrandChange(e.target.value)}
        className={styles.brandSelect}
        style={{
          backgroundColor: brandColors.surface,
          color: brandColors.text.primary,
          borderColor: brandColors.border,
        }}
      >
        {getAllBrands().map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.displayName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrandSwitcher;
