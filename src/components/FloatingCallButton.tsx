"use client";

import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingCallButton = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneNumber = "+916297868104";
  const displayPhone = "+91 6297868104";

  useEffect(() => {
    // Check if device is mobile using matchMedia for better accuracy
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches || 
        /Mobi|Android/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault();
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    }
  };

  return (
    <div className="fixed left-6 bottom-6 z-50 flex items-end">
      <div className="relative">
        <AnimatePresence>
          {showMessage && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: 0, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, x: 0, scale: 0.95 }}
              className="absolute bottom-full left-0 mb-4 w-72 rounded-2xl bg-white/95 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-luxury-gold/20"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Call us directly</p>
                  <p className="text-xl font-bold text-gray-900 font-serif tracking-wide">{displayPhone}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Available Mon-Fri, 9am - 6pm. We look forward to talking to you!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={`tel:${phoneNumber}`}
          onClick={handleClick}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-luxury-gold to-[#F2D675] text-white shadow-lg shadow-luxury-gold/40 hover:shadow-xl hover:shadow-luxury-gold/50 transition-all duration-300 hover:-translate-y-1"
        >
          <Phone className="h-7 w-7" />
          
          {/* Ripple effect */}
          <span className="absolute inset-0 rounded-full border-2 border-luxury-gold/60 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75"></span>
          <span className="absolute inset-0 rounded-full border-2 border-luxury-gold/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_1s] opacity-75"></span>
        </a>
      </div>
    </div>
  );
};
