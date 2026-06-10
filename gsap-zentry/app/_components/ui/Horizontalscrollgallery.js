"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * HorizontalScrollGallery
 *
 * Props:
 *   images        — array of { src: string, alt?: string }
 *   direction     — "left" (default) | "right"
 *                   "left"  = strip scrolls left as you scroll down (normal reading)
 *                   "right" = strip scrolls right as you scroll down (reverse)
 *   itemWidth     — CSS width of each card (default "33vw")
 *   itemPadding   — Tailwind padding class on each card (default "p-8")
 *   aspectRatio   — Tailwind aspect-ratio class on each image (default "aspect-square")
 *   scrubSpeed    — ScrollTrigger scrub value (default true)
 */
export default function HorizontalScrollGallery({
  images = DEFAULT_IMAGES,
  direction = "left",
  itemWidth = "33vw",
  itemPadding = "p-8",
  aspectRatio = "aspect-square",
  scrubSpeed = true,
}) {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    let ctx;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const strip = stripRef.current;
      if (!section || !strip) return;

      let pinWrapWidth;
      let horizontalScrollLength;

      const refresh = () => {
        pinWrapWidth = strip.scrollWidth;
        horizontalScrollLength = pinWrapWidth - window.innerWidth;
      };

      refresh();

      // "left"  → strip moves left  → x goes from 0 to -scrollLength (default)
      // "right" → strip moves right → x goes from -scrollLength to 0 (reversed)
      const xFrom = direction === "right" ? () => -horizontalScrollLength : 0;
      const xTo = direction === "right" ? 0 : () => -horizontalScrollLength;

      ctx = gsap.context(() => {
        gsap.fromTo(
          strip,
          { x: xFrom },
          {
            x: xTo,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: section,
              scrub: scrubSpeed,
              start: "center center",
              end: () => `+=${pinWrapWidth}`,
              invalidateOnRefresh: true,
            },
          },
        );

        ScrollTrigger.addEventListener("refreshInit", refresh);
      });
    };

    init();

    return () => {
      ctx && ctx.revert();
    };
  }, [direction, scrubSpeed]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full">
      <div className="w-full">
        <div
          ref={stripRef}
          className="flex flex-nowrap relative will-change-transform"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`flex-none box-content ${itemPadding}`}
              style={{ width: itemWidth }}
            >
              <Image
                width={1800}
                height={1800}
                src={img.src}
                alt={img.alt ?? ""}
                className={`w-full object-cover ${aspectRatio}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Default demo images ──────────────────────────────────────────────────────
const DEFAULT_IMAGES = [
  {
    src: "https://assets.codepen.io/16327/portrait-image-1.jpg",
    alt: "Portrait 1",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-2.jpg",
    alt: "Portrait 2",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-3.jpg",
    alt: "Portrait 3",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-4.jpg",
    alt: "Portrait 4",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-5.jpg",
    alt: "Portrait 5",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-6.jpg",
    alt: "Portrait 6",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-7.jpg",
    alt: "Portrait 7",
  },
  {
    src: "https://assets.codepen.io/16327/portrait-image-8.jpg",
    alt: "Portrait 8",
  },
];
