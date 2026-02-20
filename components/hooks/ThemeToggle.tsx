"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className="relative flex items-center cursor-pointer transition-all duration-300"
      style={{
        height: "20px",
        width: "40px",
        backgroundColor: theme === "light" ? "#FFD700" : "#423966",
        borderRadius: "9999px",
      }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <div
        className="absolute top-0 flex items-center justify-center transition-all duration-300 rounded-full"
        style={{
          height: "20px",
          width: "20px",
          left: theme === "light" ? "20px" : "0px",
          backgroundColor: theme === "light" ? "#fff" : "#D9FBFF",
        }}
      >
        {theme === "light" ? (
          <Sun className="h-3 w-3 text-yellow-500" />
        ) : (
          <Moon className="h-3 w-3 text-indigo-700" />
        )}
      </div>
    </div>
  );
}