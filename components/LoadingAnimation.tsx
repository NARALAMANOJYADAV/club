"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Cpu, Terminal, Shield, Zap } from "lucide-react";

export default function LoadingAnimation() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center gap-10 overflow-hidden"
        >
          {/* Animated Matrix-like background effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-infinite-scroll-down" />
             <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-secondary to-transparent animate-infinite-scroll-up" />
          </div>

          <div className="relative group">
             <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-40 h-40 rounded-full border-4 border-dashed border-primary/20 p-2"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-6 shadow-[0_0_50px_rgba(139,92,246,0.5)]"
                >
                   <Cpu className="text-white w-full h-full" />
                </motion.div>
             </div>
             
             {/* Rotating glow */}
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute -inset-10 border border-secondary/10 rounded-full animate-pulse" 
             />
          </div>

          <div className="flex flex-col items-center gap-4 w-64">
            <div className="flex justify-between w-full font-space text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50">
               <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-primary" />
                  <span>Initializing Neural Link</span>
               </div>
               <span>{progress}%</span>
            </div>
            
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)]" 
               />
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-4 opacity-30">
               <Shield className="w-4 h-4" />
               <Zap className="w-4 h-4" />
               <Cpu className="w-4 h-4" />
            </div>
          </div>
          
          <motion.p 
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[10px] font-space font-bold uppercase tracking-[0.5em] text-white/40 mt-10"
          >
             System Online • Neural Link Active
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
