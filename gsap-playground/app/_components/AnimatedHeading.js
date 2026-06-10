"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedHeading
 *
 * Mimics the olhalazarieva.com heading animation:
 * Letters drop in from above, staggered from the center outward,
 * scrubbed to scroll position.
 *
 * Props:
 *   as           — HTML tag to render: 'h1' | 'h2' | 'h3' | 'h4' (default 'h2')
 *   children     — the heading text (string)
 *   className    — Tailwind classes on the heading element
 *   fromY        — starting Y offset for letters (default '-120%')
 *   duration     — animation duration in seconds (default 1)
 *   ease         — GSAP ease string (default 'power3.out')
 *   staggerEach  — seconds between each letter (default 0.05)
 *   start        — ScrollTrigger start (default 'top 100%')
 *   end          — ScrollTrigger end (default 'bottom 30%')
 *   scrub        — ScrollTrigger scrub value (default 1)
 */
export default function AnimatedHeading({
  as: Tag = "h2",
  children,
  className = "",
  fromY = "-120%",
  duration = 1,
  ease = "power3.out",
  staggerEach = 0.05,
  start = "top 100%",
  end = "bottom 30%",
  scrub = 1,
}) {
  const ref = useRef(null);

  useEffect(() => {
    let ctx;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const el = ref.current;
      if (!el) return;

      // Split text into word spans > letter spans
      const text = el.textContent ?? "";
      el.textContent = "";

      const words = text.split(" ");
      words.forEach((word, wi) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        // Clip letters that fly in from above
        wordSpan.style.overflow = "hidden";
        wordSpan.style.verticalAlign = "bottom";

        word.split("").forEach((char) => {
          const letterSpan = document.createElement("span");
          letterSpan.textContent = char;
          letterSpan.classList.add("anim-letter");
          letterSpan.style.display = "inline-block";
          wordSpan.appendChild(letterSpan);
        });

        el.appendChild(wordSpan);
        if (wi < words.length - 1) el.append("\u00A0"); // non-breaking space between words
      });

      const letters = el.querySelectorAll(".anim-letter");

      ctx = gsap.context(() => {
        gsap.fromTo(
          letters,
          { y: fromY },
          {
            y: 0,
            duration,
            ease,
            stagger: { each: staggerEach, from: "center" },
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub,
            },
          },
        );
      }, el);
    };

    init();

    return () => {
      ctx && ctx.revert();
    };
  }, [children, fromY, duration, ease, staggerEach, start, end, scrub]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
