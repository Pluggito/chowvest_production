"use client";

import { useEffect } from "react";
import { useBasketStore } from "@/store/basket-store";

export function BasketSync({ baskets }: { baskets: any[] }) {
  const setBaskets = useBasketStore((state) => state.setBaskets);

  useEffect(() => {
    if (baskets) {
      setBaskets(baskets);
    }
  }, [baskets, setBaskets]);

  return null;
}