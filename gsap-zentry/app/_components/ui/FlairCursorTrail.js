"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function FlairCursorTrail({
  images = [],
  gap = 100,
  size = 50,
}) {
  const trailRefs = useRef([]);

  useEffect(() => {
    if (!images.length) return;

    let index = 0;
    const wrapper = gsap.utils.wrap(0, images.length);

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = { x: 0, y: 0 };
    let cachedMousePos = { x: 0, y: 0 };

    const playAnimation = (element) => {
      const tl = gsap.timeline();

      tl.from(element, {
        opacity: 0,
        scale: 0,
        ease: "elastic.out(1,0.3)",
      })
        .to(
          element,
          {
            rotation: gsap.utils.random(-360, 360),
          },
          "<",
        )
        .to(
          element,
          {
            y: window.innerHeight + 300,
            ease: "back.in(.4)",
            duration: 1,
          },
          0,
        );
    };

    const handleMove = (e) => {
      mousePos = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const imageTrail = () => {
      const travelDistance = Math.hypot(
        lastMousePos.x - mousePos.x,
        lastMousePos.y - mousePos.y,
      );

      cachedMousePos.x = gsap.utils.interpolate(
        cachedMousePos.x || mousePos.x,
        mousePos.x,
        0.1,
      );

      cachedMousePos.y = gsap.utils.interpolate(
        cachedMousePos.y || mousePos.y,
        mousePos.y,
        0.1,
      );

      if (travelDistance > gap) {
        animateImage();
        lastMousePos = { ...mousePos };
      }
    };

    const animateImage = () => {
      const wrappedIndex = wrapper(index);

      const img = trailRefs.current[wrappedIndex];

      if (!img) return;

      gsap.killTweensOf(img);

      gsap.set(img, {
        clearProps: "all",
      });

      gsap.set(img, {
        opacity: 1,
        left: mousePos.x,
        top: mousePos.y,
        xPercent: -50,
        yPercent: -50,
      });

      playAnimation(img);

      index++;
    };

    window.addEventListener("mousemove", handleMove);
    gsap.ticker.add(imageTrail);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      gsap.ticker.remove(imageTrail);
    };
  }, [images, gap]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          width={size}
          height={size}
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          src={src}
          alt=""
          className="pointer-events-none fixed opacity-0 z-9999"
          style={{
            width: size,
          }}
        />
      ))}
    </>
  );
}
