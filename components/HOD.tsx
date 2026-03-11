"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Bell, X } from "lucide-react";
import Image from "next/image";
import { fadeIn } from "@/lib/animations";

export default function HOD() {
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
            <div className="relative h-[500px] md:h-auto overflow-hidden group">
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
            <div className="p-10 md:p-16 flex flex-col justify-center gap-8 bg-white/[0.02]">
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

      {/* Floating Notification (as seen in image) */}
      <motion.div 
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed bottom-8 right-8 z-[60] w-[350px] p-6 glass-morphism rounded-2xl border-white/10 shadow-3xl flex gap-4 backdrop-blur-3xl group"
      >
        <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
           <Bell className="text-blue-500 w-6 h-6 animate-swing" />
        </div>
        <div className="flex-grow">
            <h4 className="text-white font-bold text-sm mb-1 flex justify-between">
                Notice
                <X className="w-4 h-4 cursor-pointer opacity-50 hover:opacity-100" />
            </h4>
            <p className="text-xs text-foreground/60 leading-tight">
                Welcome to AI & DS Portal! Explore our new 2026 curriculum highlights.
            </p>
        </div>
      </motion.div>
    </section>
  );
}
