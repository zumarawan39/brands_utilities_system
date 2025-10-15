"use client";

import BrandSwitcher from "@/components/BrandSwitcher";
import { useBrand } from "@/hooks/useBrand";

export default function BrandTestPage() {
  const { currentBrand, brandColors, getLogo, hasFeature, getAllBrands } =
    useBrand();

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: brandColors.background }}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold mb-8"
          style={{ color: brandColors.text.primary }}
        >
          Brand Detection Test
        </h1>

        {/* Current Brand Info */}
        <div
          className="brand-card mb-8"
          style={{
            backgroundColor: brandColors.surface,
            borderColor: brandColors.border,
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={getLogo("light")}
              alt={`${currentBrand?.displayName} Logo`}
              className="w-16 h-16 object-contain"
            />
            <div>
              <h2
                className="text-2xl font-semibold"
                style={{ color: brandColors.text.primary }}
              >
                {currentBrand?.displayName}
              </h2>
              <p
                className="text-sm"
                style={{ color: brandColors.text.secondary }}
              >
                {currentBrand?.domain}
              </p>
            </div>
          </div>

          <p className="mb-4" style={{ color: brandColors.text.secondary }}>
            {currentBrand?.description}
          </p>

          {/* Brand Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div
                className="w-12 h-12 rounded mx-auto mb-2"
                style={{ backgroundColor: brandColors.primary }}
              />
              <span className="text-xs">Primary</span>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded mx-auto mb-2"
                style={{ backgroundColor: brandColors.secondary }}
              />
              <span className="text-xs">Secondary</span>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded mx-auto mb-2"
                style={{ backgroundColor: brandColors.accent }}
              />
              <span className="text-xs">Accent</span>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded mx-auto mb-2"
                style={{ backgroundColor: brandColors.success }}
              />
              <span className="text-xs">Success</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3
              className="font-semibold mb-2"
              style={{ color: brandColors.text.primary }}
            >
              Features:
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(currentBrand?.features || {}).map(
                ([feature, enabled]) => (
                  <span
                    key={feature}
                    className={`px-2 py-1 rounded text-xs ${
                      enabled ? "brand-bg-success" : "brand-bg-secondary"
                    }`}
                    style={{
                      color: enabled ? "white" : brandColors.text.secondary,
                    }}
                  >
                    {feature.replace("has", "")}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Brand Switcher */}
        <div
          className="brand-card mb-8"
          style={{
            backgroundColor: brandColors.surface,
            borderColor: brandColors.border,
          }}
        >
          <h3
            className="font-semibold mb-4"
            style={{ color: brandColors.text.primary }}
          >
            Switch Brand:
          </h3>
          <BrandSwitcher />
        </div>

        {/* All Available Brands */}
        <div
          className="brand-card"
          style={{
            backgroundColor: brandColors.surface,
            borderColor: brandColors.border,
          }}
        >
          <h3
            className="font-semibold mb-4"
            style={{ color: brandColors.text.primary }}
          >
            All Available Brands:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getAllBrands().map((brand) => (
              <div
                key={brand.id}
                className="p-4 rounded border"
                style={{
                  backgroundColor: brandColors.background,
                  borderColor: brandColors.border,
                }}
              >
                <h4
                  className="font-medium mb-2"
                  style={{ color: brandColors.text.primary }}
                >
                  {brand.displayName}
                </h4>
                <p
                  className="text-sm mb-2"
                  style={{ color: brandColors.text.secondary }}
                >
                  {brand.domain}
                </p>
                <p
                  className="text-xs"
                  style={{ color: brandColors.text.secondary }}
                >
                  {brand.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
