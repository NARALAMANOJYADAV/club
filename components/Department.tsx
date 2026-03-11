"use client";

import { motion } from "framer-motion";
import { Coffee, Rocket, Users, Target, Award, Eye } from "lucide-react";
import { departmentData } from "@/data/department";
import { fadeIn, staggerContainer } from "@/lib/animations";

const icons = {
  vision: Eye,
  mission: Target,
  achievements: Award,
};

export default function Department() {
  return (
    <section id="about" className="py-24 bg-transparent relative overflow-hidden">

      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-20 flex flex-col items-center gap-4"
        >
          <span className="text-secondary font-bold tracking-widest uppercase text-sm">Our Identity</span>
          <h2 className="text-4xl md:text-5xl font-space font-bold glow-text">About the Department</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-2" />
        </motion.div>

        <motion.div 
           variants={staggerContainer(0.2)}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Main Info Card */}
          <motion.div 
            variants={fadeIn("up", 0.3)}
            className="md:col-span-2 lg:col-span-1 glass-morphism p-10 rounded-3xl neon-border hover:shadow-primary/20 transition-all flex flex-col gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Rocket className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-space text-primary">At a Glance</h3>
            <p className="text-foreground/80 leading-relaxed text-lg">
              {departmentData.description}
            </p>
          </motion.div>

          {/* Vision & Mission Cards */}
          <motion.div 
            variants={fadeIn("up", 0.4)}
            className="glass-morphism p-10 rounded-3xl border-white/5 hover:neon-border transition-all flex flex-col gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <Eye className="text-secondary w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-space text-secondary">Our Vision</h3>
            <p className="text-foreground/70 leading-relaxed">
              {departmentData.vision}
            </p>
          </motion.div>

          <motion.div 
            variants={fadeIn("up", 0.5)}
            className="glass-morphism p-10 rounded-3xl border-white/5 hover:neon-border transition-all flex flex-col gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
              <Target className="text-accent w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-space text-accent">Our Mission</h3>
            <p className="text-foreground/70 leading-relaxed">
              {departmentData.mission}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
