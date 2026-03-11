"use client";

import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Hash, BookOpen } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Register() {
  return (
    <main className="min-h-screen bg-[#030014] text-white selection:bg-primary/30 relative flex flex-col">
       <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-black to-accent/10 pointer-events-none" />
       
       <Navbar />

       <div className="flex-1 flex items-center justify-center p-6 mt-20 z-10">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-full max-w-xl glass-morphism p-10 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.15)] relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
             
             <div className="mb-10">
                <Link href="/" className="inline-flex items-center gap-2 text-foreground/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider mb-6">
                   <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-space font-black glow-text mb-2">Join AI CLUB</h1>
                <p className="text-foreground/60 text-lg">Ignite your journey into artificial intelligence.</p>
             </div>

             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">Full Name</label>
                   <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <User className="w-5 h-5 text-foreground/40" />
                      </div>
                      <input 
                         type="text" 
                         className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                         placeholder="John Doe"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">Roll Number</label>
                      <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Hash className="w-5 h-5 text-foreground/40" />
                         </div>
                         <input 
                            type="text" 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                            placeholder="22ABCD1234"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">Department</label>
                      <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <BookOpen className="w-5 h-5 text-foreground/40" />
                         </div>
                         <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium appearance-none">
                            <option value="cs" className="bg-black">Computer Science</option>
                            <option value="ai" className="bg-black">AI & DS</option>
                            <option value="it" className="bg-black">Information Tech</option>
                            <option value="other" className="bg-black">Other</option>
                         </select>
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-secondary ml-1">Email Address</label>
                   <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <Mail className="w-5 h-5 text-foreground/40" />
                      </div>
                      <input 
                         type="email" 
                         className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                         placeholder="john@example.com"
                      />
                   </div>
                </div>

                <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow flex items-center justify-center gap-2 group"
                >
                   Initiate Registration
                   <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin hidden group-active:block" />
                </motion.button>
             </form>
          </motion.div>
       </div>
    </main>
  );
}
