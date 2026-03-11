"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Department from "@/components/Department";
import HOD from "@/components/HOD";
import Counselor from "@/components/Counselor";
import Coordinators from "@/components/Coordinators";
import Footer from "@/components/Footer";
import LoadingAnimation from "@/components/LoadingAnimation";
import AdminPanel from "@/components/AdminPanel";
import Background3D from "@/components/Background3D";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-transparent selection:bg-primary/30">
      <Background3D />
      <LoadingAnimation />
      
      {/* Custom Cursor Glow */}
      <motion.div 
         animate={{ x: cursorPos.x - 200, y: cursorPos.y - 200 }}
         transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
         className="fixed inset-0 pointer-events-none z-[100] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px]"
      />

      <Navbar />
      
      <div className="flex flex-col">
          <Hero />
          
          <div className="relative">
             {/* Section reveal animations happen inside components via Framer Motion's whileInView */}
             <Department />
             <HOD />
             <Counselor />
             <Coordinators />
             
             {/* Simple Admin Toggle For Demo Purpose */}
             <div className="py-10 flex justify-center bg-transparent">
                <button 
                   onClick={() => setIsAdmin(!isAdmin)}
                   className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/20 hover:text-primary transition-all p-4 border border-white/5 rounded-full hover:neon-border group"
                >
                   {isAdmin ? "Deactivate Command Control" : "Enter Secure Admin Protocol"}
                   <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-700 mt-2" />
                </button>
             </div>
             
             {isAdmin && <AdminPanel />}
          </div>
          
          <Footer />
      </div>

      {/* High-level Typography & Page effects inside sections */}
    </main>
  );
}
