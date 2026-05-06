"use client";

import checkImage from "@/public/images/check.webp";
import maskCocktailImage from "@/public/images/under-img.webp";
import { featureLists, goodLists } from "@/app/_constants/index";
import Image from "next/image";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";

export default function Art() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const start = isMobile ? "top 20%" : "top top";

    const maskedTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#art",
        start,
        end: "bottom center",
        scrub: 1.5,
        pin: true,
      },
    });

    maskedTimeline
      .to(".will-fade", {
        opacity: 0,
        stagger: 0.2,
        ease: "power1.inOut",
      })
      .to(".masked-img", {
        scale: 1.3,
        maskPosition: "center",
        maskSize: "400%",
        duration: 1,
        ease: "power1.inOut",
      })
      .to("#masked-content", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      });
  });

  return (
    <section id="art">
      <div className="container mx-auto h-full pt-20 px-5">
        <h2 className="will-fade uppercase xl:text-[15vw]">The Art</h2>

        <div className="content">
          <ul className="space-y-4 will-fade">
            {goodLists.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Image src={checkImage} alt="checkmark icon" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>

          <div className="cocktail-img">
            <Image
              src={maskCocktailImage}
              alt="bartender pouring cocktail focused on the pouring action"
              loading="eager"
              className="abs-center masked-img size-full object-contain"
            />
          </div>

          <ul className="space-y-4 will-fade">
            {featureLists.map((feature, index) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <Image src={checkImage} alt="checkmark icon" />
                <p className="md:w-fit w-60">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="masked-container">
          <h2 className="will-fade">Sip-Worthy Perfection</h2>
          <div id="masked-content">
            <h3>Made with Craft, Poured with Passion</h3>
            <p>
              This isn&apos;t just a drink. It&apos;s a carefully crafted moment
              made just for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
