"use client";

import { motion, useMotionValue, useTransform, useSpring, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Layers, Palette, Flower2, Wand2, Star } from "lucide-react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

interface Service {
  icon: React.ReactNode;
  name: string;
  price: string;
  description: string;
  gradient: string;
  iconBg: string;
}

const services: Service[] = [
  {
    icon: <Sparkles size={26} />,
    name: "Gel Manicure",
    price: "$45+",
    description:
      "Long-lasting, high-gloss gel polish expertly applied for a flawless finish that stays chip-free for weeks.",
    gradient: "from-pink-400 to-rose-500",
    iconBg: "bg-pink-50",
  },
  {
    icon: <Layers size={26} />,
    name: "Acrylic Full Set",
    price: "$65+",
    description:
      "Sculpted acrylic extensions crafted to your desired length and shape — strong, elegant, and strikingly beautiful.",
    gradient: "from-purple-400 to-violet-600",
    iconBg: "bg-purple-50",
  },
  {
    icon: <Palette size={26} />,
    name: "Nail Art Design",
    price: "$30+",
    description:
      "Custom hand-painted nail art, from minimalist florals to bold editorial designs. Your nails, your canvas.",
    gradient: "from-fuchsia-400 to-pink-600",
    iconBg: "bg-fuchsia-50",
  },
  {
    icon: <Flower2 size={26} />,
    name: "Pedicure Deluxe",
    price: "$55+",
    description:
      "A full spa pedicure experience — soak, exfoliation, massage, and a perfect gel finish to leave feet silky smooth.",
    gradient: "from-rose-400 to-pink-500",
    iconBg: "bg-rose-50",
  },
  {
    icon: <Wand2 size={26} />,
    name: "Nail Extensions",
    price: "$75+",
    description:
      "Premium nail extensions using BIAB, fibreglass, or sculpted gel for lightweight, natural-looking length.",
    gradient: "from-violet-400 to-purple-600",
    iconBg: "bg-violet-50",
  },
  {
    icon: <Star size={26} />,
    name: "Spa Manicure",
    price: "$50+",
    description:
      "Indulgent spa manicure with warm towel wrap, cuticle care, hand mask, and your choice of polish finish.",
    gradient: "from-pink-300 to-purple-400",
    iconBg: "bg-pink-50",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 10);
    rotateY.set(dx * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformPerspective: 1000,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(16px)",
          border: isHovered
            ? "1.5px solid transparent"
            : "1.5px solid rgba(244,114,182,0.15)",
          boxShadow: isHovered
            ? "0 20px 60px rgba(236,72,153,0.2), 0 4px 20px rgba(168,85,247,0.15)"
            : "0 4px 24px rgba(0,0,0,0.06)",
          backgroundImage: isHovered
            ? "linear-gradient(white, white), linear-gradient(135deg, #F472B6, #A855F7)"
            : undefined,
          backgroundOrigin: isHovered ? "border-box" : undefined,
          backgroundClip: isHovered ? "padding-box, border-box" : undefined,
        } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl p-6 h-full cursor-default transition-shadow duration-300"
      >
        {/* Icon */}
        <div
          className={`${service.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-5`}
          style={{
            background: isHovered
              ? `linear-gradient(135deg, #F472B6 0%, #A855F7 100%)`
              : undefined,
            color: isHovered ? "white" : "#EC4899",
            transition: "all 0.3s ease",
          }}
        >
          {service.icon}
        </div>

        {/* Content */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: "var(--font-poppins)" }}>
            {service.name}
          </h3>
          <span className="gradient-text font-bold text-lg ml-2 whitespace-nowrap">
            {service.price}
          </span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>

        {/* Bottom CTA */}
        <div className="mt-5 pt-4 border-t border-pink-50">
          <span className="text-xs font-semibold text-pink-500 tracking-wide uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
            Book This Service →
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #FDF2F8 50%, #ffffff 100%)" }}
    >
      {/* Decorative blob */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #A855F7 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-pink-600 bg-pink-50 mb-4">
            What We Offer
          </span>
          <h2
            className="font-black gradient-text mb-4"
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            }}
          >
            Our Services
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            From precision gel manicures to bespoke nail art — every service is
            designed to make you feel extraordinary.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-gray-500 mb-5">
            Not sure what you need? We offer complimentary consultations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary text-sm px-8 py-3"
          >
            Book a Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
