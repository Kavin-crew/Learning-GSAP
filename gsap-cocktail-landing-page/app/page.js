import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import Cocktails from "@/app/_components/Cocktails";
import About from "@/app/_components/About";
import Art from "@/app/_components/Art";
import Menu from "@/app/_components/Menu";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
      <Art />
      <Menu />
    </main>
  );
}
