"use client";

import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";
import HorizontalScrollSections from "./HorizontalScrollSections";
import GSAPWordHighlightPreview, {
  WordHighlightParagraphs,
} from "./AnimatedWordsHighlight";
import profileImg from "@/public/images/kavin-1.png";
import profile from "@/public/images/kavin-2.png";
import desktopImage from "@/public/images/desktop.gif";

const paragraphs = [
  `<green>Value</green> Today, development plays a key role in how users experience a product. I focus on building interfaces that are intuitive, reliable, and impactful—helping businesses connect with users, stand out, and drive real results.`,

  `<green>Approach</green> I value quality over quantity—every detail matters. I take time to understand the problem and focus on what truly adds value, aiming to deliver solutions that create impact and leave clients satisfied.`,
];

export default function About() {
  return (
    <section className="min-h-screen pt-20 bg-[#101010]">
      <AnimatedHeading className="font-sans text-[clamp(2rem,12dvw+1rem,18rem)] font-bold uppercase leading-[.9] tracking-[-10px] text-center text-[#efefef]">
        About Me
      </AnimatedHeading>

      <WordHighlightParagraphs
        paragraphs={paragraphs}
        activeWordCount={10}
        staggerDelay={0.08}
      />

      <HorizontalScrollSections
        panels={[
          {
            className: "bg-[#101010] overflow-hidden",
            content: (
              <article
                id="about"
                className="flex relative z-0 h-screen w-full justify-end overflow-hidden"
              >
                <h2 className="font-sans uppercase font-bold text-[#efefef]  text-[clamp(2rem,15dvw+1rem,18rem)] leading-[0.8] tracking-[-20px] -ml-3 -mb-3.5 text-theme-black absolute top-0 left-20">
                  Po
                  <br />
                  rtf
                  <br />
                  olio
                </h2>

                <div className="content flex w-9/12 h-9/12 mt-auto mb-10 p-0 md:pl-20">
                  {/* heading */}
                  <div className="w-1/3 flex items-end overflow-hidden relative bg-[#CFCFCF] ">
                    <h2 className="font-sans uppercase font-black text-[#101010] text-[10dvw] leading-[0.7] tracking-[-10px] -ml-4 -mb-3.5 text-theme-black">
                      Po
                      <br />
                      rtf
                      <br />
                      olio
                    </h2>
                  </div>

                  {/* image area */}
                  <div className="image-hero w-full p-10 pb-5 pt-25 flex relative overflow-hidden">
                    <div className="flex items-end gap-10 text-[#efefef] text-4xl leading-[1.3] tracking-[-2%] uppercase font-light max-w-9/12 relative z-10">
                      <h2 className="relative md:absolute -top-10 left-0">
                        Hello <br />
                        I&apos;m Kavin
                      </h2>

                      <Image
                        src={profileImg}
                        alt="Portrait image of Kavin Abregana in black and white theme"
                      />
                      <p className="ml-auto text-3xl leading-[1.6]">
                        Junior Web Developer with over 4 years of experience
                        building responsive, impact-driven websites.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ),
          },
          {
            className: "bg-[#101010] text-[#efefef] overflow-hidden",
            content: (
              <article className="flex relative z-0 h-screen w-full overflow-hidden gap-50 p-20">
                <div className="flex flex-col justify-between relative h-full">
                  <Image
                    unoptimized
                    width={400}
                    height={400}
                    src={desktopImage}
                    alt="looping animation of laptop"
                  />

                  <p className="text-2xl font-light leading-8.5 tracking-[-2%] uppercase w-100">
                    My goal is to help companies and brands reach their full
                    potential and leave their mark in a fast-moving world.
                  </p>
                </div>

                <div className="w-9/12 flex flex-col justify-between h-full">
                  <p className="text-3xl leading-[1.3] tracking-[-2%] uppercase font-light">
                    My interest in web development started with curiosity. I
                    began by experimenting the basics, breaking layouts, fixing
                    them again, and slowly understanding how the web really
                    works.
                  </p>

                  <div className="inner-content flex gap-10 items-end">
                    <Image
                      src={profile}
                      alt="Portrait image of Kavin Abregana with his laptop"
                      width={600}
                      height={600}
                      className="w-1/2 max-w-125"
                    />

                    <p className="w-1/2 text-xl leading-[1.6] tracking-[-2%] uppercase font-light">
                      Today, I focus on growing as a front-end developer by
                      building real projects, learning modern tools, and
                      following industry best practices.
                    </p>
                  </div>
                </div>
              </article>
            ),
          },
          {
            className: "bg-[#101010] text-[#efefef] overflow-hidden",
            content: (
              <article className="flex relative z-0 h-screen w-full overflow-hidden gap-50 p-20">
                Content here...
              </article>
            ),
          },
        ]}
      />
    </section>
  );
}
