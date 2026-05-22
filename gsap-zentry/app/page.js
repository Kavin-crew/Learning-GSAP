import Hero from "@/app/_components/Hero";
import About from "@/app/_components/About";
import Navbar from "@/app/_components/Navbar";
import Features from "@/app/_components/Features";
import Story from "@/app/_components/Story";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
    </main>
  );
}
