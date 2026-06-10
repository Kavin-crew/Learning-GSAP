"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * SlidesPinning
 *
 * Each slide pins itself, scales + fades out as the next one scrolls in.
 * If a slide's content is taller than the viewport, it fake-scrolls within
 * the pinned panel before the scale/fade transition kicks in.
 * The last slide is never pinned (it stays as normal flow content).
 *
 * Props:
 *   slides — array of:
 *     {
 *       content:    ReactNode   — anything you want inside the slide
 *       className?: string      — extra Tailwind classes on the outer section (e.g. bg color)
 *       innerClassName?: string — extra Tailwind classes on the inner scroll container
 *     }
 */
export default function SlidesPinning({ slides = DEFAULT_SLIDES }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    let ctx;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const panels = Array.from(wrapper.querySelectorAll("[data-panel]"));

      // Last panel is never pinned — matches original CodePen behaviour
      const pinnedPanels = panels.slice(0, -1);

      ctx = gsap.context(() => {
        pinnedPanels.forEach((panel) => {
          const innerPanel = panel.querySelector("[data-inner]");
          const panelHeight = innerPanel.offsetHeight;
          const windowHeight = window.innerHeight;
          const difference = panelHeight - windowHeight;

          const fakeScrollRatio =
            difference > 0 ? difference / (difference + windowHeight) : 0;

          if (fakeScrollRatio) {
            panel.style.marginBottom = `${panelHeight * fakeScrollRatio}px`;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "bottom bottom",
              end: () =>
                fakeScrollRatio ? `+=${innerPanel.offsetHeight}` : "bottom top",
              pinSpacing: false,
              pin: true,
              scrub: true,
            },
          });

          if (fakeScrollRatio) {
            tl.to(innerPanel, {
              yPercent: -100,
              y: windowHeight,
              duration: 1 / (1 - fakeScrollRatio) - 1,
              ease: "none",
            });
          }

          tl.fromTo(
            panel,
            { scale: 1, opacity: 1 },
            { scale: 0.7, opacity: 0.5, duration: 0.9 },
          ).to(panel, { opacity: 0, duration: 0.1 });
        });
      }, wrapper);
    };

    init();

    return () => {
      ctx && ctx.revert();
    };
  }, [slides]);

  return (
    <div ref={wrapperRef} className="w-full">
      {slides.map((slide, i) => (
        <section
          key={i}
          data-panel
          className={[
            // Base styles matching the original
            "w-full relative overflow-hidden rounded-[10px] box-border",
            "flex justify-center text-center font-semibold text-2xl",
            // Height: viewport minus a typical nav (adjust if your nav differs)
            "h-[calc(100vh-64px)]",
            slide.className ?? "bg-neutral-100 text-neutral-900",
          ].join(" ")}
        >
          {/* section-content wrapper */}
          <div className="w-full">
            {/* section-inner — overflow hidden so fake-scroll works */}
            <div
              data-inner
              className={[
                "h-full overflow-hidden flex flex-col items-center",
                slide.innerClassName ?? "",
                // If the slide opts into scrollable content, let inner grow
                slide.scrollable ? "h-auto pb-[20vh]" : "",
              ].join(" ")}
            >
              {slide.content}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

// ─── Default demo slides (mirrors the original CodePen) ───────────────────────
const DEFAULT_SLIDES = [
  {
    className: "bg-white text-neutral-900",
    content: (
      <>
        <h1 className="text-[clamp(4rem,12vw,16rem)] font-semibold m-0">
          Section 1
        </h1>
        <Image
          src="https://assets.codepen.io/16327/portrait-image-3.jpg"
          width={500}
          height={500}
          alt=""
          className="w-1/2 aspect-square object-cover mt-10 rounded-lg"
        />
      </>
    ),
  },
  {
    className: "bg-pink-100 text-neutral-900",
    scrollable: true,
    content: (
      <>
        <h1 className="text-[clamp(4rem,12vw,16rem)] font-semibold m-0">
          Section 2
        </h1>
        {Array.from({ length: 11 }).map((_, i) => (
          <p key={i} className="max-w-[40ch] px-8 py-2">
            This section is long with text content and needs to be scrollable
            within before the next slide comes in.
          </p>
        ))}
        <p className="max-w-[40ch] px-8 py-2">This is the end...</p>
      </>
    ),
  },
  {
    className: "bg-neutral-200 text-neutral-900",
    content: (
      <>
        <h1 className="text-[clamp(4rem,12vw,16rem)] font-semibold m-0">
          Section 3
        </h1>
        <Image
          src="https://assets.codepen.io/16327/portrait-image-4.jpg"
          width={500}
          height={500}
          alt=""
          className="w-1/2 aspect-square object-cover mt-10 rounded-lg"
        />
      </>
    ),
  },
  {
    // Last slide — never pinned, stays in normal flow
    className: "bg-violet-300 text-neutral-900",
    content: (
      <>
        <h1 className="text-[clamp(4rem,12vw,16rem)] font-semibold m-0">
          Section 4
        </h1>
        <Image
          src="https://assets.codepen.io/16327/portrait-image-2.jpg"
          width={500}
          height={500}
          alt=""
          className="w-1/2 aspect-square object-cover mt-10 rounded-lg"
        />
      </>
    ),
  },
];
