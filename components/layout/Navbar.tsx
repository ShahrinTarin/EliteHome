"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Search,
  Heart,
  User,
  Menu,
  X,
  Building2,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../hooks/ThemeToggle";

const navigation = [
  { name: "Buy", href: "/buy", icon: Building2 },
  { name: "Rent", href: "/rent", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Contact", href: "/contact", icon: Phone },
];

// Isolated per-item component so each manages its own hover state cleanly
function NavItem({
  item,
  isActive,
  isTransparent,
}: {
  item: (typeof navigation)[0];
  isActive: boolean;
  isTransparent: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const drawn = hovered || isActive;

  return (
    <Link href={item.href}>
      <motion.span
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative px-3 py-2 rounded-lg text-md font-light inline-flex items-center gap-1.5 cursor-pointer select-none transition-colors duration-200",
          isTransparent
            ? hovered
              ? "text-white"
              : "text-white/80"
            : isActive || hovered
              ? "text-primary"
              : "text-muted-foreground"
        )}
      >
        <item.icon className="h-3.5 w-3.5" />
        {item.name}

        <motion.span
          aria-hidden
          className="absolute bottom-0 left-2 right-2 h-[1.5px] rounded-full bg-primary"
          style={{
            transformOrigin: drawn ? "left" : "right",
          }}
          initial={false}
          animate={{ scaleX: drawn ? 1 : 0 }}
          transition={
            drawn
              ? {
                  type: "tween",
                  ease: [0.22, 1, 0.36, 1],
                  duration: 0.7,
                }
              : {
                  type: "tween",
                  ease: [0.64, 0, 0.78, 0],
                  duration: 0.3,
                }
          }
        />
      </motion.span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isTransparent = isHome && !isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-1000 transition-all duration-500",
          isTransparent
            ? "bg-transparent backdrop-blur-3xl border-b border-white/10"
            : isScrolled
              ? "border-b border-white/10 dark:border-white/10 shadow-lg"
              : "bg-background/95 border-b border-border/30"
        )}
        style={
          !isTransparent && isScrolled
            ? {
                background: "rgba(10, 10, 10, 0.75)",
                backdropFilter: "blur(70px)",
                WebkitBackdropFilter: "blur(50px)",
                borderBottom: "1px solid rgba(239, 191, 4, 0.15)",
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-15 h-15 sm:w-30 sm:h-24"
              >
                <Image
                  src="/elitelogo.png"
                  alt="EliteHome Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={pathname === item.href}
                  isTransparent={isTransparent}
                />
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 ml-4">
              <Link href="/wishlist">
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-full",
                      isTransparent
                        ? "text-white hover:bg-white/10"
                        : "hover:bg-muted/80"
                    )}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>

              <ThemeToggle />

              <Link href="/list-property">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full cursor-pointer font-light transition-all hover:border-primary hover:text-primary",
                      isTransparent
                        ? "border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white backdrop-blur-sm"
                        : "border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                    )}
                  >
                    <Building2 className="h-4 w-4 mr-1.5" />
                    List Property
                  </Button>
                </motion.div>
              </Link>

              <Link href="/login">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="sm"
                    className={cn(
                      "rounded-full cursor-pointer font-medium px-5",
                      isTransparent
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25"
                    )}
                  >
                    <User className="h-4 w-4 mr-1.5" />
                    Sign In
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-1">
              <Link href="/wishlist">
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-9 w-9 rounded-full",
                      isTransparent && "text-white hover:bg-white/10"
                    )}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={cn(
                    "h-9 w-9 rounded-full",
                    isTransparent && "text-white hover:bg-white/10"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-16 bg-background/80 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 border-b border-border shadow-xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
                style={{
                  background: "rgba(10, 10, 10, 0.92)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderColor: "rgba(239, 191, 4, 0.15)",
                }}
              >
                <div className="p-4 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search properties, locations..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border-2 border-transparent focus:border-primary transition-colors"
                    />
                  </div>

                  <nav className="space-y-1">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl font-light transition-all text-white/80 hover:text-white hover:bg-white/10",
                            pathname === item.href && "text-primary bg-primary/10"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <div
                    className="border-t pt-4 space-y-2"
                    style={{ borderColor: "rgba(239,191,4,0.15)" }}
                  >
                    <Link
                      href="/list-property"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-xl h-12 border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-medium"
                      >
                        <Building2 className="h-5 w-5 mr-3" />
                        List Your Property
                      </Button>
                    </Link>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-center rounded-xl h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md mt-2">
                        <User className="h-5 w-5 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {!isHome && <div className="h-16 lg:h-18" />}
    </>
  );
}