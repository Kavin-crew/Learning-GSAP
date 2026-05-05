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
        ".top-grid div, bottom-grid div",
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
    <section id="about">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2>
              Where every detail matters <span className="text-white">-</span>
              from muddle to garnish
            </h2>
          </div>
          <div className="sub-content">
            <p>
              Every cocktail we serve is a reflection of our obsession with
              detail — from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>

            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">
                More than +12000 customers
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="top-grid">
        <div className="md:col-span-3">
          <Image
            src={aboutImage1}
            alt="close-up of a cocktail glass filled with a vibrant red drink, garnished with a fresh lime wedge and a sprig of mint, sitting on a rustic wooden bar counter"
          />
          <div className="noisy" />
        </div>

        <div className="md:col-span-6">
          <Image
            src={aboutImage2}
            alt="group of friends enjoying cocktails at the bar, smiling and clinking glasses together"
          />
          <div className="noisy" />
        </div>

        <div className="md:col-span-3">
          <Image
            src={aboutImage5}
            alt="bartender pouring a cocktail from a shaker into a glass, with a focused expression and precise technique"
          />
          <div className="noisy" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <Image
            src={aboutImage3}
            alt="overhead shot of a cocktail being garnished with a twist of citrus peel, showcasing the vibrant colors and textures of the drink"
          />
          <div className="noisy" />
        </div>
        <div className="md:col-span-4">
          <Image
            src={aboutImage4}
            alt="close-up of a cocktail glass filled with a bright green drink, garnished with a slice of cucumber and a sprig of dill, sitting on a sleek bar counter with a blurred background of bottles and glassware"
          />
          <div className="noisy" />
        </div>
      </div>
    </section>
  );
}
