import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import Cocktails from "@/app/_components/Cocktails";
import About from "@/app/_components/About";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
    </main>
  );
}
