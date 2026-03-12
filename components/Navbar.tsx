"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Brain, Menu, X, Sun, Moon, ChevronDown, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { 
    name: "Faculty", 
    href: "/faculty",
    isDropdown: true,
    subItems: [
      { name: "HOD", href: "/#hod" },
      { name: "Counselor", href: "/#counselor" },
      { name: "Faculty List", href: "/faculty" }
    ]
  },
  { name: "Coordinators", href: "/#coordinators" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("light");
  };

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/", "");
      const target = document.querySelector(targetId);
      if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled ? "py-2 glass-morphism border-white/10" : "py-6 border-transparent bg-transparent"
      )}>
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-[60]"
          style={{ scaleX }}
        />
        
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-2 shadow-lg shadow-primary/20"
            >
              <Brain className="text-white w-full h-full" />
            </motion.div>
            <span className="text-xl font-space font-bold tracking-tighter glow-text">
              AI <span className="text-primary group-hover:text-white transition-colors">COMMUNITY</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
                {item.isDropdown ? (
                  <button 
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-white transition-colors py-4"
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-12 left-0 w-48 glass-morphism border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col py-2 z-50 bg-black/80 backdrop-blur-3xl"
                        >
                          {item.subItems?.map((subItem) => (
                            <Link 
                              key={subItem.name} 
                              href={subItem.href}
                              onClick={(e) => handleScrollTo(e, subItem.href)}
                              className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors block text-left w-full"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ) : (
                  <Link 
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="text-sm font-medium text-foreground/70 hover:text-white transition-colors relative group py-4 block"
                  >
                    {item.name}
                    <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}
              </div>
            ))}
            
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-sm font-bold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105"
            >
              Register
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full glass-morphism hover:neon-border transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-800" />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2 rounded-full glass-morphism">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-800" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-morphism border-b border-white/10 overflow-hidden bg-black/90 backdrop-blur-3xl"
            >
              <div className="flex flex-col px-6 py-8 gap-6 max-h-[80vh] overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    {item.isDropdown ? (
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-primary uppercase tracking-widest">{item.name}</span>
                        <div className="flex flex-col pl-4 border-l-2 border-white/10 gap-3 mt-2">
                           {item.subItems?.map((subItem) => (
                             <Link 
                               key={subItem.name}
                               href={subItem.href}
                               onClick={(e) => handleScrollTo(e, subItem.href)}
                               className="text-lg font-medium hover:text-white text-foreground/70 transition-colors"
                             >
                               {subItem.name}
                             </Link>
                           ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href={item.href}
                        onClick={(e) => handleScrollTo(e, item.href)}
                        className="text-lg font-medium hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                <button 
                    onClick={() => {
                        setIsOpen(false);
                        setShowRegisterModal(true);
                    }}
                    className="mt-4 px-8 py-4 w-full rounded-2xl bg-gradient-to-r from-primary to-secondary text-lg font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Register
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Registration Pre-requisite Modal */}
      <AnimatePresence>
        {showRegisterModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.2)] rounded-3xl overflow-hidden relative"
            >
               {/* Accent Line */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
               
               <button 
                 onClick={() => setShowRegisterModal(false)}
                 className="absolute top-6 right-6 text-foreground/50 hover:text-white hover:rotate-90 transition-all p-2 rounded-full glass-morphism"
               >
                 <X className="w-5 h-5" />
               </button>

               <div className="p-8 md:p-10 space-y-8">
                 <div className="space-y-2">
                   <h2 className="text-3xl font-space font-black text-white glow-text">Important Instructions</h2>
                   <p className="text-secondary font-bold tracking-widest uppercase text-xs">Read Before Registration</p>
                 </div>
                 
                 <div className="space-y-6 text-foreground/80">
                   <p className="text-sm border-l-2 border-primary pl-4 text-white">
                      Welcome to the AI COMMUNITY onboarding! Becoming a part of this organization requires extreme dedication, discipline, and consistent effort. Please read the primary mandates below:
                   </p>

                   <ul className="space-y-4">
                     <li className="flex gap-4 items-start">
                        <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block mb-1">Strict Probation & Evaluation</strong>
                          <span className="text-sm leading-relaxed block">Every single day, there will be evaluation and day-to-day workout analysis. Participants who fail to submit required assignments or do not work actively will be instantly disqualified from the club.</span>
                        </div>
                     </li>
                     <li className="flex gap-4 items-start">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block mb-1">Commitment to Growth</strong>
                          <span className="text-sm leading-relaxed block">You are expected to participate in all club tech sessions, hackathons, and seminars. Missing consecutive events without valid authorization results in club eviction.</span>
                        </div>
                     </li>
                   </ul>
                   
                   <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                      <p className="text-xs text-red-200 uppercase tracking-widest font-bold ml-3">Agreements are strictly monitored. Code violations have permanent consequences.</p>
                   </div>
                 </div>

                 <div className="pt-4 flex flex-col md:flex-row gap-4">
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSegKLO6W3M4P6AY-q6bLn1fTRfCp-gnigjxYZGTm5OqRkxAeA/viewform?usp=publish-editor"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowRegisterModal(false)}
                      className="flex-1 py-4 text-center rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02]"
                    >
                       I Agree, Proceed to Form
                    </a>
                    <button 
                      onClick={() => setShowRegisterModal(false)}
                      className="py-4 px-8 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
