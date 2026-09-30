"use client";

import { motion, type Variants } from "framer-motion";
import { Phone, Calendar } from "lucide-react";

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

interface BookingCTAProps {
  onOpenModal: () => void;
}

export default function BookingCTA({ onOpenModal }: BookingCTAProps) {
  return (
    <section
      id="booking"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-bg"
        style={{
          background: "linear-gradient(135deg, #EC4899, #A855F7, #BE185D, #7C3AED, #F472B6)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* Mesh overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="animate-mesh absolute -top-20 -left-20 w-96 h-96 rounded-full"
          style={{ background: "rgba(255,255,255,0.3)", filter: "blur(60px)" }}
        />
        <div
          className="animate-mesh-2 absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
          style={{ background: "rgba(255,255,255,0.2)", filter: "blur(50px)" }}
        />
      </div>

      {/* Sparkles */}
      <div className="absolute top-8 left-[10%] text-white/30 text-3xl animate-sparkle">✦</div>
      <div className="absolute top-12 right-[15%] text-white/20 text-2xl animate-star">✦</div>
      <div className="absolute bottom-10 left-[20%] text-white/25 text-xl animate-float">✦</div>
      <div className="absolute bottom-8 right-[10%] text-white/30 text-3xl animate-sparkle" style={{ animationDelay: "1s" }}>✦</div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-white/90 bg-white/15 backdrop-blur mb-6 border border-white/20">
            ✦ Book Now — Limited Availability ✦
          </span>

          {/* Heading */}
          <h2
            className="font-black text-white mb-4 leading-tight"
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              textShadow: "0 4px 30px rgba(0,0,0,0.15)",
            }}
          >
            Ready for Your
            <br />
            <span
              className="relative"
              style={{
                background: "linear-gradient(135deg, #FDF2F8, #F59E0B, #FDF2F8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Glow Up?
            </span>
          </h2>

          <p className="text-white/80 max-w-lg mx-auto mb-10 text-base leading-relaxed font-medium">
            Treat yourself to an experience as beautiful as the results. Our artists
            are ready to bring your dream nails to life.
          </p>

          {/* Main CTA Button */}
          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenModal}
            className="inline-flex items-center gap-3 bg-white text-pink-600 font-bold text-base px-10 py-4 rounded-full transition-all duration-300 mb-8 border-2 border-white/50"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
          >
            <Calendar size={20} />
            Book Your Appointment
          </motion.button>

          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm font-medium">
            <a
              href="tel:+16045550199"
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <Phone size={14} />
              </div>
              (604) 555-0199
            </a>
            <span className="hidden sm:block text-white/30">·</span>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <InstagramIcon size={14} />
              </div>
              @lunanailstudio.demo
            </a>
          </div>

          {/* Operating hours */}
          <div className="mt-10 inline-flex flex-wrap justify-center gap-4 text-white/60 text-xs font-medium">
            <span>Mon–Fri: 10am – 7pm</span>
            <span className="text-white/30">·</span>
            <span>Sat–Sun: 10am – 6pm</span>
            <span className="text-white/30">·</span>
            <span>Walk-ins Welcome</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
