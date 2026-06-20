"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

const CARD_W = 320;
const CARD_H = 380;

// Image stack component
function ImageStack({ images, visible }) {
  return (
    <div
      className="relative"
      style={{ width: CARD_W, height: CARD_H, perspective: 800 }}
    >
      {images.map((src, i) => {
        return (
          <div
            key={i}
            className="absolute inset-0 overflow-hidden"
            style={{
              transform: `rotate(0deg) translateX(0px)`,
              zIndex: 10 - i,
              opacity: visible ? 1 - i * 0.1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <Image
              src={src}
              alt=""
              width={CARD_W}
              height={CARD_H}
              className="h-full w-full object-contain object-center aspect-video mix-blend-difference"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}

// Main component
export default function CursorImagePreview({ items = [] }) {
  const cursorRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);

  const xTo = useRef(null);
  const yTo = useRef(null);

  // Init GSAP
  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
    });

    xTo.current = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.35,
      ease: "power3",
    });

    yTo.current = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.35,
      ease: "power3",
    });
  }, []);

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (xTo.current) xTo.current(e.clientX);
      if (yTo.current) yTo.current(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Show / hide animation
  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      opacity: activeItem ? 1 : 0,
      scale: activeItem ? 1 : 0.8,
      duration: activeItem ? 0.3 : 0.25,
      ease: activeItem ? "power2.out" : "power2.in",
    });
  }, [activeItem]);

  return (
    <section className="relative py-24">
      <div className="mx-auto ">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {items.map((item, index) => (
            <h3
              key={item.company + item.when + index}
              onMouseEnter={() => setActiveItem(item)}
              onMouseLeave={() => setActiveItem(null)}
              className="item w-full flex flex-row justify-between uppercase text-xl font-light text-[#101010]"
            >
              <span className="w-1/6">{item.company}</span>
              <span className="w-4/6">{item.title}</span>
              <span className="w-1/6 text-right">{item.when}</span>
            </h3>
          ))}
        </div>

        {/* Cursor follower */}
        <div
          ref={cursorRef}
          className="pointer-events-none fixed left-0 top-0 z-9998 opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          {activeItem && (
            <ImageStack images={activeItem.images} visible={!!activeItem} />
          )}
        </div>
      </div>
    </section>
  );
}
