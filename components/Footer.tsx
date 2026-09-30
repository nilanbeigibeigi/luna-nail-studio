"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, Mail, Heart } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About Us", href: "#why-us" },
  { label: "Book Appointment", href: "#booking" },
  { label: "Gift Cards", href: "#booking" },
];

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: "#1a0a14" }}>
      {/* Gradient top border */}
      <div
        className="h-1 w-full"
        style={{ background: "linear-gradient(90deg, #F472B6, #A855F7, #EC4899, #7C3AED)" }}
      />

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, #F472B6 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, #A855F7 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Brand Column */}
            <div>
              <div className="mb-4">
                <span
                  className="gradient-text font-black text-2xl"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  LUNA
                </span>
                <span className="ml-1.5 text-gray-500 font-medium text-xs tracking-widest">SALON</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
                Where beauty becomes art. A fictional luxury nail studio —
                crafting impeccable nails since 2021.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                {[
                  { icon: <InstagramIcon size={18} />, href: "#", label: "Instagram" },
                  { icon: <TikTokIcon size={18} />, href: "#", label: "TikTok" },
                  { icon: <FacebookIcon size={18} />, href: "#", label: "Facebook" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #EC4899, #A855F7)";
                      (e.currentTarget as HTMLElement).style.color = "white";
                      (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.color = "";
                      (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.08)";
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="text-white font-bold text-sm tracking-widest uppercase mb-5"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-400 text-sm hover:text-pink-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs">✦</span>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4
                className="text-white font-bold text-sm tracking-widest uppercase mb-5"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin size={16} className="text-pink-500 mt-0.5 flex-shrink-0" />
                  <span>Vancouver, BC<br />(demo address)</span>
                </li>
                <li>
                  <a
                    href="tel:+16045550199"
                    className="flex items-center gap-3 text-gray-400 text-sm hover:text-pink-400 transition-colors"
                  >
                    <Phone size={16} className="text-pink-500 flex-shrink-0" />
                    (604) 555-0199
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@lunanailstudio.demo.com"
                    className="flex items-center gap-3 text-gray-400 text-sm hover:text-pink-400 transition-colors"
                  >
                    <Mail size={16} className="text-pink-500 flex-shrink-0" />
                    hello@lunanailstudio.demo.com
                  </a>
                </li>
              </ul>

              {/* Hours */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-2">Hours</p>
                <p className="text-gray-400 text-sm">Mon–Fri: 10am – 7pm</p>
                <p className="text-gray-400 text-sm">Sat–Sun: 10am – 6pm</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 mb-6" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-600 text-xs">
            <p>
              © {new Date().getFullYear()} LUNA NAIL STUDIO. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart size={12} className="text-pink-500 fill-pink-500 mx-0.5" /> in Vancouver, BC
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
