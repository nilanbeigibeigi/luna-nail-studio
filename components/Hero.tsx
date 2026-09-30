"use client";

import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { useEffect, useCallback } from "react";
import FloatingElements from "./FloatingElements";
import { ChevronDown } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Hero() {
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 25 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 25 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    },
    [rawX, rawY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToGallery = () => {
    document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#FDF2F8" }}
    >
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="animate-mesh absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, #F472B6 0%, #EC4899 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="animate-mesh-2 absolute -bottom-40 -right-20 w-[700px] h-[700px] rounded-full opacity-35"
          style={{
            background: "radial-gradient(circle, #A855F7 0%, #7C3AED 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="animate-mesh-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #F3E8FF 0%, #F472B6 50%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Floating 3D Elements */}
      <FloatingElements mouseX={mouseX} mouseY={mouseY} />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-pink-700 border border-pink-200/50">
              <span className="animate-sparkle text-pink-400">✦</span>
              Luxury Nail Studio (Portfolio Demo)
              <span className="animate-sparkle text-purple-400" style={{ animationDelay: "0.5s" }}>✦</span>
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-black leading-none tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
            }}
          >
            <span className="gradient-text block">Where Beauty</span>
            <span className="gradient-text-rev block">Becomes Art</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-gray-500 font-medium max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}
          >
            Elevate your style with precision nail artistry, premium products,
            and an experience that&apos;s as luxurious as the results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary text-base px-8 py-4 w-full sm:w-auto"
            >
              Book Appointment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToGallery}
              className="btn-outline text-base px-8 py-4 w-full sm:w-auto"
            >
              View Gallery
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mt-14 text-sm text-gray-500"
          >
            {["500+ Happy Clients", "5★ Rated Studio", "Certified Artists", "Premium Products"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="text-pink-400">✦</span>
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors group"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.button>
    </section>
  );
}
