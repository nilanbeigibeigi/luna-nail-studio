"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface FloatingElementsProps {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}

function NailPolishSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bottle body */}
      <rect x="22" y="60" width="36" height="90" rx="10" fill="url(#bottleGrad)" />
      {/* Bottle cap */}
      <rect x="28" y="30" width="24" height="35" rx="6" fill="url(#capGrad)" />
      {/* Brush handle */}
      <rect x="36" y="10" width="8" height="22" rx="3" fill="#BE185D" />
      {/* Shine */}
      <rect x="27" y="70" width="6" height="40" rx="3" fill="rgba(255,255,255,0.35)" />
      {/* Label */}
      <rect x="26" y="90" width="28" height="20" rx="4" fill="rgba(255,255,255,0.15)" />
      <defs>
        <linearGradient id="bottleGrad" x1="22" y1="60" x2="58" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="capGrad" x1="28" y1="30" x2="52" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SparkeSVG({ className, color = "#F472B6" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 2 L22 18 L38 20 L22 22 L20 38 L18 22 L2 20 L18 18 Z" fill={color} opacity="0.85" />
    </svg>
  );
}

function DiamondSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="25,2 48,18 25,48 2,18" fill="url(#diamGrad)" opacity="0.7" />
      <polygon points="25,2 48,18 25,20" fill="rgba(255,255,255,0.3)" />
      <defs>
        <linearGradient id="diamGrad" x1="2" y1="2" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F3E8FF" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function FloatingElements({ mouseX, mouseY }: FloatingElementsProps) {
  const px1 = useTransform(mouseX, [0, 1], [-18, 18]);
  const py1 = useTransform(mouseY, [0, 1], [-12, 12]);
  const px2 = useTransform(mouseX, [0, 1], [12, -12]);
  const py2 = useTransform(mouseY, [0, 1], [8, -8]);
  const px3 = useTransform(mouseX, [0, 1], [-8, 8]);
  const py3 = useTransform(mouseY, [0, 1], [-6, 6]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main nail polish bottle */}
      <motion.div
        className="absolute right-[8%] top-[15%] w-24 md:w-36 animate-float"
        style={{ x: px1, y: py1 }}
      >
        <NailPolishSVG className="w-full h-auto drop-shadow-2xl" />
      </motion.div>

      {/* Second smaller bottle */}
      <motion.div
        className="absolute left-[5%] bottom-[25%] w-14 md:w-20 animate-float-delay opacity-70"
        style={{ x: px2, y: py2 }}
      >
        <NailPolishSVG className="w-full h-auto drop-shadow-xl" />
      </motion.div>

      {/* Sparkles */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-8 md:w-12 animate-sparkle"
        style={{ x: px3, y: py3 }}
      >
        <SparkeSVG className="w-full h-auto" color="#F472B6" />
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[15%] w-6 md:w-8 animate-sparkle"
        style={{ x: px1, y: py3, animationDelay: "0.8s" }}
      >
        <SparkeSVG className="w-full h-auto" color="#A855F7" />
      </motion.div>

      <motion.div
        className="absolute top-[35%] right-[25%] w-5 md:w-7 animate-star"
        style={{ x: px2, y: py1 }}
      >
        <SparkeSVG className="w-full h-auto" color="#F59E0B" />
      </motion.div>

      {/* Diamond */}
      <motion.div
        className="absolute bottom-[30%] right-[5%] w-10 md:w-16 animate-float-slow"
        style={{ x: px2, y: py2 }}
      >
        <DiamondSVG className="w-full h-auto" />
      </motion.div>

      {/* Floating circles / blobs */}
      <motion.div
        className="absolute top-[10%] right-[30%] w-3 h-3 rounded-full bg-pink-300 opacity-60 animate-star"
        style={{ x: px3, y: py1 }}
      />
      <motion.div
        className="absolute bottom-[40%] left-[20%] w-2 h-2 rounded-full bg-purple-400 opacity-50 animate-sparkle"
        style={{ x: px1, y: py3 }}
      />
      <motion.div
        className="absolute top-[50%] left-[8%] w-4 h-4 rounded-full bg-pink-200 opacity-40 animate-float"
        style={{ x: px2, y: py2 }}
      />
    </div>
  );
}
