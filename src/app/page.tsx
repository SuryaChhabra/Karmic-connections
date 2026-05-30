import StarField from "@/components/StarField";
import AmbientAudio from "@/components/AmbientAudio";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MemoryRoom from "@/components/MemoryRoom";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Begin from "@/components/Begin";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StarField />
      <AmbientAudio />
      <Navbar />
      <main id="top" className="relative">
        {/* Scene 1 — The Breath */}
        <Hero />
        {/* Scene 2 — Drifting on a cloud through the cosmos */}
        <About />
        {/* Scene 3 — The Room of Memories (the concepts + a session) */}
        <MemoryRoom />
        <Testimonials />
        <Faq />
        {/* Scene 4 — Return, grounded */}
        <Begin />
      </main>
      <Footer />
    </>
  );
}
