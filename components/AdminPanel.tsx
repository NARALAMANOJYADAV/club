"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, Save, UserPlus, Mail, GraduationCap, BadgeCheck, Search, Image as ImageIcon } from "lucide-react";
import { facultyData, FacultyMember } from "@/data/faculty";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function AdminPanel() {
  const [faculty, setFaculty] = useState<FacultyMember[]>(facultyData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    designation: "",
    qualification: "",
    specialization: "",
    email: "",
    researchInterests: "",
    photo: ""
  });

  const handleOpenModal = (f?: FacultyMember) => {
    if (f) {
      setEditingFaculty(f);
      setFormData({
        id: f.id,
        name: f.name,
        designation: f.designation,
        qualification: f.qualification,
        specialization: f.specialization,
        email: f.email,
        researchInterests: f.researchInterests.join(", "),
        photo: f.photo
      });
    } else {
      setEditingFaculty(null);
      setFormData({
        id: `f${faculty.length + 1}`,
        name: "",
        designation: "",
        qualification: "",
        specialization: "",
        email: "",
        researchInterests: "",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=388&auto=format&fit=crop"
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newFaculty = {
      ...formData,
      researchInterests: formData.researchInterests.split(",").map(i => i.trim()).filter(i => i !== "")
    };

    if (editingFaculty) {
      setFaculty(faculty.map(f => f.id === editingFaculty.id ? newFaculty : f));
    } else {
      setFaculty([...faculty, newFaculty]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this faculty member?")) {
        setFaculty(faculty.filter(f => f.id !== id));
    }
  };

  return (
    <section id="admin" className="py-24 bg-black min-h-screen relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

       <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16"
          >
            <div className="text-center md:text-left">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Control Center</span>
                <h2 className="text-4xl md:text-5xl font-space font-bold glow-text">Admin Panel</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-2 mx-auto md:mx-0" />
            </div>
            <button 
                onClick={() => handleOpenModal()}
                className="group relative px-6 py-4 bg-primary text-white font-bold rounded-2xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
            >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Add Member
            </button>
          </motion.div>

          {/* Records Table */}
          <motion.div 
             variants={fadeIn("up", 0.3)}
             initial="hidden"
             whileInView="show"
             className="glass-morphism rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl"
          >
             <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                   <thead>
                      <tr className="bg-white/5 border-b border-white/10 uppercase tracking-widest font-space text-[10px] text-foreground/40 font-black">
                         <th className="px-8 py-6">Member Information</th>
                         <th className="px-8 py-6">Status & Research</th>
                         <th className="px-8 py-6">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {faculty.map((member) => (
                        <motion.tr 
                          key={member.id} 
                          className="hover:bg-white/5 transition-colors group"
                        >
                           <td className="px-8 py-10">
                              <div className="flex items-center gap-6">
                                 <div className="w-16 h-16 rounded-2xl overflow-hidden glass-morphism border border-white/10 shrink-0">
                                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                 </div>
                                 <div className="flex flex-col gap-1">
                                    <h4 className="text-lg font-bold font-space text-white group-hover:text-primary transition-colors">{member.name}</h4>
                                    <p className="text-sm font-medium text-secondary">{member.designation}</p>
                                    <div className="flex items-center gap-2 text-xs font-bold font-mono opacity-30 mt-1 uppercase">
                                       <Mail className="w-3 h-3" />
                                       {member.email}
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-10">
                              <div className="flex flex-col gap-4">
                                 <div className="flex items-center gap-2 text-xs font-bold opacity-60 uppercase tracking-widest">
                                    <BadgeCheck className="w-4 h-4 text-primary" />
                                    {member.specialization}
                                 </div>
                                 <div className="flex flex-wrap gap-2">
                                    {member.researchInterests.slice(0, 3).map((interest, idx) => (
                                       <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-wider text-foreground/40">
                                          {interest}
                                       </span>
                                    ))}
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-10 whitespace-nowrap">
                              <div className="flex items-center gap-4">
                                 <button 
                                   onClick={() => handleOpenModal(member)}
                                   className="p-3 rounded-xl bg-secondary/10 border border-secondary/20 hover:bg-secondary/30 text-secondary transition-all"
                                 >
                                    <Edit2 className="w-4 h-4" />
                                 </button>
                                 <button 
                                   onClick={() => handleDelete(member.id)}
                                   className="p-3 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/30 text-accent transition-all"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>
                           </td>
                        </motion.tr>
                      ))}
                   </tbody>
                </table>
             </div>
             {faculty.length === 0 && (
                <div className="py-20 flex flex-col items-center gap-6 opacity-30">
                   <UserPlus className="w-16 h-16" />
                   <p className="text-lg font-space font-bold uppercase tracking-widest">No faculty data detected.</p>
                </div>
             )}
          </motion.div>
       </div>

       {/* Editor Modal */}
       <AnimatePresence>
          {isModalOpen && (
             <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                 <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
                 />
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-3xl glass-morphism rounded-[2.5rem] border border-white/10 p-10 shadow-2xl overflow-hidden"
                 >
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-3xl font-space font-bold glow-text leading-tight uppercase tracking-tight">
                           {editingFaculty ? "Edit Member Details" : "Register New Faculty"}
                        </h3>
                        <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Profile Image Preview */}
                        <div className="flex flex-col gap-6">
                            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden glass-morphism border border-white/10 relative p-2 group">
                                <img src={formData.photo} alt="preview" className="w-full h-full object-cover rounded-[1.8rem]" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ImageIcon className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-4">Profile Photo URL</label>
                                <input 
                                   type="text" 
                                   value={formData.photo} 
                                   onChange={(e) => setFormData({...formData, photo: e.target.value})}
                                   placeholder="https://..." 
                                   className="h-12 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:neon-border transition-all text-sm font-medium" 
                                />
                            </div>
                        </div>

                        {/* Form Inputs */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-4">Full Legal Name</label>
                                <input 
                                   type="text" 
                                   placeholder="Dr. John Doe"
                                   value={formData.name} 
                                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                                   className="h-12 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:neon-border transition-all text-sm font-medium" 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-4">Designation</label>
                                <input 
                                   type="text" 
                                   placeholder="Professor"
                                   value={formData.designation} 
                                   onChange={(e) => setFormData({...formData, designation: e.target.value})}
                                   className="h-12 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:neon-border transition-all text-sm font-medium" 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-4">Email Channel</label>
                                <input 
                                   type="email" 
                                   placeholder="john.doe@college.edu"
                                   value={formData.email} 
                                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                                   className="h-12 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:neon-border transition-all text-sm font-medium" 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-4">Academic Specialization</label>
                                <input 
                                   type="text" 
                                   placeholder="Deep Learning"
                                   value={formData.specialization} 
                                   onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                                   className="h-12 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:neon-border transition-all text-sm font-medium" 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-4">Research Nodes (Comma separated)</label>
                                <textarea 
                                   placeholder="AI, Robotics, NLP..."
                                   value={formData.researchInterests} 
                                   onChange={(e) => setFormData({...formData, researchInterests: e.target.value})}
                                   className="h-24 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:neon-border transition-all text-sm font-medium resize-none" 
                                />
                            </div>

                            <button 
                                onClick={handleSave}
                                className="h-16 mt-4 bg-primary text-white font-black text-xs uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02]"
                            >
                                <Save className="w-5 h-5" />
                                Initiate Protocol
                            </button>
                        </div>
                    </div>
                 </motion.div>
             </div>
          )}
       </AnimatePresence>
    </section>
  );
}
