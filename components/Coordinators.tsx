"use client";

import { motion } from "framer-motion";
import { User, Layers, Sparkles, MessageSquare } from "lucide-react";
import { coordinatorsData } from "@/data/coordinators";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function Coordinators() {
  return (
    <section id="coordinators" className="py-24 bg-black relative">
       {/* Background lights */}
       <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none z-0" />

       <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center flex flex-col items-center gap-4 mb-20"
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Student Coordinators</span>
            <h2 className="text-4xl md:text-5xl font-space font-bold glow-text">Meet Our Leaders</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-2" />
          </motion.div>

          <motion.div 
             variants={staggerContainer(0.2)}
             initial="hidden"
             whileInView="show"
             viewport={{ once: true }}
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
             {coordinatorsData.map((coordinator, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeIn("up", 0.3)}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                   {/* Gradient Border Frame */}
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 group-hover:opacity-100 rounded-[2rem] blur-[2px] group-hover:blur-[8px] transition-all duration-700 pointer-events-none" />
                   
                   {/* Card Content */}
                    <div className="relative glass-morphism p-8 rounded-[2rem] border border-white/5 transition-all overflow-hidden bg-black/40 backdrop-blur-3xl h-full flex flex-col items-center text-center gap-6">
                       {/* Avatar Area */}
                       <div className="w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-primary via-secondary to-accent p-[2px] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all overflow-hidden">
                          <div className="w-full h-full rounded-[1.4rem] bg-black flex items-center justify-center font-space font-black text-2xl text-white overflow-hidden">
                             {coordinator.photo ? (
                                <img src={coordinator.photo} alt={coordinator.name} className="w-full h-full object-cover" />
                             ) : (
                                coordinator.avatar
                             )}
                          </div>
                       </div>

                      <div className="space-y-2">
                         <h3 className="text-xl font-bold font-space uppercase tracking-tight text-white">{coordinator.name}</h3>
                         <p className="text-sm font-medium text-secondary/80 lowercase italic">@{coordinator.role.replace(" ", "")}</p>
                      </div>

                      <div className="flex gap-4 items-center">
                         <div className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <Layers className="w-4 h-4 text-primary" />
                         </div>
                         <div className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <Sparkles className="w-4 h-4 text-secondary" />
                         </div>
                         <div className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <MessageSquare className="w-4 h-4 text-accent" />
                         </div>
                      </div>
                      
                      {/* Animated light effect inside */}
                      <motion.div 
                        animate={{ 
                          x: ["-100%", "200%"],
                          y: ["-100%", "200%"],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute w-20 h-20 bg-white/10 blur-[50px] pointer-events-none"
                      />
                   </div>
                </motion.div>
             ))}
          </motion.div>
       </div>
    </section>
  );
}
