"use client";

import { useEffect, useRef } from "react";

/**
 * HorizontalScrollSections
 *
 * Pins the component while panels scroll horizontally (left → right direction),
 * then releases the page to continue scrolling down normally.
 *
 * Props:
 *   panels       — array of ReactNode or { content: ReactNode, className?: string }
 *   panelWidth   — CSS width of each panel (default '100vw')
 *   scrubSpeed   — ScrollTrigger scrub (default 1)
 *   direction    — 'left' (panels move left, default) | 'right' (panels move right)
 *   className    — extra classes on the outer wrapper
 */
export default function HorizontalScrollSections({
  panels,
  panelWidth = "100vw",
  scrubSpeed = 1,
  direction = "left",
  className = "",
}) {
  const wrapperRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    let ctx;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      const strip = stripRef.current;
      if (!wrapper || !strip) return;

      ctx = gsap.context(() => {
        const totalWidth = strip.scrollWidth;
        const scrollAmount = totalWidth - window.innerWidth;

        const xFrom = direction === "right" ? () => -scrollAmount : 0;
        const xTo = direction === "right" ? 0 : () => -scrollAmount;

        gsap.fromTo(
          strip,
          { x: xFrom },
          {
            x: xTo,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              pin: true, // pin the wrapper
              pinSpacing: true, // adds space so page scroll length matches animation
              scrub: scrubSpeed,
              start: "top top",
              end: () => `+=${totalWidth}`,
              invalidateOnRefresh: true,
            },
          },
        );
      }, wrapper);
    };

    init();
    return () => {
      ctx && ctx.revert();
    };
  }, [direction, scrubSpeed, panelWidth]);

  return (
    <section
      ref={wrapperRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <div
        ref={stripRef}
        className="flex flex-nowrap will-change-transform h-screen"
      >
        {panels.map((panel, i) => {
          const isNode =
            typeof panel !== "object" ||
            panel?.$$typeof ||
            Array.isArray(panel);
          const content = isNode ? panel : panel.content;
          const panelClass = !isNode && panel.className ? panel.className : "";

          return (
            <div
              key={i}
              className={`flex-none h-screen overflow-hidden ${panelClass}`}
              style={{ width: panelWidth }}
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
