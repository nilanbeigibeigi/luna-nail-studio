"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#why-us" },
  { label: "Book Now", href: "#booking", cta: true },
];

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === "#booking") {
      onOpenModal();
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav shadow-lg shadow-pink-100/30" : "glass-nav"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="cursor-pointer"
            >
              <span
                className="gradient-text font-black tracking-tight"
                style={{ fontSize: "1.5rem", fontFamily: "var(--font-poppins)" }}
              >
                LUNA
              </span>
              <span
                className="ml-1 text-gray-500 font-medium"
                style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}
              >
                SALON
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link.cta ? (
                  <li key={link.label}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleNavClick(link.href)}
                      className="btn-primary text-sm px-6 py-2.5"
                    >
                      {link.label}
                    </motion.button>
                  </li>
                ) : (
                  <li key={link.label}>
                    <motion.button
                      whileHover={{ color: "#EC4899" }}
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-700 font-medium text-sm transition-colors hover:text-pink-500 relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 rounded group-hover:w-full transition-all duration-300" />
                    </motion.button>
                  </li>
                )
              )}
            </ul>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-pink-500 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden"
            >
              <div className="p-6 pt-20 flex flex-col gap-2">
                <div className="mb-4 pb-4 border-b border-pink-100">
                  <span className="gradient-text font-black text-xl" style={{ fontFamily: "var(--font-poppins)" }}>
                    LUNA NAIL STUDIO
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Where Beauty Becomes Art</p>
                </div>
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleNavClick(link.href)}
                    className={
                      link.cta
                        ? "btn-primary text-sm mt-4 text-center"
                        : "text-left text-gray-700 font-medium py-3 px-2 rounded-lg hover:bg-pink-50 hover:text-pink-500 transition-colors"
                    }
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
