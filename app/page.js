import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import CertificateSection from "./components/CertificateSection"; 
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";


// Main Page 

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <Navbar />
      
      {/* Intro */}
      <HomeSection />
      <AboutSection />
      
      {/* Expertise */}
      <SkillsSection />
      
      {/* Showcasing Works */}
      <ProjectsSection />
      
      {/* Proof of Expertise (Sertifikat PDF) */}
      <CertificateSection /> 
      
      {/* Conversion & Closing */}
      <ContactSection />
      <Footer/>
    </main>
  );
}