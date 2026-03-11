"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { timelineData } from "@/data/timeline";
import { fadeIn } from "@/lib/animations";
import { Calendar, Circle } from "lucide-react";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="timeline" className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 mb-16">
        <motion.div 
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center flex flex-col items-center gap-4"
        >
          <span className="text-accent font-bold tracking-widest uppercase text-sm">Department Journey</span>
          <h2 className="text-4xl md:text-5xl font-space font-bold glow-text">AI Excellence Timeline</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary rounded-full mt-2" />
        </motion.div>
      </div>

      {/* Horizontal Scroll Area */}
      <div 
        ref={containerRef}
        className="w-full relative px-10 md:px-20 overflow-x-auto scrollbar-hide pb-20"
      >
        <div className="flex gap-80 min-w-max items-center relative py-32">
          {/* Main timeline line */}
          <div className="absolute top-[50%] left-0 right-0 h-[2px] bg-white/10 z-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
          
          {timelineData.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative flex flex-col items-center group px-10"
            >
              {/* Node on the line */}
              <div 
                className="w-8 h-8 rounded-full bg-black border-4 border-accent relative z-10 group-hover:scale-125 group-hover:bg-accent transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.5)] flex items-center justify-center font-bold text-[10px]" 
              />

              {/* Content box - bottom (event) */}
              <div className="absolute top-12 w-80 p-8 glass-morphism rounded-[2rem] border-accent/20 group-hover:neon-border transition-all flex flex-col gap-4 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                 <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center p-2">
                        <Calendar className="text-accent w-full h-full" />
                    </div>
                    <span className="text-2xl font-space font-black text-accent/40 group-hover:text-accent transition-colors">{item.year}</span>
                 </div>
                 <p className="text-sm md:text-md font-bold leading-relaxed text-foreground/80">{item.event}</p>
                 <motion.div 
                   className="h-1 w-0 bg-accent rounded-full transition-all group-hover:w-full duration-500 shadow-[0_0_10px_rgba(244,63,94,1)]" 
                 />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Scroll Tip */}
      <div className="flex justify-center gap-2 opacity-30 mt-10">
         <span className="text-[10px] font-bold uppercase tracking-widest">Swipe or Scroll Horizontally</span>
      </div>
    </section>
  );
}
