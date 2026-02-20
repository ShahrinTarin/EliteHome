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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Buy", href: "/buy", icon: Building2 },
  { name: "Rent", href: "/rent", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

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

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50"
            : "bg-background border-b border-border/30"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-linear-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25"
              >
                <span className="font-extrabold text-primary-foreground text-xl sm:text-2xl">
                  E
                </span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-primary">Elite</span>
                  <span className="text-foreground">Home</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase -mt-0.5 hidden sm:block">
                  Premium Real Estate
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative px-3 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-1.5",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.name}
                    {pathname === item.href && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 ml-4">
              <Link href="/wishlist">
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:bg-muted/80 cursor-pointer"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>

              <Link href="/list-property">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full cursor-pointer border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-medium"
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
                    className="rounded-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md shadow-primary/25 px-5"
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
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="h-9 w-9 rounded-full"
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
                className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
              >
                <div className="p-4 space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search properties, locations..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border-2 border-transparent focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Nav Links */}
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
                            "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                            pathname === item.href
                              ? "text-primary bg-primary/5"
                              : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* CTA Buttons */}
                  <div className="border-t border-border pt-4 space-y-2">
                    <Link href="/list-property" onClick={() => setIsMobileMenuOpen(false)}>
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

      {/* Spacer */}
      <div className="h-16 lg:h-18" />
    </>
  );
}