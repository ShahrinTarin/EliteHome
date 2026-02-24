"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

function getTheme(): boolean {
  if (typeof window === "undefined") return false;
  const html = document.documentElement;
  const attr = html.getAttribute("data-theme");
  if (attr) return attr === "light";
  return html.classList.contains("light");
}

export function useIsLight(): boolean {
  const { resolvedTheme } = useTheme();
  const [isLight, setIsLight] = useState<boolean>(
    () => resolvedTheme === "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const derived = resolvedTheme === "light";
  if (isLight !== derived && resolvedTheme !== undefined) {
    setIsLight(derived);
  }

  return isLight;
}