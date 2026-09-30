"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import Gallery from "./Gallery";
import WhyUs from "./WhyUs";
import Testimonials from "./Testimonials";
import BookingCTA from "./BookingCTA";
import Footer from "./Footer";
import BookingModal from "./BookingModal";

export default function PageClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero />
      <Services />
      <Gallery />
      <WhyUs />
      <Testimonials />
      <BookingCTA onOpenModal={() => setModalOpen(true)} />
      <Footer />
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
