"use client";

import AnimatedTitle from "@/app/_components/AnimatedTitle";
import Image from "next/image";
import storyImg from "@/public/img/entrance.webp";
import { useRef } from "react";
import gsap from "gsap";
import RoundedCorners from "@/app/_components/RoundedCorners";
import Button from "@/app/_components/Button";

export default function Story() {
  const frameRef = useRef("null");

  function handleMouseLeave() {
    const element = frameRef.current;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  }

  function handleMouseMove(e) {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  }

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          The multiversal ip world
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title={`The st<b>o</b>ry of <br /> hidden real<b>m</b>`}
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-1"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <Image
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  loading="eager"
                  src={storyImg}
                  alt="image of an entrance to a hidden realm"
                  className="object-contain"
                />
              </div>
            </div>

            <RoundedCorners />
          </div>
        </div>
        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular text-violet-50 md:text-start">
              Where realms converge, lies Zentry and boudless pillar. Discover
              its secrets and shape your fate amidst infinite opportunities.
            </p>

            <Button
              id="realm-button"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
