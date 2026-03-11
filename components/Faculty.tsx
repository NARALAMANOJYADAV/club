"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { User, BadgeCheck, GraduationCap, ArrowUpRight } from "lucide-react";
import { facultyData, FacultyMember } from "@/data/faculty";
import { fadeIn, staggerContainer } from "@/lib/animations";
import FacultyModal from "./FacultyModal";

export default function Faculty() {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  return (
    <section id="faculty" className="py-24 bg-black relative">
       {/* Background accent */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />

       <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-20 flex flex-col items-center gap-4"
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Academic Leadership</span>
            <h2 className="text-4xl md:text-5xl font-space font-bold glow-text">Faculty Members</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-secondary to-primary rounded-full mt-2" />
          </motion.div>

          <motion.div 
             variants={staggerContainer(0.2, 0.4)}
             initial="hidden"
             whileInView="show"
             viewport={{ once: true }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
             {facultyData.map((faculty) => (
                <motion.div 
                  key={faculty.id}
                  variants={fadeIn("up", 0.3)}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedFaculty(faculty)}
                  className="group cursor-pointer"
                >
                   <div className="relative glass-morphism rounded-[2.5rem] p-4 border border-white/5 transition-all duration-500 overflow-hidden hover:neon-border hover:shadow-primary/10">
                      {/* Image Area */}
                      <div className="aspect-square rounded-[2rem] overflow-hidden relative mb-6">
                         {faculty.photo ? (
                           <motion.img 
                             layoutId={`faculty-img-${faculty.id}`}
                             src={faculty.photo} 
                             alt={faculty.name} 
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                           />
                         ) : (
                           <motion.div 
                             layoutId={`faculty-img-${faculty.id}`}
                             className="w-full h-full bg-[#1e2330] flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
                           >
                              <User className="w-16 h-16 text-blue-500" />
                           </motion.div>
                         )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-8">
                            <span className="flex items-center gap-2 text-white font-bold bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30">
                               View Profile <ArrowUpRight className="w-4 h-4" />
                            </span>
                         </div>
                      </div>

                      {/* Info Area */}
                      <div className="px-4 pb-6 space-y-3">
                         <div className="flex flex-col gap-1">
                            <h3 className="text-2xl font-bold font-space text-white group-hover:text-primary transition-colors">{faculty.name}</h3>
                            <p className="text-sm font-medium text-secondary">{faculty.designation}</p>
                         </div>
                         
                         <div className="flex flex-col gap-2 pt-2">
                             <div className="flex items-center gap-2 text-foreground/60 text-xs">
                                <GraduationCap className="w-4 h-4 text-primary" />
                                <span className="line-clamp-1">{faculty.qualification}</span>
                             </div>
                             <div className="flex items-center gap-2 text-foreground/60 text-xs">
                                <BadgeCheck className="w-4 h-4 text-secondary" />
                                <span className="line-clamp-1">{faculty.specialization}</span>
                             </div>
                         </div>
                      </div>

                      {/* Decoration lines */}
                      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 scale-0 group-hover:scale-150 transition-all duration-700 pointer-events-none">
                         <User className="w-20 h-20 text-primary" />
                      </div>
                   </div>
                </motion.div>
             ))}
          </motion.div>
       </div>

       {/* Modal Integration */}
       <FacultyModal faculty={selectedFaculty} onClose={() => setSelectedFaculty(null)} />
    </section>
  );
}
