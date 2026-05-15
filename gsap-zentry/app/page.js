import Hero from "@/app/_components/Hero";
import About from "@/app/_components/About";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <About />
    </main>
  );
}
