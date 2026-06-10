"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * SplitTextTube
 *
 * Props:
 *   text         — text to display (default 'SplitText')
 *   trigger      — 'auto' (infinite loop) | 'hover' (plays on hover, reverses on leave)
 *   animTime     — duration per line rotation (default 0.9)
 *   stagger      — stagger between chars (default 0.08)
 *   lineStagger  — stagger between lines (default 0.45)
 *   repeat       — repeats for auto mode, -1 = infinite (default -1)
 *   fontSize     — CSS font-size value (default '2rem')
 *   className    — extra classes on the outer wrapper
 */
export default function SplitTextTube({
  text = "SplitText",
  trigger = "auto",
  animTime = 0.9,
  stagger = 0.08,
  lineStagger = 0.45,
  repeat = -1,
  fontSize = "2rem",
  className = "",
}) {
  const wrapperRef = useRef(null);
  const tlRef = useRef(null);
  const initDone = useRef(false);

  const setupAnimation = useCallback(async () => {
    if (initDone.current) return;
    initDone.current = true;

    const { gsap } = await import("gsap");
    const { SplitText } = await import("gsap/SplitText");

    gsap.registerPlugin(SplitText);

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const lines = wrapper.querySelectorAll("[data-line]");

    gsap.set(wrapper, { visibility: "visible" });

    const splitLines = Array.from(lines).map(
      (line) => new SplitText(line, { type: "chars", charsClass: "char" }),
    );

    const width = window.innerWidth;
    const depth = -width / 8;
    const transformOrigin = `50% 50% ${depth}`;

    gsap.set(lines, { perspective: 700, transformStyle: "preserve-3d" });

    const tl = gsap.timeline({
      repeat: trigger === "auto" ? repeat : 0,
      paused: trigger === "hover",
    });

    splitLines.forEach((split, index) => {
      tl.fromTo(
        split.chars,
        { rotationX: -90 },
        {
          rotationX: 90,
          stagger,
          duration: animTime,
          ease: "none",
          transformOrigin,
        },
        index * lineStagger,
      );
    });

    tlRef.current = tl;
  }, [trigger, animTime, stagger, lineStagger, repeat]);

  useEffect(() => {
    setupAnimation();
    return () => {
      tlRef.current && tlRef.current.kill();
      initDone.current = false;
    };
  }, [setupAnimation]);

  const handleMouseEnter = () => {
    if (trigger !== "hover" || !tlRef.current) return;
    tlRef.current.restart();
  };

  const handleMouseLeave = () => {
    if (trigger !== "hover" || !tlRef.current) return;
    tlRef.current.reverse();
  };

  const lineCount = 4;

  return (
    // Outer clip — only shows one line's worth of height at a time
    // overflow-hidden is the key to the "tube" illusion
    <div
      className={`inline-flex overflow-hidden invisible ${className}`}
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ height: `calc(${fontSize} * 1.2)` }}
    >
      {/* Relative container holds all 4 stacked absolute lines */}
      <div
        className="relative w-full"
        style={{ height: `calc(${fontSize} * 1.2)` }}
      >
        {Array.from({ length: lineCount }).map((_, i) => (
          <p
            key={i}
            data-line
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none m-0 text-center whitespace-nowrap [&_.char]:backface-hidden"
            style={{ fontSize, letterSpacing: "-0.02em" }}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
