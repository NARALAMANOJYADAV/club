"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, BookOpen, Search, User } from "lucide-react";
import { FacultyMember } from "@/data/faculty";

interface FacultyModalProps {
  faculty: FacultyMember | null;
  onClose: () => void;
}

export default function FacultyModal({ faculty, onClose }: FacultyModalProps) {
  if (!faculty) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl glass-morphism rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden z-10"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-foreground transition-all z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 p-10">
            {/* Left: Image Side */}
            <div className="md:col-span-2 flex flex-col gap-6">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden glass-morphism relative group">
                   {faculty.photo ? (
                     <motion.img 
                      layoutId={`faculty-img-${faculty.id}`}
                      src={faculty.photo} 
                      alt={faculty.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
                    />
                   ) : (
                     <motion.div 
                        layoutId={`faculty-img-${faculty.id}`}
                        className="w-full h-full bg-[#1e2330] flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                      >
                         <User className="w-24 h-24 text-blue-500" />
                     </motion.div>
                   )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <Mail className="text-secondary w-5 h-5 shrink-0" />
                      <span className="text-sm font-medium opacity-80">{faculty.email}</span>
                   </div>
                   <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <BookOpen className="text-primary w-5 h-5 shrink-0" />
                      <span className="text-sm font-medium opacity-80">{faculty.qualification}</span>
                   </div>
                </div>
            </div>

            {/* Right: Info Side */}
            <div className="md:col-span-3 flex flex-col gap-8">
               <div className="flex flex-col gap-2">
                   <h2 className="text-4xl font-space font-bold glow-text leading-tight">{faculty.name}</h2>
                   <p className="text-xl font-medium text-secondary">{faculty.designation}</p>
                   <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase mt-2">{faculty.specialization}</p>
               </div>

               <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                     <div className="flex items-center gap-2">
                        <Search className="text-primary w-5 h-5" />
                        <h3 className="text-lg font-bold font-space uppercase tracking-wider text-white">Research Interests</h3>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {faculty.researchInterests.map((interest, idx) => (
                          <span key={idx} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
                             {interest}
                          </span>
                        ))}
                     </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10 flex flex-col gap-3">
                     <div className="flex items-center gap-2">
                        <User className="text-secondary w-5 h-5" />
                        <h3 className="text-lg font-bold font-space text-secondary">Biography & Goals</h3>
                     </div>
                     <p className="text-sm text-foreground/70 leading-relaxed italic">
                        Leading the department through innovative research approaches and academic excellence. Focused on pushing the boundaries of AI in both theoretical and practical applications.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
