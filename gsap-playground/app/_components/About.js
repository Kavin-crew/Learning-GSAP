"use client";

import Image from "next/image";
import profile from "@/public/images/dummy-image.png";
import AnimatedHeading from "./AnimatedHeading";
import HorizontalScrollSections from "./HorizontalScrollSections";
import GSAPWordHighlightPreview from "./AnimatedWordsHighlight";

export default function About() {
  return (
    <section className="min-h-screen pt-20">
      <AnimatedHeading className="font-sans text-8xl font-bold uppercase text-[10dvw] leading-[0.9] tracking-[-15px] text-center">
        About Me
      </AnimatedHeading>

      <GSAPWordHighlightPreview />

      <HorizontalScrollSections
        panels={[
          {
            className: "bg-[#101010] text-theme-white",
            content: (
              <article id="about" className="px-8 flex relative z-0 py-35">
                {/* heading */}
                <div className="w-1/3  bg-[#c7c7c7] flex items-end overflow-hidden">
                  <h2 className="font-sans uppercase font-black text-[10dvw] leading-[0.7] tracking-[-10px] -ml-3 -mb-3.5 text-theme-black">
                    Po
                    <br />
                    rtf
                    <br />
                    olio
                  </h2>
                </div>

                {/* image area */}
                <div className="image-hero w-1/2  py-5 px-10 flex items-end bg-[#F1F1F1] relative overflow-hidden">
                  <Image src={profile} alt="Profile" />
                  <h2>
                    Front-end development focused on clarity, speed, and
                    business impact.
                  </h2>
                </div>
              </article>
            ),
          },
          {
            className: "bg-violet-900 text-white",
            content: (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-5xl font-bold">Our Work</h2>
              </div>
            ),
          },
          {
            className: "bg-emerald-800 text-white",
            content: (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-5xl font-bold">Contact</h2>
              </div>
            ),
          },
        ]}
      />
    </section>
  );
}
