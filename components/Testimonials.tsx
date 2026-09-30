"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const testimonials = [
  {
    id: 1,
    name: "Sophia R.",
    title: "Regular Client · Gel Manicures",
    quote:
      "LUNA NAIL STUDIO has completely ruined every other nail salon for me. The attention to detail, the premium products, and the absolutely stunning nail art — I leave feeling like a completely different person. My gel set lasts 4+ weeks without lifting. This is not a nail salon, it's an experience.",
    stars: 5,
    avatar: "SR",
    avatarGradient: "linear-gradient(135deg, #F472B6, #EC4899)",
  },
  {
    id: 2,
    name: "Megan T.",
    title: "Bridal Client · Custom Nail Art",
    quote:
      "I came in for my wedding nails and I was blown away. They took my inspiration photos, listened to every detail I wanted, and created something even more beautiful than I imagined. All my bridesmaids are now regulars here. The atmosphere is so calming and luxurious — exactly what you want before your big day.",
    stars: 5,
    avatar: "MT",
    avatarGradient: "linear-gradient(135deg, #A855F7, #7C3AED)",
  },
  {
    id: 3,
    name: "Isabelle K.",
    title: "Monthly Client · Acrylic & Nail Art",
    quote:
      "I've been getting my nails done for years and LUNA is on another level. The sanitation standards are impeccable, the artists are clearly trained professionals, and the vibe is like walking into a high-end spa. My acrylic sets are always flawlessly shaped and the nail art looks like it belongs in a magazine.",
    stars: 5,
    avatar: "IK",
    avatarGradient: "linear-gradient(135deg, #EC4899, #A855F7)",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80, transition: { duration: 0.3 } }),
  };

  const t = testimonials[current];

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FDF2F8 0%, #F3E8FF 50%, #FDF2F8 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-1/4 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #A855F7 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-purple-600 bg-purple-50 mb-4">
            Client Love
          </span>
          <h2
            className="font-black gradient-text mb-4"
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            }}
          >
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Don&apos;t just take our word for it — hear from the incredible clients who trust us with their nails.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-8 md:p-12 rounded-3xl relative"
                style={{
                  background: "#ffffff",
                  borderLeft: "4px solid #F472B6",
                  boxShadow: "0 20px 60px rgba(236,72,153,0.1), 0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                {/* Quote icon */}
                <div
                  className="absolute top-6 right-8 opacity-10"
                  style={{ color: "#A855F7" }}
                >
                  <Quote size={64} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-pink-400 text-pink-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 font-medium"
                  style={{ fontStyle: "italic" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: t.avatarGradient }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p
                      className="font-bold text-gray-800"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-sm">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center justify-between mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center text-pink-500 border border-pink-200 hover:bg-pink-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    background: i === current
                      ? "linear-gradient(135deg, #EC4899, #A855F7)"
                      : "#FCD7E8",
                  }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-pink-500 border border-pink-200 hover:bg-pink-50 transition-colors"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* Google rating note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-500 text-sm"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span>
            <strong className="text-gray-700">4.9 / 5</strong> based on 120+ Google Reviews
          </span>
        </motion.div>
      </div>
    </section>
  );
}
