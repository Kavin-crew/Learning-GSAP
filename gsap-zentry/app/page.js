import Hero from "@/app/_components/Hero";
import About from "@/app/_components/About";
import Navbar from "@/app/_components/Navbar";
import Features from "@/app/_components/Features";
import Story from "@/app/_components/Story";
import Contact from "@/app/_components/Contact";
import Footer from "@/app/_components/Footer";
import DummySections from "./_components/DummySections";
import HorizontalScrollGallery from "./_components/ui/Horizontalscrollgallery";
import SlidesPinning from "./_components/ui/SlidesPinning";

const rowOneImages = [
  {
    src: "https://assets.codepen.io/16327/portrait-image-1.jpg",
    alt: "Portrait 1",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-2.jpg",
    alt: "Portrait 2",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-3.jpg",
    alt: "Portrait 3",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-4.jpg",
    alt: "Portrait 4",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-5.jpg",
    alt: "Portrait 5",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-6.jpg",
    alt: "Portrait 6",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-7.jpg",
    alt: "Portrait 7",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-8.jpg",
    alt: "Portrait 8",
  },
];
const rowTwoImages = [
  {
    src: "https://assets.codepen.io/16327/portrait-image-1.jpg",
    alt: "Portrait 1",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-2.jpg",
    alt: "Portrait 2",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-3.jpg",
    alt: "Portrait 3",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-4.jpg",
    alt: "Portrait 4",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-5.jpg",
    alt: "Portrait 5",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-6.jpg",
    alt: "Portrait 6",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-7.jpg",
    alt: "Portrait 7",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-8.jpg",
    alt: "Portrait 8",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <SlidesPinning />
      <Contact direction="left" />
      {/* <HorizontalScrollGallery images={rowOneImages} direction="left" />
      <HorizontalScrollGallery images={rowTwoImages} direction="right" /> */}
      <HorizontalScrollGallery />
      <DummySections />
      <Footer />
    </main>
  );
}
