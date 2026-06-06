"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

// Data
const PREVIEW_ITEMS = [
  {
    label: "Architecture",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1780748809/portfolio-images/glitch_human_xbyfkd.gif",
    ],
  },
  {
    label: "Nature",
    images: [
      "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  {
    label: "Portraits",
    images: [
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  {
    label: "Travel",
    images: [
      "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  {
    label: "Food",
    images: [
      "https://images.pexels.com/photos/109968/pexels-photo-109968.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
];

const CARD_W = 220;
const CARD_H = 280;

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
            className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 shadow-2xl"
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
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}

// Main component
export default function CursorImagePreview() {
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
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Cursor-Tracking Image Preview
          </h2>
          <p className="mx-auto max-w-md text-zinc-400">
            Hover over the items below. A stack of images follows your cursor.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {PREVIEW_ITEMS.map((item) => (
            <button
              key={item.label}
              onMouseEnter={() => setActiveItem(item)}
              onMouseLeave={() => setActiveItem(null)}
              className="rounded-full border border-white/8 bg-white/4 px-7 py-3 text-base font-medium text-zinc-300 transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-white"
            >
              {item.label}
            </button>
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
