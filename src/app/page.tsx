"use client";

import Image from "next/image";
import ApplyDomainBrand from "../components/ApplyDomainBrand/ApplyDomainBrand";
import useBrand from "@/hooks/useBrand";
import { motion } from "framer-motion";

export default function Home() {
  const { currentBrand, brandColors } = useBrand();

  return (
    <>
      <ApplyDomainBrand />

      <main className="min-h-screen px-6 md:px-12 lg:px-20 py-12 bg-[var(--brand-background)] text-[var(--brand-text-primary)] transition-colors duration-500">
        {/* HERO SECTION */}
        <section className="grid gap-10 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              Welcome to{" "}
              <span
                className="text-[var(--brand-primary)]"
                style={{ color: brandColors.primary }}
              >
                {currentBrand?.name || "Your Brand"}
              </span>
            </h1>
            <p className="text-[var(--brand-text-secondary)] text-base md:text-lg mb-8">
              A professional, responsive layout built with your brand's style
              and colors. Customize freely and ship faster.
            </p>

            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-5 py-3 rounded-lg font-semibold text-white shadow-md transition-all duration-300"
                style={{
                  backgroundColor: brandColors.primary,
                }}
              >
                Get in Touch
              </a>
              <a
                href="#about"
                className="px-5 py-3 rounded-lg font-semibold border transition-all duration-300"
                style={{
                  borderColor: brandColors.primary,
                  color: brandColors.primary,
                }}
              >
                Learn More
              </a>
            </div>

            <div className="mt-6 text-sm opacity-80">
              <p>Brand ID: {currentBrand?.id || "—"}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src="/next.svg"
              alt="Brand Visual"
              width={320}
              height={160}
              className="drop-shadow-lg"
            />
          </motion.div>
        </section>

        {/* FEATURE CARDS SECTION */}
        <section className="mt-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Brand Features
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Card 1 - Primary Brand Color */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl p-8 shadow-xl transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2"
              style={{
                background: `linear-gradient(135deg, ${brandColors.primary}20, ${brandColors.primary}10)`,
                border: `2px solid ${brandColors.primary}30`,
              }}
            >
              <div className="flex items-center mb-6">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: brandColors.primary }}
                >
                  <span className="text-white font-bold text-lg">🎨</span>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: brandColors.primary }}>
                  Brand Identity
                </h3>
              </div>
              
              <p className="text-[var(--brand-text-secondary)] mb-6 leading-relaxed">
                Experience dynamic branding with real-time color theming. Our system adapts to your brand's unique identity across all components.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: brandColors.primary,
                    color: 'white'
                  }}
                >
                  Active
                </span>
                <button className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: brandColors.primary,
                    color: 'white'
                  }}
                >
                  Explore
                </button>
              </div>
            </motion.div>

            {/* Card 2 - Secondary Brand Color */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl p-8 shadow-xl transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2"
              style={{
                background: `linear-gradient(135deg, ${brandColors.secondary}15, ${brandColors.secondary}05)`,
                border: `2px solid ${brandColors.secondary}20`,
              }}
            >
              <div className="flex items-center mb-6">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: brandColors.secondary }}
                >
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: brandColors.secondary }}>
                  Performance
                </h3>
              </div>
              
              <p className="text-[var(--brand-text-secondary)] mb-6 leading-relaxed">
                Lightning-fast performance with optimized brand asset delivery. Enjoy seamless theming without compromising on speed or user experience.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: brandColors.secondary,
                    color: 'white'
                  }}
                >
                  Optimized
                </span>
                <button className="px-4 py-2 rounded-lg font-medium border transition-all duration-300 hover:shadow-lg"
                  style={{
                    borderColor: brandColors.secondary,
                    color: brandColors.secondary
                  }}
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COLOR SHOWCASE CARDS */}
        <section className="mt-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Brand Color Palette
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Primary", color: brandColors.primary, value: brandColors.primary },
              { name: "Secondary", color: brandColors.secondary, value: brandColors.secondary },
              { name: "Accent", color: brandColors.accent, value: brandColors.accent },
              { name: "Success", color: brandColors.success, value: brandColors.success },
            ].map((colorItem, index) => (
              <motion.div
                key={colorItem.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: colorItem.color,
                  color: 'white'
                }}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-white border-opacity-30"></div>
                <h3 className="font-bold text-lg mb-2">{colorItem.name}</h3>
                <p className="text-sm opacity-90 font-mono">{colorItem.value}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-10">
            What We Offer
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Design",
                desc: "Beautiful, accessible UI that reflects your brand identity.",
                icon: "🎨",
              },
              {
                title: "Development",
                desc: "Built with modern frameworks for performance and scalability.",
                icon: "⚙️",
              },
              {
                title: "Delivery",
                desc: "From concept to deployment — production-ready output.",
                icon: "🚀",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl p-6 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300 border"
                style={{
                  borderColor: brandColors.primary,
                  background: `linear-gradient(135deg, ${brandColors.primary}15, ${brandColors.primary}05)`,
                }}
              >
                <div
                  className="text-5xl mb-4"
                  style={{ color: brandColors.primary }}
                >
                  {s.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2">
                  {s.title}
                </h3>
                <p className="text-[var(--brand-text-secondary)] text-sm leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-md bg-[var(--brand-surface)]"
            style={{ borderColor: brandColors.primary }}
          >
            <div>
              <h4 className="font-semibold text-xl mb-1">
                Ready to start your project?
              </h4>
              <p className="text-[var(--brand-text-secondary)]">
                Send a message and we'll reply within 24 hours.
              </p>
            </div>
            <a
              href="#"
              className="mt-6 sm:mt-0 px-5 py-3 rounded-lg font-semibold text-white transition-all duration-300"
              style={{
                backgroundColor: brandColors.primary,
              }}
            >
              Contact Us
            </a>
          </motion.div>
        </section>

      </main>
    </>
  );
}