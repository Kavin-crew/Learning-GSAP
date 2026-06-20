import About from "@/app/_components/About";
import Hero from "@/app/_components/Hero";
import Awards from "@/app/_components/Awards";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <About />
      <Awards />
    </main>
  );
}
