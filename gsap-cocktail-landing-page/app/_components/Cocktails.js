"use client";

import leftLeaf from "@/public/images/cocktail-left-leaf.webp";
import rightLeaf from "@/public/images/cocktail-right-leaf.webp";
import Image from "next/image";
import { cocktailLists, mockTailLists } from "@/app/_constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Cocktails() {
  useGSAP(() => {
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });
    parallaxTimeline
      .from("#c-left-leaf", { x: -100, y: 100 })
      .from("#c-right-leaf", { x: 100, y: 100 });
  });
  return (
    <section
      id="cocktails"
      className="noisy relative min-h-dvh w-full overflow-hidden"
    >
      <Image
        src={leftLeaf}
        alt="green leaf falling down"
        id="c-left-leaf"
        className="pointer-events-none absolute left-0 md:bottom-0 md:top-auto -top-20 md:w-fit w-1/3"
      />
      <Image
        src={rightLeaf}
        alt="green leaf falling down"
        id="c-right-leaf"
        className="pointer-events-none absolute right-0 md:bottom-0 md:top-auto -top-20 md:w-fit w-1/3"
      />

      <div className="list container mx-auto relative z-10 flex md:flex-row flex-col justify-between items-start gap-20 pt-40 2xl:px-0 px-5">
        <div className="popular space-y-8 w-full md:w-fit">
          <h2 className="text-xl font-medium">Most popular cocktails:</h2>

          <ul className="space-y-8">
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name} className="flex justify-between items-start">
                <div className="md:me-28">
                  <h3 className="font-modern-negra 2xl:text-3xl text-xl text-yellow">
                    {name}
                  </h3>
                  <p className="text-sm">
                    {country} | {detail}
                  </p>
                </div>
                <span className="text-xl font-medium">- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8 w-full md:w-fit pb-20 md:pb-0">
          <h2 className="mb-8 text-xl font-medium">Most loved mocktails:</h2>

          <ul className="space-y-8">
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name} className="flex justify-between items-start">
                <div className="me-28">
                  <h3 className="font-modern-negra 2xl:text-3xl text-xl text-yellow">
                    {name}
                  </h3>
                  <p className="text-sm">
                    {country} | {detail}
                  </p>
                </div>
                <span className="text-xl font-medium">- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
