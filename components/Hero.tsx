"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Rocket, Users, ChevronRight, Cpu } from "lucide-react";
import Brain3D from "./Brain3D";
import NeuralNetwork from "./NeuralNetwork";
import Background3D from "./Background3D";
import { fadeIn } from "@/lib/animations";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black z-0 pointer-events-none" />

      {/* 3D Brain centered in background */}
      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-70 pointer-events-none">
         <Brain3D />
      </div>

      <div className="container mx-auto px-6 z-20 relative flex flex-col items-center justify-center">
        <motion.div
          style={{ y: y1, opacity }}
          className="flex flex-col gap-10 text-center items-center w-full max-w-6xl mx-auto"
        >
          <motion.h1
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] font-space font-black leading-[1] tracking-tighter mix-blend-screen"
          >
            <span className="text-white drop-shadow-2xl">AI CLUB</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-primary drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">OFFICIAL PORTAL</span>
          </motion.h1>

          <motion.div
             variants={fadeIn("up", 0.5)}
             initial="hidden"
             animate="show"
             className="mt-8 flex flex-col items-center gap-3"
          >
             <span className="text-xl md:text-3xl text-white/80 font-medium tracking-wide">Department of</span>
             <span className="text-2xl md:text-4xl lg:text-5xl text-blue-300 font-bold drop-shadow-md">Artificial Intelligence & Data Science</span>
             <span className="text-sm md:text-xl text-white/50 tracking-[0.4em] font-bold mt-2">— NBKRIST —</span>
          </motion.div>

          <motion.p
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            className="text-xl md:text-3xl text-foreground/80 font-medium max-w-3xl leading-relaxed mt-4 drop-shadow-lg backdrop-blur-sm bg-black/10 rounded-3xl p-4"
          >
            Innovating the future with next-generation AI technologies. 
          </motion.p>

          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-8 justify-center mt-10 relative z-50 pointer-events-auto"
          >
            <button 
              onClick={() => {
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group px-12 py-5 bg-gradient-to-r from-blue-600 to-primary text-white font-black text-lg uppercase tracking-[0.2em] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.8)] border-2 border-white/20 transition-all hover:shadow-[0_0_50px_rgba(37,99,235,1)] hover:scale-105 active:scale-95 hover:border-white/50"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Department <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-20 pointer-events-none"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white">Scroll Down</span>
        <div className="w-[1px] h-12 bg-white/40" />
      </motion.div>
    </section>
  );
}
