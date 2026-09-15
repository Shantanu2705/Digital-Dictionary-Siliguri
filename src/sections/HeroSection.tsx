"use client";

import { motion } from "framer-motion";
import { PremiumButton } from "@/components/PremiumButton";
import { DynamicTextColor } from "@/components/DynamicTextColor";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex flex-col justify-center items-center overflow-hidden bg-transparent">
      
      {/* Smart Background Element - Glowing Orb in the middle */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-luxury-gold/10 rounded-full blur-[100px] pointer-events-none -z-10" 
      />

      <div className="container px-6 md:px-12 w-full flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Top Tag */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-block px-6 py-2 rounded-full border border-luxury-gold/50 bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <DynamicTextColor as="span" className="text-xs md:text-sm tracking-[0.3em] uppercase font-bold text-luxury-gold">
              Premium Digital Agency
            </DynamicTextColor>
          </div>
        </motion.div>

        {/* Main Title - Centered in the vacant space */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="max-w-5xl mx-auto mb-10"
        >
          <DynamicTextColor as="h1" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight font-serif font-medium">
            We build <span className="italic font-light drop-shadow-lg">digital</span> experiences that move business forward.
          </DynamicTextColor>
        </motion.div>

        {/* Subtitle / Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mb-14"
        >
          <DynamicTextColor as="p" className="text-sm md:text-lg font-semibold tracking-[0.2em] uppercase opacity-80">
            Technology &middot; Design &middot; Marketing
          </DynamicTextColor>
        </motion.div>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <PremiumButton href="/contact" withArrow className="px-8 py-4 text-lg shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            Start a Project
          </PremiumButton>
          
          <PremiumButton href="/portfolio" className="bg-transparent backdrop-blur-md px-8 py-4 text-lg border border-luxury-gold/30 hover:bg-luxury-gold/10">
            Our Work
          </PremiumButton>
        </motion.div>
      </div>

      {/* Scroll indicator guiding the eye down */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <DynamicTextColor as="span" className="text-[10px] uppercase tracking-widest mb-3 opacity-60">Scroll to Explore</DynamicTextColor>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-luxury-gold to-transparent opacity-70" 
        />
      </motion.div>
    </section>
  );
}
