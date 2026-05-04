import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <div className="flex-center h-screen">
      <h1 className="text-2xl text-stone-800">Hello, GSAP!</h1>
    </div>
  );
}
