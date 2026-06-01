"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { NavLink } from "@/components/molecules";
import { siteConfig, BASE_PATH } from "@/config/site";
import { Terminal, Menu, X, Globe, Sun, Moon } from "lucide-react";

export function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "#inicio", label: t.nav.inicio },
    { href: "#proyectos", label: t.nav.proyectos },
    { href: "#blog", label: t.nav.blog },
    { href: "#contacto", label: t.nav.contacto },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-bg-dark/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            className="flex items-center gap-2 text-primary font-bold font-mono text-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Terminal size={20} />
            <span>{siteConfig.name}</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={
                theme === "dark"
                  ? "Cambiar a modo claro"
                  : "Cambiar a modo oscuro"
              }
              title={
                theme === "dark"
                  ? "Cambiar a modo claro"
                  : "Cambiar a modo oscuro"
              }
              className="flex items-center justify-center text-text-secondary hover:text-primary border border-border rounded-full p-2 hover:border-primary transition-all cursor-pointer"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1.5 text-text-secondary hover:text-primary font-mono text-xs border border-border rounded-full px-3 py-1.5 hover:border-primary transition-all cursor-pointer"
            >
              <Globe size={14} />
              {language === "es" ? "EN" : "ES"}
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              aria-label={
                theme === "dark"
                  ? "Cambiar a modo claro"
                  : "Cambiar a modo oscuro"
              }
              className="text-text-secondary hover:text-primary p-2 cursor-pointer"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.9 }}
              className="text-text-secondary hover:text-primary p-2 cursor-pointer"
            >
              <Globe size={18} />
            </motion.button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-text-secondary hover:text-primary p-2 cursor-pointer"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute left-0 right-0 top-16 bg-bg-dark border-t border-border overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            <div className="flex flex-col px-5 py-6 gap-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, delay: index * 0.06 }}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      const target = document.querySelector(link.href);
                      if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: "smooth" });
                      } else {
                        e.preventDefault();
                        window.location.href = `${BASE_PATH}/${link.href}`;
                      }
                    }
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 py-4 px-5 text-base font-mono text-text-primary bg-bg-card border border-border rounded-xl active:bg-primary/10 active:border-primary/30 transition-all"
                >
                  <span className="text-primary text-sm">▸</span>
                  {link.label}
                </motion.a>
              ))}

              {/* Divider */}
              <div className="h-px bg-border my-2" />

              {/* Theme toggle */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, delay: navLinks.length * 0.06 }}
                onClick={() => {
                  toggleTheme();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 py-4 px-5 text-base font-mono text-text-secondary bg-bg-card border border-border rounded-xl active:bg-primary/10 active:border-primary/30 transition-all cursor-pointer"
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-primary" />
                ) : (
                  <Moon size={18} className="text-primary" />
                )}
                {theme === "dark"
                  ? language === "es"
                    ? "Modo claro"
                    : "Light mode"
                  : language === "es"
                  ? "Modo oscuro"
                  : "Dark mode"}
              </motion.button>

              {/* Language toggle */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, delay: (navLinks.length + 1) * 0.06 }}
                onClick={() => {
                  toggleLanguage();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 py-4 px-5 text-base font-mono text-text-secondary bg-bg-card border border-border rounded-xl active:bg-primary/10 active:border-primary/30 transition-all cursor-pointer"
              >
                <Globe size={18} className="text-primary" />
                {language === "es" ? "Switch to English" : "Cambiar a Español"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
