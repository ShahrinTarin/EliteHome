"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  isTransparent?: boolean;
}

export function HamburgerButton({
  isOpen,
  onToggle,
  isTransparent = false,
}: HamburgerButtonProps) {
  return (
    <motion.div whileTap={{ scale: 0.9 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className={cn(
          "h-9 w-9 rounded-full",
          isTransparent && "text-white hover:bg-white/10"
        )}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Top line → top arm of X */}
          <motion.line
            x1="1" y1="4" x2="17" y2="4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            animate={
              isOpen
                ? { x1: 2, y1: 2, x2: 16, y2: 16 }
                : { x1: 1, y1: 4, x2: 17, y2: 4 }
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Middle line → fades out */}
          <motion.line
            x1="1" y1="9" x2="17" y2="9"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            animate={
              isOpen
                ? { opacity: 0, scaleX: 0 }
                : { opacity: 1, scaleX: 1 }
            }
            style={{ transformOrigin: "center" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Bottom line → bottom arm of X */}
          <motion.line
            x1="1" y1="14" x2="17" y2="14"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            animate={
              isOpen
                ? { x1: 2, y1: 16, x2: 16, y2: 2 }
                : { x1: 1, y1: 14, x2: 17, y2: 14 }
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </Button>
    </motion.div>
  );
}