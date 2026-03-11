"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Award, Target, Users } from "lucide-react";
import Image from "next/image";
import { fadeIn } from "@/lib/animations";

export default function Counselor() {
  return (
    <section id="counselor" className="py-24 bg-black relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col items-center gap-4"
        >
          <h2 className="text-4xl md:text-6xl font-space font-black text-white glow-text">
            Faculty Coordinator
          </h2>
          <div className="w-24 h-1.5 bg-secondary rounded-full" />
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
                src="/mekala_sivaprathap.jpg" 
                alt="Mekala Sivaprathap Reddy" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-8 left-8">
                <div className="px-6 py-2 bg-secondary rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                    COORDINATOR
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-10 md:p-16 flex flex-col justify-center gap-8 bg-black/40 backdrop-blur-3xl">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-space font-black text-white">
                      Mekala Sivaprathap Reddy
                  </h3>
                  <p className="text-secondary font-bold tracking-widest uppercase text-sm">
                      Counselor & Faculty Coordinator, AI CLUB
                  </p>
                </div>
                
                <p className="text-foreground/70 text-lg leading-relaxed">
                   Dedicated to mentoring students and fostering an environment where innovation meets practical AI application. Under his guidance, the AI CLUB aims to bridge the gap between academic theory and industry reality.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                 {[
                   { icon: Target, label: "Mentorship" },
                   { icon: Users, label: "Leadership" },
                   { icon: Award, label: "Innovation" }
                 ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group">
                       <div className="w-12 h-12 rounded-xl glass-morphism border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                          <item.icon className="w-6 h-6" />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{item.label}</span>
                    </div>
                 ))}
              </div>

              <div className="flex items-center gap-6">
                 {[Linkedin, Twitter, Mail].map((Icon, i) => (
                    <motion.a 
                      key={i}
                      href="#" 
                      whileHover={{ scale: 1.2, y: -2 }}
                      className="w-12 h-12 rounded-xl glass-morphism border-white/10 flex items-center justify-center text-white hover:text-secondary hover:border-secondary/50 transition-all"
                    >
                        <Icon className="w-5 h-5" />
                    </motion.a>
                 ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
