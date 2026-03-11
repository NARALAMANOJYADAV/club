"use client";

import Navbar from "@/components/Navbar";
import Faculty from "@/components/Faculty";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";

export default function FacultyPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-primary/30 flex flex-col pt-10">
      <Background3D />
      <Navbar />
      <div className="flex-1 mt-10">
         <Faculty />
      </div>
      <Footer />
    </main>
  );
}
