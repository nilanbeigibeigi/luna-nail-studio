"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Phone, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "Gel Manicure",
  "Acrylic Full Set",
  "Nail Art Design",
  "Pedicure Deluxe",
  "Nail Extensions",
  "Spa Manicure",
];

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM",  "2:00 PM",  "3:00 PM",
  "4:00 PM",  "5:00 PM",  "6:00 PM", "7:00 PM",
];

const today = new Date().toISOString().split("T")[0];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when open; restore on close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — wire to a real booking API here
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(15, 5, 20, 0.65)", backdropFilter: "blur(10px)" }}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, type: "spring", damping: 28, stiffness: 260 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl"
              style={{
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 32px 80px rgba(236, 72, 153, 0.25), 0 8px 32px rgba(0,0,0,0.12)",
                border: "1px solid rgba(244, 114, 182, 0.2)",
              }}
            >
              {/* Gradient top bar */}
              <div
                className="h-1.5 w-full rounded-t-3xl"
                style={{ background: "linear-gradient(90deg, #F472B6, #A855F7, #EC4899)" }}
              />

              <div className="p-7 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-pink-400" />
                      <span className="text-xs font-semibold tracking-widest uppercase text-pink-500">
                        LUNA NAIL STUDIO
                      </span>
                    </div>
                    <h2
                      id="modal-title"
                      className="font-black text-gray-800 leading-tight"
                      style={{ fontFamily: "var(--font-poppins)", fontSize: "1.65rem" }}
                    >
                      Book Your{" "}
                      <span className="gradient-text">Appointment</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      We&apos;ll confirm your slot within 2 hours.
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    aria-label="Close booking modal"
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors ml-4 mt-0.5"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                      <input
                        ref={firstInputRef}
                        id="booking-name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200"
                        style={{
                          border: "1.5px solid #e5e7eb",
                          background: "#fafafa",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.border = "1.5px solid #F472B6";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(244,114,182,0.12)";
                          e.currentTarget.style.background = "#fff";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.border = "1.5px solid #e5e7eb";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.background = "#fafafa";
                        }}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        placeholder="(604) 000-0000"
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200"
                        style={{ border: "1.5px solid #e5e7eb", background: "#fafafa" }}
                        onFocus={(e) => {
                          e.currentTarget.style.border = "1.5px solid #F472B6";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(244,114,182,0.12)";
                          e.currentTarget.style.background = "#fff";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.border = "1.5px solid #e5e7eb";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.background = "#fafafa";
                        }}
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label
                      htmlFor="booking-service"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Service
                    </label>
                    <div className="relative">
                      <Sparkles
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                      <select
                        id="booking-service"
                        required
                        defaultValue=""
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-gray-800 outline-none appearance-none transition-all duration-200"
                        style={{ border: "1.5px solid #e5e7eb", background: "#fafafa" }}
                        onFocus={(e) => {
                          e.currentTarget.style.border = "1.5px solid #A855F7";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.12)";
                          e.currentTarget.style.background = "#fff";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.border = "1.5px solid #e5e7eb";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.background = "#fafafa";
                        }}
                      >
                        <option value="" disabled>Select a service…</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {/* Custom chevron */}
                      <svg
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Date + Time — side by side on sm+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Date */}
                    <div>
                      <label
                        htmlFor="booking-date"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                          id="booking-date"
                          type="date"
                          required
                          min={today}
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-gray-800 outline-none transition-all duration-200"
                          style={{ border: "1.5px solid #e5e7eb", background: "#fafafa" }}
                          onFocus={(e) => {
                            e.currentTarget.style.border = "1.5px solid #F472B6";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(244,114,182,0.12)";
                            e.currentTarget.style.background = "#fff";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.border = "1.5px solid #e5e7eb";
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.background = "#fafafa";
                          }}
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label
                        htmlFor="booking-time"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Preferred Time
                      </label>
                      <div className="relative">
                        <Clock
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <select
                          id="booking-time"
                          required
                          defaultValue=""
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-gray-800 outline-none appearance-none transition-all duration-200"
                          style={{ border: "1.5px solid #e5e7eb", background: "#fafafa" }}
                          onFocus={(e) => {
                            e.currentTarget.style.border = "1.5px solid #A855F7";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.12)";
                            e.currentTarget.style.background = "#fff";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.border = "1.5px solid #e5e7eb";
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.background = "#fafafa";
                          }}
                        >
                          <option value="" disabled>Select time…</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <svg
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                          width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 12px 40px rgba(236,72,153,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide mt-2"
                    style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)" }}
                  >
                    Request Appointment ✦
                  </motion.button>

                  <p className="text-center text-gray-400 text-xs">
                    We&apos;ll call you to confirm. No payment required upfront.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
