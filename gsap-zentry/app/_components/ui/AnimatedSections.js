"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedSections
 *
 * A self-contained animated hero section.
 * Slide changes are triggered by:
 *   - Mouse wheel (inside the component)
 *   - Touch swipe (inside the component)
 *   - Native scrollbar (window scroll events)
 *
 * At the first/last slide, scroll passes through to the rest of the page.
 *
 * Props:
 *   sections    — array of { heading, backgroundImage, backgroundPosition? }
 *   headerLeft  — left header slot (string | ReactNode)
 *   headerRight — right header slot (string | ReactNode)
 *   height      — CSS height of the hero block (default "100vh")
 */
export default function AnimatedSections({
  sections: sectionData = DEFAULT_SECTIONS,
  headerLeft = "Animated Sections",
  headerRight = null,
  height = "100vh",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    let cleanup;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { SplitText } = await import("gsap/SplitText");

      gsap.registerPlugin(SplitText);

      const container = containerRef.current;
      if (!container) return;

      const sectionEls = container.querySelectorAll("[data-section]");
      const bgEls = container.querySelectorAll("[data-bg]");
      const headingEls = gsap.utils.toArray("[data-heading]", container);
      const outerWrappers = gsap.utils.toArray("[data-outer]", container);
      const innerWrappers = gsap.utils.toArray("[data-inner]", container);

      const splitHeadings = headingEls.map(
        (h) =>
          new SplitText(h, {
            type: "chars,words,lines",
            linesClass: "clip-text overflow-hidden",
          }),
      );

      let currentIndex = -1;
      let animating = false;
      const total = sectionEls.length;
      const wrap = gsap.utils.wrap(0, total);

      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });

      // ── Core slide transition ──────────────────────────────────────────────
      function gotoSection(index, direction) {
        index = wrap(index);
        animating = true;

        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;

        const tl = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => (animating = false),
        });

        if (currentIndex >= 0) {
          gsap.set(sectionEls[currentIndex], { zIndex: 0 });
          tl.to(bgEls[currentIndex], { yPercent: -15 * dFactor }).set(
            sectionEls[currentIndex],
            { autoAlpha: 0 },
          );
        }

        gsap.set(sectionEls[index], { autoAlpha: 1, zIndex: 1 });

        tl.fromTo(
          [outerWrappers[index], innerWrappers[index]],
          { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
          { yPercent: 0 },
          0,
        )
          .fromTo(bgEls[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
          .fromTo(
            splitHeadings[index].chars,
            { autoAlpha: 0, yPercent: 150 * dFactor },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 1,
              ease: "power2",
              stagger: { each: 0.02, from: "random" },
            },
            0.2,
          );

        currentIndex = index;
      }

      // ── Scroll sentinel setup ──────────────────────────────────────────────
      // We insert a tall invisible div BELOW the component so that the
      // browser scrollbar has room to scroll. Each "page" of scroll = one slide.
      // We then intercept window scroll to drive the animation.
      const SLIDE_SCROLL_PX = window.innerHeight; // 1vh per slide

      const sentinel = document.createElement("div");
      sentinel.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        width: 1px;
        pointer-events: none;
        visibility: hidden;
      `;
      sentinel.style.height = `${SLIDE_SCROLL_PX * (total - 1)}px`;
      container.style.position = "relative"; // ensure sentinel is relative to container
      container.appendChild(sentinel);

      // We wrap the component in a tall scroll container instead.
      // Simpler approach: track window.scrollY relative to the component.
      let lastScrollY = window.scrollY;
      let scrollTimeout = null;

      const onWindowScroll = () => {
        const rect = container.getBoundingClientRect();
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollY;
        lastScrollY = scrollY;

        // Only act when the component is in view
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;
        if (animating) return;
        if (delta === 0) return;

        const goingDown = delta > 0;

        if (goingDown && currentIndex === total - 1) return;
        if (!goingDown && currentIndex === 0) return;

        goingDown
          ? gotoSection(currentIndex + 1, 1)
          : gotoSection(currentIndex - 1, -1);
      };

      window.addEventListener("scroll", onWindowScroll, { passive: true });

      // ── Wheel (mouse wheel inside the component) ───────────────────────────
      const onWheel = (e) => {
        if (animating) {
          e.preventDefault();
          return;
        }

        const goingDown = e.deltaY > 0;
        if (goingDown && currentIndex === total - 1) return;
        if (!goingDown && currentIndex === 0) return;

        e.preventDefault();
        goingDown
          ? gotoSection(currentIndex + 1, 1)
          : gotoSection(currentIndex - 1, -1);
      };

      container.addEventListener("wheel", onWheel, { passive: false });

      // ── Touch ──────────────────────────────────────────────────────────────
      let touchStartY = 0;

      const onTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
      };

      const onTouchMove = (e) => {
        if (animating) {
          e.preventDefault();
          return;
        }

        const delta = touchStartY - e.touches[0].clientY;
        const goingDown = delta > 10;
        const goingUp = delta < -10;

        if (!goingDown && !goingUp) return;
        if (goingDown && currentIndex === total - 1) return;
        if (goingUp && currentIndex === 0) return;

        e.preventDefault();
        goingDown
          ? gotoSection(currentIndex + 1, 1)
          : gotoSection(currentIndex - 1, -1);

        touchStartY = e.touches[0].clientY;
      };

      container.addEventListener("touchstart", onTouchStart, { passive: true });
      container.addEventListener("touchmove", onTouchMove, { passive: false });

      // ── Boot ───────────────────────────────────────────────────────────────
      gotoSection(0, 1);

      cleanup = () => {
        window.removeEventListener("scroll", onWindowScroll);
        container.removeEventListener("wheel", onWheel);
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchmove", onTouchMove);
        if (sentinel.parentNode) sentinel.parentNode.removeChild(sentinel);
        clearTimeout(scrollTimeout);
      };
    };

    init();
    return () => {
      cleanup && cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black text-white select-none"
      style={{ height }}
    >
      {/* Header */}
      {(headerLeft || headerRight) && (
        <div className="absolute top-0 left-0 w-full z-[3] h-[7em] flex items-center justify-between px-[5%] uppercase tracking-[0.5em] text-[clamp(0.66rem,2vw,1rem)]">
          <div>{headerLeft}</div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}

      {/* Slides */}
      {sectionData.map((s, i) => (
        <section
          key={i}
          data-section
          className="absolute inset-0 invisible"
          style={{ zIndex: 0 }}
        >
          <div data-outer className="w-full h-full overflow-y-hidden">
            <div data-inner className="w-full h-full overflow-y-hidden">
              <div
                data-bg
                className="absolute inset-0 flex items-center justify-center bg-cover"
                style={{
                  backgroundImage: s.backgroundImage,
                  backgroundPosition: s.backgroundPosition ?? "center",
                }}
              >
                <h2
                  data-heading
                  className="z-[2] text-center font-semibold leading-snug w-[90%] max-w-[1200px]"
                  style={{
                    fontSize: "clamp(1rem, 6vw, 10rem)",
                    marginRight: "-0.5em",
                  }}
                >
                  {s.heading}
                </h2>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────
const BG = (url, position) => ({
  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.1) 100%), url("${url}")`,
  ...(position ? { backgroundPosition: position } : {}),
});

// ─── Default demo data ────────────────────────────────────────────────────────
const DEFAULT_SECTIONS = [
  {
    heading: "Scroll down",
    ...BG("https://assets.codepen.io/16327/site-landscape-1.jpg"),
  },
  {
    heading: "Animated with GSAP",
    ...BG("https://assets.codepen.io/16327/site-landscape-2.jpg"),
  },
  {
    heading: "GreenSock",
    ...BG("https://assets.codepen.io/16327/site-landscape-3.jpg"),
  },
  {
    heading: "Animation platform",
    ...BG("https://assets.codepen.io/16327/site-landscape-4.jpg"),
  },
  {
    heading: "Keep scrolling",
    ...BG("https://assets.codepen.io/16327/site-landscape-5.jpg", "50% 45%"),
  },
];
