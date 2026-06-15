"use client";

import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";
import HorizontalScrollSections from "./HorizontalScrollSections";
import GSAPWordHighlightPreview from "./AnimatedWordsHighlight";
import profile from "@/public/images/dummy-image.png";
import desktopImage from "@/public/images/desktop.gif";

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
            className: "bg-[#101010] overflow-hidden",
            content: (
              <article
                id="about"
                className="flex relative z-0 h-screen w-full justify-end overflow-hidden"
              >
                <h2 className="font-sans uppercase font-bold text-[#efefef]  text-[15dvw] leading-[0.8] tracking-[-20px] -ml-3 -mb-3.5 text-theme-black absolute top-0 left-0">
                  Po
                  <br />
                  rtf
                  <br />
                  olio
                </h2>

                <div className="content flex w-9/12 h-9/12 mt-auto mb-10">
                  {/* heading */}
                  <div className="w-1/3 flex items-end overflow-hidden relative bg-[#A9A9A9] ">
                    <h2 className="font-sans uppercase font-black text-[#101010] text-[10dvw] leading-[0.7] tracking-[-10px] -ml-4 -mb-3.5 text-theme-black">
                      Po
                      <br />
                      rtf
                      <br />
                      olio
                    </h2>
                  </div>

                  {/* image area */}
                  <div className="image-hero w-2/3 px-10 flex relative overflow-hidden">
                    <Image
                      src={profile}
                      alt="image"
                      className="absolute bottom-10 left-15"
                    />

                    <div className="flex flex-col gap-10 text-[#efefef] text-4xl leading-[1.3] tracking-[-2%] uppercase font-light max-w-9/12 relative z-10">
                      <h2>
                        Hello <br />
                        I&apos;m Kavin
                      </h2>
                      <p className="ml-auto max-w-6/12 text-3xl leading-[1.6]">
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
            className: "bg-violet-900 text-white overflow-hidden",
            content: (
              <article className="flex relative z-0 h-screen w-full justify-end overflow-hidden">
                <h2 className="font-sans uppercase font-bold text-[#efefef]  text-[15dvw] leading-[0.8] tracking-[-20px] -ml-3 -mb-3.5 text-theme-black absolute top-0 left-0">
                  Po
                  <br />
                  rtf
                  <br />
                  olio
                </h2>

                <div className="content flex w-9/12 h-9/12 mt-auto mb-10">
                  {/* heading */}
                  <div className="w-1/3 flex items-end overflow-hidden relative bg-[#A9A9A9] ">
                    <h2 className="font-sans uppercase font-black text-[#101010] text-[10dvw] leading-[0.7] tracking-[-10px] -ml-4 -mb-3.5 text-theme-black">
                      Po
                      <br />
                      rtf
                      <br />
                      olio
                    </h2>

                    <Image
                      src={desktopImage}
                      alt="looping animation of laptop"
                      unoptimized
                      width={300}
                      height={300}
                    />
                  </div>

                  {/* image area */}
                  <div className="image-hero w-2/3 px-10 flex relative overflow-hidden">
                    <Image
                      src={profile}
                      alt="image"
                      className="absolute bottom-10 left-15"
                    />

                    <div className="flex flex-col gap-10 text-[#efefef] text-4xl leading-[1.3] tracking-[-2%] uppercase font-light max-w-9/12 relative z-10">
                      <h2>
                        Hello <br />
                        I&apos;m Kavin
                      </h2>
                      <p className="ml-auto max-w-6/12 text-3xl leading-[1.6]">
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
            className: "bg-emerald-800 text-white overflow-hidden",
            content: (
              <article className="flex relative z-0 h-screen w-full justify-end overflow-hidden">
                <h2 className="font-sans uppercase font-bold text-[#efefef]  text-[15dvw] leading-[0.8] tracking-[-20px] -ml-3 -mb-3.5 text-theme-black absolute top-0 left-0">
                  Po
                  <br />
                  rtf
                  <br />
                  olio
                </h2>

                <div className="content flex w-9/12 h-9/12 mt-auto mb-10">
                  {/* heading */}
                  <div className="w-1/3 flex items-end overflow-hidden relative bg-[#A9A9A9] ">
                    <h2 className="font-sans uppercase font-black text-[#101010] text-[10dvw] leading-[0.7] tracking-[-10px] -ml-4 -mb-3.5 text-theme-black">
                      Po
                      <br />
                      rtf
                      <br />
                      olio
                    </h2>

                    <Image
                      src={desktopImage}
                      alt="looping animation of laptop"
                      unoptimized
                      width={300}
                      height={300}
                    />
                  </div>

                  {/* image area */}
                  <div className="image-hero w-2/3 px-10 flex relative overflow-hidden">
                    <Image
                      src={profile}
                      alt="image"
                      className="absolute bottom-10 left-15"
                    />

                    <div className="flex flex-col gap-10 text-[#efefef] text-4xl leading-[1.3] tracking-[-2%] uppercase font-light max-w-9/12 relative z-10">
                      <h2>
                        Hello <br />
                        I&apos;m Kavin
                      </h2>
                      <p className="ml-auto max-w-6/12 text-3xl leading-[1.6]">
                        Junior Web Developer with over 4 years of experience
                        building responsive, impact-driven websites.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ),
          },
        ]}
      />
    </section>
  );
}
