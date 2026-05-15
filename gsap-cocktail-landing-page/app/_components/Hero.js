"use client";

import leftLeaf from "@/public/images/hero-left-leaf.webp";
import rightLeaf from "@/public/images/hero-right-leaf.webp";
import arrowDown from "@/public/images/arrow.webp";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const videoRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 425 });
  const isTablet = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const subHeadingSplit = new SplitText(".sub-heading", { type: "lines" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });
    const linkSplit = new SplitText(".link", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(subHeadingSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1.5,
    });

    gsap.from(linkSplit.lines, {
      opacity: 0,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 2,
    });

    gsap.from(".scroll-indicator", {
      opacity: 0,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 3,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    const startValue = isMobile
      ? "top 50%"
      : isTablet
        ? "top 50%"
        : "center 60%";

    const endValue = isMobile
      ? "43% top"
      : isTablet
        ? "120% top"
        : "bottom top";

    const video = videoRef.current;
    const videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: video,
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    function setupVideoAnimation() {
      videoTimeline.to(video, {
        currentTime: video.duration,
        ease: "none",
      });

      ScrollTrigger.refresh();
    }

    if (video.readyState >= 1) {
      setupVideoAnimation();
    } else {
      video.addEventListener("loadedmetadata", setupVideoAnimation, {
        once: true,
      });
    }
  }, []);

  return (
    <>
      <section
        id="hero"
        className="noisy relative z-10 w-full border border-transparent min-h-100 md:min-h-dvh"
      >
        <div className="container mx-auto px-5">
          <h1 className="title mix-blend-hard-light md:mt-32 mt-40 text-8xl md:text-[12vw] leading-none text-center font-modern-negra uppercase">
            Mojito
          </h1>
          <Image
            src={leftLeaf}
            alt="Left Leaf"
            className="left-leaf pointer-events-none absolute left-0 md:top-20 xl:top-36 2xl:top-52 md:bottom-auto -bottom-20 md:w-fit w-1/3"
            loading="eager"
          />
          <Image
            src={rightLeaf}
            alt="Right Leaf"
            className="right-leaf pointer-events-none absolute right-0 md:bottom-0 xl:top-0 2xl:top-12 top-1/2 md:w-fit w-24"
            loading="eager"
          />
          <Link
            href="#cocktails"
            className="pointer-events-auto absolute top-[40%] right-[20%] hidden md:block"
          >
            <svg
              className="scroll-indicator"
              width="23"
              height="152"
              viewBox="0 0 23 152"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.98524 151.061C10.571 151.646 11.5208 151.646 12.1066 151.061L21.6525 141.515C22.2383 140.929 22.2383 139.979 21.6525 139.393C21.0667 138.808 20.117 138.808 19.5312 139.393L11.0459 147.879L2.56062 139.393C1.97483 138.808 1.02508 138.808 0.439296 139.393C-0.146491 139.979 -0.14649 140.929 0.439296 141.515L9.98524 151.061ZM11.0459 150L12.5459 150L12.5459 -6.55671e-08L11.0459 0L9.54589 6.55671e-08L9.5459 150L11.0459 150Z"
                fill="url(#paint0_linear)"
              />

              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="11.5459"
                  y1="0"
                  x2="11.5459"
                  y2="150"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#EFEFEF" stopOpacity="0" />
                  <stop offset="1" stopColor="#EFEFEF" />
                </linearGradient>
              </defs>
            </svg>
          </Link>

          <div className="body container mx-auto absolute left-1/2 -translate-x-1/2 lg:bottom-20 top-auto md:top-[30vh] flex justify-between items-end px-5">
            <div className="content pointer-events-auto flex lg:flex-row flex-col w-full gap-10 justify-between items-center lg:items-end mx-auto">
              <div className="hidden md:block">
                <p className="sub-heading">Cool. Crisp. Classic.</p>
                <p className="subtitle text-left font-modern-negra text-6xl text-yellow max-w-xl">
                  Sip the Spirit <br /> of Summer
                </p>
              </div>

              <div className="view-cocktails space-y-5 text-lg lg:max-w-2xs md:max-w-xs w-full">
                <p className="subtitle md:text-start text-center">
                  Every cocktail on our menu is a blend of premium ingredients,
                  creative flair, and timeless recipes — designed to delight
                  your senses.
                </p>
                <Link
                  href="#cocktails"
                  className="link font-semibold opacity-80 md:text-start text-center hover:text-yellow"
                >
                  View Cocktails
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0 pointer-events-none">
        <video
          className="w-full md:h-[80%] h-1/2 absolute bottom-0 left-0 md:object-contain object-bottom object-cover"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
}
