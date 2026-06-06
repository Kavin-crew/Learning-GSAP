"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function FlairCursorTrailSection({
  children,
  images = [],
  gap = 100,
  size = 50,
  className = "",
}) {
  const containerRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !images.length) return;

    let index = 0;
    const wrapper = gsap.utils.wrap(0, images.length);

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = { x: 0, y: 0 };

    const playAnimation = (element) => {
      gsap
        .timeline()
        .from(element, {
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

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();

      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      const travelDistance = Math.hypot(
        lastMousePos.x - mousePos.x,
        lastMousePos.y - mousePos.y,
      );

      if (travelDistance > gap) {
        animateImage();
        lastMousePos = { ...mousePos };
      }
    };

    container.addEventListener("mousemove", handleMove);

    return () => {
      container.removeEventListener("mousemove", handleMove);
    };
  }, [images, gap]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {children}

      {images.map((src, i) => (
        <Image
          width={size}
          height={size}
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          src={src}
          alt=""
          className="pointer-events-none absolute opacity-0 z-50"
          style={{
            width: size,
          }}
        />
      ))}
    </div>
  );
}
