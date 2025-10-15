# Brand Utilities System

This system provides comprehensive brand management for multi-brand applications, allowing you to configure different brands with their own color schemes, assets, features, and settings.

## Overview

The brand utilities system consists of:

- **Brand Configuration**: Define brands with color schemes, assets, and settings
- **Brand Utilities**: Core functions for brand management
- **Domain Detection**: Automatic brand detection from domain/URL
- **React Hooks**: Easy integration with React components
- **React Context**: Global brand state management
- **CSS Utilities**: Pre-built styles using brand colors
- **SSR Support**: Server-side brand detection and rendering

## Quick Start

### 1. Basic Usage

```typescript
import { brandUtils, brandHelpers } from "@/utils/brand-utils";

// Get current brand
const currentBrand = brandUtils.getCurrentBrand();

// Get brand colors
const colors = brandHelpers.getCurrentBrandColors();

// Apply brand theme to the page
brandHelpers.initializeBrandTheme();
```

### 2. React Hook Usage

```typescript
import { useBrand } from "@/hooks/useBrand";

function MyComponent() {
  const { currentBrand, brandColors, getLogo, hasFeature } = useBrand();

  return (
    <div style={{ backgroundColor: brandColors.background }}>
      <img src={getLogo("light")} alt="Logo" />
      {hasFeature("hasCampaigns") && <CampaignsComponent />}
    </div>
  );
}
```

### 3. React Context Usage

```typescript
import { BrandProvider, useBrandContext } from "@/provider/BrandProvider";

function App() {
  return (
    <BrandProvider initialBrandId="odine">
      <MyApp />
    </BrandProvider>
  );
}

function MyComponent() {
  const { currentBrand, setCurrentBrand } = useBrandContext();

  return (
    <button onClick={() => setCurrentBrand("esimgo")}>Switch to eSIM Go</button>
  );
}
```

## Domain-Based Brand Detection

The system automatically detects the brand based on the domain/URL. This works both on the server-side (SSR) and client-side.

### How It Works

1. **Middleware Detection**: The Next.js middleware detects the brand from the domain and sets a cookie
2. **SSR Detection**: Server components read the cookie or detect from headers
3. **Client Detection**: Client components can also detect from domain or cookies
4. **Fallback**: If no brand is detected, it falls back to the default brand

### Domain Detection Rules

The system detects brands using these rules (in order of priority):

1. **Direct Domain Match**: `odine.com` → `odine`
2. **Subdomain Match**: `odine.example.com` → `odine`
3. **Domain Contains Brand**: `my-odine-app.com` → `odine`
4. **Cookie Fallback**: Uses previously detected brand from cookie

### Configuration

Add your domains to the brand configuration:

```typescript
// src/utils/brand-config.ts
export const DOMAIN_BRAND_MAP: Record<string, string> = {
  "odine.com": "odine",
  "esimgo.com": "esimgo",
  "connectwise.com": "connectwise",
  "simflow.com": "simflow",
  // Add your domains here
};
```

### Testing Brand Detection

Visit `/brand-test` to see the brand detection in action. This page shows:

- Current detected brand
- Brand colors and assets
- Available features
- Brand switcher
- All available brands

## Brand Configuration

### Adding a New Brand

1. **Update `src/utils/brand-config.ts`**:

```typescript
export const BRANDS: BrandConfig[] = [
  // ... existing brands
  {
    id: "newbrand",
    name: "newbrand",
    displayName: "New Brand",
    domain: "newbrand.com",
    description: "Description of the new brand",
    colorScheme: {
      primary: "#your-primary-color",
      secondary: "#your-secondary-color",
      // ... other colors
    },
    assets: {
      logo: {
        light: "/images/newbrand-logo-light.svg",
        dark: "/images/newbrand-logo-dark.svg",
        favicon: "/favicon-newbrand.ico",
      },
      // ... other assets
    },
    features: {
      hasAuth: true,
      hasDashboard: true,
      // ... other features
    },
    settings: {
      defaultLanguage: "en",
      defaultCurrency: "USD",
      timezone: "UTC",
      dateFormat: "MM/DD/YYYY",
    },
    metadata: {
      version: "1.0.0",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  },
];
```

2. **Update mappings**:

```typescript
export const BRAND_ID_MAP: Record<string, string> = {
  // ... existing mappings
  newbrand: "newbrand",
};

export const DOMAIN_BRAND_MAP: Record<string, string> = {
  // ... existing mappings
  "newbrand.com": "newbrand",
};
```

### Brand Structure

```typescript
interface BrandConfig {
  id: string; // Unique brand identifier
  name: string; // Brand name (lowercase)
  displayName: string; // Display name
  domain: string; // Domain name
  description?: string; // Brand description
  colorScheme: BrandColorScheme; // Color configuration
  assets: BrandAssets; // Logo and image assets
  features: {
    // Feature flags
    hasAuth: boolean;
    hasDashboard: boolean;
    hasReports: boolean;
    hasCampaigns: boolean;
    hasCoupons: boolean;
    hasOrders: boolean;
    hasCustomers: boolean;
  };
  settings: {
    // Brand settings
    defaultLanguage: string;
    defaultCurrency: string;
    timezone: string;
    dateFormat: string;
  };
  metadata: {
    // Brand metadata
    version: string;
    createdAt: string;
    updatedAt: string;
  };
}
```

## Color Scheme

Each brand can define its own color scheme:

```typescript
interface BrandColorScheme {
  primary: string; // Primary brand color
  secondary: string; // Secondary brand color
  accent: string; // Accent color
  background: string; // Background color
  surface: string; // Surface color
  text: {
    primary: string; // Primary text color
    secondary: string; // Secondary text color
    disabled: string; // Disabled text color
  };
  border: string; // Border color
  success: string; // Success color
  warning: string; // Warning color
  error: string; // Error color
  info: string; // Info color
}
```

## CSS Utilities

The system provides CSS utility classes that automatically use brand colors:

```scss
// Color utilities
.brand-primary {
  color: var(--brand-primary);
}
.brand-secondary {
  color: var(--brand-secondary);
}

// Background utilities
.brand-bg-primary {
  background-color: var(--brand-primary);
}
.brand-bg-surface {
  background-color: var(--brand-surface);
}

// Border utilities
.brand-border-primary {
  border-color: var(--brand-primary);
}

// Text utilities
.brand-text-primary {
  color: var(--brand-text-primary);
}

// Button utilities
.brand-button-primary {
  /* Primary button styles */
}
.brand-button-outline {
  /* Outline button styles */
}

// Card utilities
.brand-card {
  /* Card styles */
}
.brand-card-primary {
  /* Primary card styles */
}

// Input utilities
.brand-input {
  /* Input styles */
}
.brand-input-error {
  /* Error input styles */
}
```

## API Reference

### Brand Utils

```typescript
// Core functions
brandUtils.getBrand(brandId: string): BrandConfig | null
brandUtils.getBrandId(brandName: string): string | null
brandUtils.getBrandName(brandId: string): string | null
brandUtils.getAllBrands(): BrandConfig[]
brandUtils.getBrandByDomain(domain: string): BrandConfig | null
brandUtils.getCurrentBrand(): BrandConfig | null
brandUtils.setCurrentBrand(brandId: string): void
brandUtils.getBrandColors(brandId: string): BrandColorScheme | null
brandUtils.getBrandAssets(brandId: string): BrandAssets | null
```

### Brand Helpers

```typescript
// Helper functions
brandHelpers.getCurrentBrandColors(): BrandColorScheme
brandHelpers.getCurrentBrandAssets(): BrandAssets
brandHelpers.getCurrentBrandLogo(theme?: 'light' | 'dark'): string
brandHelpers.getCurrentBrandFavicon(): string
brandHelpers.hasFeature(feature: string): boolean
brandHelpers.getSetting(setting: string): any
brandHelpers.generateCSSVariables(): Record<string, string>
brandHelpers.applyBrandColors(): void
brandHelpers.updateFavicon(): void
brandHelpers.initializeBrandTheme(): void
```

### Domain Utils

```typescript
// Domain detection functions
getCurrentDomain(): string
getBrandIdFromDomain(domain: string): string | null
detectBrandFromDomain(): string | null
getBrandFromHeaders(headers: Headers | Record<string, string>): string | null
initializeBrandFromDomain(): void
getBrandForSSR(headers?: Headers | Record<string, string>): string | null
```

### React Hook

```typescript
const {
  currentBrand, // Current brand configuration
  brandColors, // Current brand colors
  brandAssets, // Current brand assets
  getBrand, // Get brand by ID
  getAllBrands, // Get all brands
  setCurrentBrand, // Set current brand
  getLogo, // Get logo URL
  getFavicon, // Get favicon URL
  hasFeature, // Check if feature is enabled
  getSetting, // Get brand setting
  applyBrandTheme, // Apply brand theme
  generateCSSVariables, // Generate CSS variables
} = useBrand();
```

### React Context

```typescript
const {
  currentBrand, // Current brand configuration
  brandColors, // Current brand colors
  brandAssets, // Current brand assets
  getBrand, // Get brand by ID
  getAllBrands, // Get all brands
  setCurrentBrand, // Set current brand
  getLogo, // Get logo URL
  getFavicon, // Get favicon URL
  hasFeature, // Check if feature is enabled
  getSetting, // Get brand setting
  applyBrandTheme, // Apply brand theme
  generateCSSVariables, // Generate CSS variables
  isLoading, // Loading state
} = useBrandContext();
```

## Components

### BrandDetector (Server Component)

Automatically detects brand from domain during SSR:

```typescript
import BrandDetector from "@/components/common/BrandDetector";

// In your layout
<BrandDetector>
  <YourApp />
</BrandDetector>;
```

### BrandInitializer (Client Component)

Initializes brand theme on the client side:

```typescript
import BrandInitializer from "@/components/common/BrandInitializer";

// In your layout
<BrandInitializer>
  <YourApp />
</BrandInitializer>;
```

### BrandSwitcher (Client Component)

Allows users to switch between brands:

```typescript
import BrandSwitcher from "@/components/common/BrandSwitcher";

function MyComponent() {
  return <BrandSwitcher showCurrentBrand={true} />;
}
```

## Best Practices

### 1. Feature Flags

Use feature flags to conditionally render components:

```typescript
const { hasFeature } = useBrand();

return (
  <div>
    {hasFeature("hasCampaigns") && <CampaignsComponent />}
    {hasFeature("hasCoupons") && <CouponsComponent />}
  </div>
);
```

### 2. Brand-Specific Styling

Use CSS custom properties for brand-specific styling:

```scss
.my-component {
  background-color: var(--brand-background);
  color: var(--brand-text-primary);
  border: 1px solid var(--brand-border);
}
```

### 3. Dynamic Assets

Load brand-specific assets dynamically:

```typescript
const { getLogo, getFavicon } = useBrand();

useEffect(() => {
  // Update favicon
  const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
  if (link) {
    link.href = getFavicon();
  }
}, [getFavicon]);
```

### 4. Domain-Based Branding

The system automatically handles domain-based branding. Just ensure your domains are configured:

```typescript
// The middleware will automatically detect and set the brand
// based on the domain the user visits
```

### 5. SSR Considerations

For server-side rendering, the brand is detected from headers and cookies:

```typescript
// Server component automatically detects brand
// No additional configuration needed
```

## Examples

### Example 1: Brand-Aware Component

```typescript
import { useBrand } from "@/hooks/useBrand";

function BrandAwareComponent() {
  const { currentBrand, brandColors, getLogo, hasFeature } = useBrand();

  return (
    <div
      className="brand-card"
      style={{
        backgroundColor: brandColors.surface,
        borderColor: brandColors.border,
      }}
    >
      <img
        src={getLogo("light")}
        alt={`${currentBrand?.displayName} Logo`}
        className="brand-logo-light"
      />

      <h1 className="brand-text-primary">
        Welcome to {currentBrand?.displayName}
      </h1>

      {hasFeature("hasDashboard") && (
        <p className="brand-text-secondary">
          Access your dashboard to view analytics and reports.
        </p>
      )}
    </div>
  );
}
```

### Example 2: Brand-Specific Navigation

```typescript
import { useBrand } from "@/hooks/useBrand";

function Navigation() {
  const { currentBrand, hasFeature } = useBrand();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", feature: "hasDashboard" },
    { label: "Campaigns", path: "/campaigns", feature: "hasCampaigns" },
    { label: "Coupons", path: "/coupons", feature: "hasCoupons" },
    { label: "Orders", path: "/orders", feature: "hasOrders" },
    { label: "Customers", path: "/customers", feature: "hasCustomers" },
    { label: "Reports", path: "/reports", feature: "hasReports" },
  ];

  return (
    <nav className="brand-bg-surface">
      {menuItems.map(
        (item) =>
          hasFeature(item.feature) && (
            <Link key={item.path} to={item.path} className="brand-text-primary">
              {item.label}
            </Link>
          )
      )}
    </nav>
  );
}
```

### Example 3: Domain-Based Branding

```typescript
// No code needed! The system automatically detects the brand
// based on the domain the user visits:

// odine.com → Odine brand
// esimgo.com → eSIM Go brand
// connectwise.com → ConnectWise brand
// simflow.com → SIM Flow brand
```

## Troubleshooting

### Common Issues

1. **Brand not loading**: Check if the brand ID exists in `BRAND_ID_MAP`
2. **Colors not applying**: Ensure `brandHelpers.initializeBrandTheme()` is called
3. **Assets not found**: Verify asset paths in brand configuration
4. **Feature flags not working**: Check if the feature is defined in brand configuration
5. **Domain detection not working**: Verify domain is in `DOMAIN_BRAND_MAP`

### Debug Mode

Enable debug mode to see brand information in console:

```typescript
// Add to your app initialization
if (process.env.NODE_ENV === "development") {
  console.log("Current Brand:", brandUtils.getCurrentBrand());
  console.log("All Brands:", brandUtils.getAllBrands());
  console.log("Detected Domain:", window.location.hostname);
}
```

### Testing

Visit `/brand-test` to test brand detection and switching functionality.

## Migration Guide

### From Simple Brand Utils

If you're migrating from the simple brand utils:

```typescript
// Old way
import { brandUtils } from "@/utils/brand-utils";
const brandId = brandUtils.getBrand("some-id");

// New way
import { brandUtils } from "@/utils/brand-utils";
const brand = brandUtils.getBrand("some-id");
const brandId = brand?.id;
```

### Adding Brand Support to Existing Components

1. Import the brand hook:

```typescript
import { useBrand } from "@/hooks/useBrand";
```

2. Use brand colors and assets:

```typescript
const { brandColors, getLogo } = useBrand();
```

3. Apply brand-specific styling:

```typescript
<div style={{ backgroundColor: brandColors.background }}>
  <img src={getLogo("light")} alt="Logo" />
</div>
```

This system provides a comprehensive solution for managing multiple brands in your application with type safety, React integration, CSS utilities, and automatic domain-based detection.
