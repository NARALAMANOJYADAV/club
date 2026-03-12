"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Twitter, Mail, Bell, X } from "lucide-react";
import Image from "next/image";
import { fadeIn } from "@/lib/animations";

export default function HOD() {
  const [showNotice, setShowNotice] = useState(true);
  return (
    <section id="hod" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col items-center gap-4"
        >
          <h2 className="text-4xl md:text-6xl font-space font-black text-white glow-text">
            Head of Department
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 rounded-full" />
        </motion.div>

        <motion.div 
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto glass-morphism rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-[300px] sm:h-[400px] md:h-auto overflow-hidden group">
              <Image 
                src="/hod.jpg" 
                alt="Dr. A. Narayana Rao" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-8 left-8">
                <div className="px-6 py-2 bg-blue-600 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                    HOD
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 sm:p-10 md:p-16 flex flex-col justify-center gap-6 md:gap-8 bg-white/[0.02]">
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-space font-black text-white">
                    Dr. A. Narayana Rao
                </h3>
                <p className="text-blue-500 font-bold tracking-widest uppercase text-sm">
                    HOD, Dept. of AI & DS
                </p>
              </div>

              <blockquote className="text-xl md:text-2xl text-foreground/80 font-italic leading-relaxed border-l-4 border-blue-600 pl-6 italic">
                "Welcome to the Department of AI & DS. Our goal is to nurture the next generation of data scientists and AI engineers who will solve complex global challenges."
              </blockquote>

              <div className="flex items-center gap-6">
                 {[Linkedin, Twitter, Mail].map((Icon, i) => (
                    <motion.a 
                      key={i}
                      href="#" 
                      whileHover={{ scale: 1.2, y: -2 }}
                      className="w-12 h-12 rounded-xl glass-morphism border-white/10 flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-400/50 transition-all"
                    >
                        <Icon className="w-5 h-5" />
                    </motion.a>
                 ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Notification - dismissible + mobile friendly */}
      <AnimatePresence>
        {showNotice && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[60] w-[calc(100vw-2rem)] sm:w-[320px] p-4 sm:p-5 glass-morphism rounded-2xl border-white/10 shadow-2xl flex gap-3 backdrop-blur-3xl"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
               <Bell className="text-blue-500 w-5 h-5 animate-swing" />
            </div>
            <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-white font-bold text-sm">Notice</h4>
                  <button onClick={() => setShowNotice(false)} className="text-white/50 hover:text-white transition-colors p-0.5 flex-shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-foreground/60 leading-snug">
                    Welcome to AI COMMUNITY! Explore our 2026 curriculum highlights.
                </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
