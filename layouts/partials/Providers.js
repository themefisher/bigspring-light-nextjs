"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Providers = ({ children }) => {
  const pathname = usePathname();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  return children;
};

export default Providers;
