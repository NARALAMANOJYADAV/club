"use client";

import { motion } from "framer-motion";
import { Cpu, Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Github, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "#" },
];

const quickLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Faculty", href: "/faculty" },
  { name: "HOD", href: "/#hod" },
  { name: "Coordinators", href: "/#coordinators" },
];

export default function Footer() {
  return (
    <footer id="contact" className="py-24 bg-transparent relative border-t border-white/5 overflow-hidden">
       {/* Background gradient */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none z-0" />

       <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-20 text-center md:text-left">
             {/* Brand Side */}
             <div className="flex flex-col gap-6 items-center md:items-start">
                 <Link href="/" className="flex items-center gap-2 group">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-2 shadow-lg shadow-primary/20"
                    >
                        <Cpu className="text-white w-full h-full" />
                    </motion.div>
                    <span className="text-2xl font-space font-bold tracking-tighter glow-text">
                        AI <span className="text-primary group-hover:text-white transition-colors">COMMUNITY</span>
                    </span>
                </Link>
                <p className="text-foreground/60 leading-relaxed text-sm max-w-xs">
                    "Innovating the Future with Artificial Intelligence." Fostering research and exploration in AI for next-gen leaders.
                </p>
                <div className="flex gap-4">
                    {socialLinks.map((social, idx) => (
                       <motion.a 
                         key={idx}
                         href={social.href}
                         whileHover={{ scale: 1.2, y: -5 }}
                         className="w-10 h-10 rounded-lg glass-morphism flex items-center justify-center border-white/5 hover:neon-border transition-all"
                       >
                          <social.icon className="w-5 h-5 text-foreground/80" />
                       </motion.a>
                    ))}
                </div>
             </div>

             {/* Quick Links */}
             <div className="flex flex-col gap-6">
                 <h4 className="text-lg font-bold font-space text-white uppercase tracking-wider underline-offset-8 decoration-primary decoration-4 underline decoration-thickness-2">Explore</h4>
                 <ul className="flex flex-col gap-4">
                    {quickLinks.map((link, idx) => (
                       <li key={idx}>
                          <Link href={link.href} className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group">
                             <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                             {link.name}
                          </Link>
                       </li>
                    ))}
                 </ul>
             </div>

             {/* Contact Info */}
             <div className="flex flex-col gap-6">
                 <h4 className="text-lg font-bold font-space text-white uppercase tracking-wider">Contact Us</h4>
                 <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4 text-sm font-medium text-foreground/60 hover:text-white transition-colors cursor-pointer justify-center md:justify-start">
                        <Mail className="w-5 h-5 text-secondary" />
                        clgevents7@gmail.com
                    </li>
                    <li className="flex items-center gap-4 text-sm font-medium text-foreground/60 hover:text-white transition-colors cursor-pointer justify-center md:justify-start">
                        <Phone className="w-5 h-5 text-secondary" />
                        8106905004
                    </li>
                    <li className="flex items-center gap-4 text-sm font-medium text-foreground/60 hover:text-white transition-colors cursor-pointer justify-center md:justify-start">
                        <MapPin className="w-5 h-5 text-secondary" />
                        nbkrist, Ai&DS block
                    </li>
                 </ul>
             </div>

             {/* Newsletter/CTA Side */}
             <div className="flex flex-col gap-6">
                 <h4 className="text-lg font-bold font-space text-white uppercase tracking-wider">Join Newsletter</h4>
                 <div className="flex flex-col gap-4">
                     <div className="relative group">
                        <input 
                           type="email" 
                           placeholder="Enter your email" 
                           className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:neon-border transition-all text-sm font-medium pr-12 text-white" 
                        />
                        <button className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-primary hover:bg-secondary transition-colors flex items-center justify-center p-1 shadow-lg shadow-primary/20">
                           <Mail className="w-4 h-4 text-white" />
                        </button>
                     </div>
                     <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/40 text-center md:text-left">No Spam. Just AI Updates.</p>
                 </div>
             </div>
          </div>

          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
             <p className="text-xs font-bold font-space uppercase tracking-widest text-foreground/60 opacity-50">
                © 2026 AI COMMUNITY DEPARTMENT • ALL RIGHTS RESERVED
             </p>
             <div className="flex gap-8">
                <span className="text-xs font-bold font-space uppercase tracking-widest text-foreground/60 opacity-50 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                <span className="text-xs font-bold font-space uppercase tracking-widest text-foreground/60 opacity-50 hover:text-white transition-colors cursor-pointer">Terms of Service</span>
             </div>
          </div>
       </div>
    </footer>
  );
}
