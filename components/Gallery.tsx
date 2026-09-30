"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Heart, Eye } from "lucide-react";

type FilterTab = "All" | "Gel" | "Acrylic" | "Nail Art" | "Pedicure";

const filterTabs: FilterTab[] = ["All", "Gel", "Acrylic", "Nail Art", "Pedicure"];

interface GalleryItem {
  id: number;
  category: Exclude<FilterTab, "All">;
  gradient: string;
  height: string;
  label: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1,  category: "Gel",      gradient: "linear-gradient(135deg, #F472B6, #EC4899)",              height: "h-48", label: "Blush Rose Gel" },
  { id: 2,  category: "Nail Art", gradient: "linear-gradient(135deg, #A855F7, #7C3AED)",              height: "h-64", label: "Violet Dreams" },
  { id: 3,  category: "Acrylic",  gradient: "linear-gradient(135deg, #FDF2F8, #F472B6)",              height: "h-40", label: "French Tip Set" },
  { id: 4,  category: "Pedicure", gradient: "linear-gradient(135deg, #BE185D, #7C3AED)",              height: "h-56", label: "Magenta Spa" },
  { id: 5,  category: "Nail Art", gradient: "linear-gradient(135deg, #F59E0B, #F472B6)",              height: "h-44", label: "Gold Foil Art" },
  { id: 6,  category: "Gel",      gradient: "linear-gradient(135deg, #F3E8FF, #A855F7)",              height: "h-60", label: "Lavender Cloud" },
  { id: 7,  category: "Acrylic",  gradient: "linear-gradient(135deg, #EC4899, #BE185D)",              height: "h-48", label: "Classic Ombre" },
  { id: 8,  category: "Nail Art", gradient: "linear-gradient(135deg, #7C3AED, #F472B6)",              height: "h-36", label: "Galaxy Print" },
  { id: 9,  category: "Gel",      gradient: "linear-gradient(135deg, #FDF2F8, #BE185D)",              height: "h-52", label: "Soft Pink Gel" },
  { id: 10, category: "Pedicure", gradient: "linear-gradient(135deg, #F472B6, #A855F7, #7C3AED)",     height: "h-44", label: "Rainbow Spa" },
  { id: 11, category: "Nail Art", gradient: "linear-gradient(135deg, #F3E8FF, #EC4899)",              height: "h-64", label: "Floral Hand Art" },
  { id: 12, category: "Acrylic",  gradient: "linear-gradient(135deg, #A855F7, #F472B6, #F59E0B)",    height: "h-40", label: "Glitter Tips" },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function GalleryCard({ item }: { item: GalleryItem }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4 }}
      className={`${item.height} rounded-2xl overflow-hidden relative cursor-pointer group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: 800 }}
    >
      {/* Background gradient "image" */}
      <motion.div
        className="absolute inset-0"
        style={{ background: item.gradient }}
        animate={{ rotateY: hovered ? 2 : 0, scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.15) 100%)",
        }}
      />

      {/* Sparkle dots */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white/60 animate-star" />
      <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-white/40 animate-sparkle" />

      {/* Hover Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: "rgba(190,24,93,0.55)", backdropFilter: "blur(4px)" }}
          >
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="flex gap-4"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <Heart
                  size={16}
                  className={liked ? "fill-white text-white" : "text-white"}
                />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/40 transition-colors">
                <Eye size={16} className="text-white" />
              </button>
            </motion.div>
            <motion.p
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-white text-xs font-semibold tracking-wide"
            >
              {item.label}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category badge */}
      <div className="absolute bottom-3 left-3">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 tracking-wide"
          style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(6px)" }}>
          {item.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filtered = activeFilter === "All"
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeFilter);

  return (
    <section
      id="gallery"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #F3E8FF 40%, #FDF2F8 100%)" }}
    >
      {/* Decorative blob */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #F472B6 0%, transparent 70%)",
          filter: "blur(70px)",
          transform: "translate(-30%, 20%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-purple-600 bg-purple-50 mb-4">
            Portfolio
          </span>
          <h2
            className="font-black gradient-text mb-4"
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            }}
          >
            Our Work
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-base">
            Every set tells a story. Browse our collection of custom nail art and salon creations.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filterTabs.map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250 ${
                activeFilter === tab
                  ? "text-white shadow-lg shadow-pink-200"
                  : "text-gray-500 bg-white border border-gray-100 hover:border-pink-200 hover:text-pink-500"
              }`}
              style={
                activeFilter === tab
                  ? { background: "linear-gradient(135deg, #EC4899, #A855F7)" }
                  : {}
              }
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} className="masonry-grid">
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-10"
        >
          Follow us on{" "}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 font-semibold hover:text-purple-500 transition-colors"
          >
            @lunanailstudio.demo
          </a>{" "}
          for daily nail inspiration.
        </motion.p>
      </div>
    </section>
  );
}
