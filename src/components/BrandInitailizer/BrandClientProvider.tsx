"use client";

import React from "react";
import { BrandProvider } from "../../provider/BrandProvider";
import BrandInitializer from "./BrandInitailizer";

interface Props {
  children: React.ReactNode;
  initialBrandId?: string;
}

export const BrandClientProvider: React.FC<Props> = ({ children, initialBrandId }) => {
  return (
    <BrandProvider initialBrandId={initialBrandId}>
      <BrandInitializer>{children}</BrandInitializer>
    </BrandProvider>
  );
};

export default BrandClientProvider;
