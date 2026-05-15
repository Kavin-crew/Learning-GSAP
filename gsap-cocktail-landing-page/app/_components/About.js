"use client";

import aboutImage1 from "@/public/images/abt1.webp";
import aboutImage2 from "@/public/images/abt2.webp";
import aboutImage3 from "@/public/images/abt3.webp";
import aboutImage4 from "@/public/images/abt4.webp";
import aboutImage5 from "@/public/images/abt5.webp";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  useGSAP(() => {
    const titleSplit = SplitText.create("#about h2", { type: "words" });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    scrollTimeline
      .from("#about .badge", {
        opacity: 0,
        duration: 0.5,
        yPercent: 100,
        ease: "expo.out",
      })
      .from(titleSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.02,
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.04,
        },
        "-=0.5",
      );
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen py-13 md:py-28 2xl:px-0 container w-full max-w-full"
    >
      <div className="container mx-auto px-5">
        <div className="mb-16">
          <div className="content grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="md:col-span-8">
              <p className="badge">Best Cocktails</p>
              <h2 className="text-5xl md:text-6xl font-modern-negra max-w-lg">
                Where every detail matters <span className="text-white">-</span>
                from muddle to garnish
              </h2>
            </div>
            <div className="sub-content md:col-span-4 space-y-5 flex flex-col justify-between">
              <p className="text-lg">
                Every cocktail we serve is a reflection of our obsession with
                detail — from the first muddle to the final garnish. That care
                is what turns a simple drink into something truly memorable.
              </p>

              <div className="flex flex-col justify-between md:gap-2 gap-5">
                <p className="md:text-3xl text-xl font-bold">
                  <span className="text-yellow font-bold text-5xl">4.5</span>/5
                </p>
                <p className="text-sm text-white-100">
                  More than +12000 customers
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="top-grid grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
          <div className="sm:col-span-4 lg:col-span-3 rounded-3xl overflow-hidden h-72 relative">
            <Image
              src={aboutImage1}
              alt="close-up of a cocktail glass filled with a vibrant red drink, garnished with a fresh lime wedge and a sprig of mint, sitting on a rustic wooden bar counter"
              className="object-cover w-full h-full"
            />
            <div className="noisy" />
          </div>

          <div className="sm:col-span-4 lg:col-span-6 rounded-3xl overflow-hidden h-72 relative">
            <Image
              src={aboutImage2}
              alt="group of friends enjoying cocktails at the bar, smiling and clinking glasses together"
              className="object-cover w-full h-full"
            />
            <div className="noisy" />
          </div>

          <div className="sm:col-span-4 lg:col-span-3 rounded-3xl overflow-hidden h-72 relative">
            <Image
              src={aboutImage5}
              alt="bartender pouring a cocktail from a shaker into a glass, with a focused expression and precise technique"
              className="object-cover w-full h-full"
            />
            <div className="noisy" />
          </div>
        </div>

        <div className="bottom-grid grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-8  rounded-3xl overflow-hidden h-72 relative">
            <Image
              src={aboutImage3}
              alt="overhead shot of a cocktail being garnished with a twist of citrus peel, showcasing the vibrant colors and textures of the drink"
              className="object-cover w-full h-full"
            />
            <div className="noisy" />
          </div>
          <div className="md:col-span-4 rounded-3xl overflow-hidden h-72 relative">
            <Image
              src={aboutImage4}
              alt="close-up of a cocktail glass filled with a bright green drink, garnished with a slice of cucumber and a sprig of dill, sitting on a sleek bar counter with a blurred background of bottles and glassware"
              className="object-cover w-full h-full"
            />
            <div className="noisy" />
          </div>
        </div>
      </div>
    </section>
  );
}
