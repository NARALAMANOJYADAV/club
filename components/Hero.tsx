"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { fadeIn } from "@/lib/animations";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent pt-16 md:pt-10">
      <div className="container mx-auto px-6 z-20 relative flex flex-col items-center justify-center -mt-6 md:-mt-10">
        <motion.div
          style={{ y: y1, opacity }}
          className="flex flex-col gap-6 text-center items-center w-full max-w-6xl mx-auto"
        >
          <motion.h1
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-7xl md:text-8xl lg:text-[7rem] font-space font-black leading-[1.1] md:leading-[1] tracking-tighter mix-blend-screen"
          >
            <span className="text-white drop-shadow-2xl text-4xl sm:text-7xl md:text-8xl lg:text-[7rem]">AI COMMUNITY</span>
          </motion.h1>

          <motion.div
             variants={fadeIn("up", 0.5)}
             initial="hidden"
             animate="show"
              className="mt-4 flex flex-col items-center gap-2"
          >
             <span className="text-lg md:text-2xl text-white/80 font-medium tracking-wide">Department of</span>
             <span className="text-xl md:text-3xl lg:text-4xl text-blue-300 font-bold drop-shadow-md">Artificial Intelligence & Data Science</span>
             <span className="text-xs md:text-lg text-white/50 tracking-[0.4em] font-bold mt-1">— NBKRIST —</span>
          </motion.div>

          <motion.p
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            className="text-lg md:text-2xl text-foreground/70 font-medium max-w-2xl leading-relaxed mt-2"
          >
            Innovating the future with next-generation AI technologies. 
          </motion.p>

          <motion.div
            variants={fadeIn("up", 0.7)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-8 justify-center mt-8 relative z-50"
          >
            <button 
              onClick={() => {
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group px-10 py-4 bg-primary text-white font-black text-base uppercase tracking-[0.2em] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_50px_rgba(139,92,246,0.8)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Department <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-20 pointer-events-none"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">Scroll Down</span>
        <div className="w-[1px] h-10 bg-white/20" />
      </motion.div>
    </section>
  );
}
