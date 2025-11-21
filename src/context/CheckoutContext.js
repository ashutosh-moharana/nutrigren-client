import { createContext, useContext } from "react";

export const CheckoutContext = createContext();

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
}

