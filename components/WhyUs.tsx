"use client";

import { motion, type Variants } from "framer-motion";
import { Shield, Award, Sparkles, Brush } from "lucide-react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12 },
  }),
};

const features = [
  {
    icon: <Shield size={32} />,
    title: "Premium Products Only",
    description:
      "We use only professional-grade, salon-quality products — OPI, CND, Young Nails, and Aprés. No shortcuts, no compromises.",
    stat: "100%",
    statLabel: "Professional Grade",
    gradient: "from-pink-400 to-rose-500",
    bg: "bg-pink-50",
    textColor: "text-pink-600",
  },
  {
    icon: <Award size={32} />,
    title: "Certified Nail Artists",
    description:
      "Every technician holds provincial certification and completes ongoing training in the latest nail techniques and health standards.",
    stat: "8+",
    statLabel: "Years Average Experience",
    gradient: "from-purple-400 to-violet-600",
    bg: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    icon: <Shield size={32} />,
    title: "Hygienic & Safe",
    description:
      "Strict sanitation protocols with hospital-grade sterilization for every tool. Single-use files and buffers — your health is our priority.",
    stat: "100%",
    statLabel: "Sterilized Tools",
    gradient: "from-fuchsia-400 to-pink-500",
    bg: "bg-fuchsia-50",
    textColor: "text-fuchsia-600",
  },
  {
    icon: <Brush size={32} />,
    title: "Custom Nail Art",
    description:
      "Bring your vision or let our artists create something uniquely yours. From subtle details to full editorial sets, we make it happen.",
    stat: "500+",
    statLabel: "Unique Designs Created",
    gradient: "from-rose-400 to-purple-500",
    bg: "bg-rose-50",
    textColor: "text-rose-600",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #F472B6 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translateY(-50%) translateX(30%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #A855F7 0%, transparent 70%)",
          filter: "blur(70px)",
          transform: "translate(-30%, -30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-pink-600 bg-pink-50 mb-4">
            Our Promise
          </span>
          <h2
            className="font-black gradient-text mb-4"
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            }}
          >
            Why Choose Us
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            We don&apos;t just do nails — we craft experiences. Here&apos;s what sets
            LUNA NAIL STUDIO apart from the rest.
          </p>
        </motion.div>

        {/* Feature Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="overflow-x-auto pb-4 md:overflow-visible md:pb-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-[720px] md:min-w-0">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 3 + i * 0.5,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  },
                }}
                className="flex-shrink-0 w-64 md:w-auto"
              >
                <div
                  className="rounded-2xl p-6 h-full relative overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, #ffffff, #FDF2F8)",
                    border: "1px solid rgba(244,114,182,0.1)",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-white"
                    style={{
                      background: `linear-gradient(135deg, ${
                        i === 0 ? "#F472B6, #EC4899" :
                        i === 1 ? "#A855F7, #7C3AED" :
                        i === 2 ? "#EC4899, #BE185D" :
                        "#7C3AED, #F472B6"
                      })`,
                      boxShadow: `0 8px 20px rgba(${
                        i === 0 ? "236,72,153" :
                        i === 1 ? "168,85,247" :
                        i === 2 ? "190,24,93" :
                        "124,58,237"
                      }, 0.3)`,
                    }}
                  >
                    {feature.icon}
                  </div>

                  {/* Stat */}
                  <div className="mb-3">
                    <span
                      className="font-black text-3xl gradient-text"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {feature.stat}
                    </span>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{feature.statLabel}</p>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="font-bold text-gray-800 text-base mb-2"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>

                  {/* Decorative sparkle */}
                  <div className="absolute top-4 right-4 text-pink-200 animate-star text-sm">✦</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-2xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          style={{
            background: "linear-gradient(135deg, #EC4899, #A855F7)",
            boxShadow: "0 20px 60px rgba(236,72,153,0.25)",
          }}
        >
          {[
            { number: "500+", label: "Happy Clients" },
            { number: "5★", label: "Average Rating" },
            { number: "3+", label: "Years in Business" },
            { number: "50+", label: "Nail Art Designs" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-black text-white text-3xl md:text-4xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {stat.number}
              </div>
              <div className="text-white/75 text-sm mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
