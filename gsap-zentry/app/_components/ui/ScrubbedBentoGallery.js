"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * ScrubbedBentoGallery
 *
 * Props:
 *   images   — array of { src: string, alt?: string } (exactly 8 items recommended)
 *   children — content rendered below the gallery (e.g. article text)
 *   scrubEnd — ScrollTrigger `end` value (default "+=100%")
 */
export default function ScrubbedBentoGallery({
  images = DEFAULT_IMAGES,
  children,
  scrubEnd = "+=100%",
}) {
  const galleryRef = useRef(null);

  useEffect(() => {
    let flipCtx;
    let cleanupResize;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { Flip } = await import("gsap/Flip");

      gsap.registerPlugin(ScrollTrigger, Flip);

      const createTween = () => {
        const galleryEl = galleryRef.current;
        if (!galleryEl) return;

        const galleryItems = galleryEl.querySelectorAll("[data-gallery-item]");

        flipCtx && flipCtx.revert();
        galleryEl.removeAttribute("data-final");

        flipCtx = gsap.context(() => {
          // Temporarily switch to final state to capture Flip snapshot
          galleryEl.setAttribute("data-final", "");
          const flipState = Flip.getState(galleryItems);
          galleryEl.removeAttribute("data-final");

          const flip = Flip.to(flipState, {
            simple: true,
            ease: "expoScale(1, 5)",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: galleryEl,
              start: "center center",
              end: scrubEnd,
              scrub: true,
              pin: galleryEl.parentNode,
            },
          });

          tl.add(flip);

          return () => gsap.set(galleryItems, { clearProps: "all" });
        });
      };

      createTween();
      window.addEventListener("resize", createTween);
      cleanupResize = () => window.removeEventListener("resize", createTween);
    };

    init();

    return () => {
      cleanupResize && cleanupResize();
      flipCtx && flipCtx.revert();
    };
  }, [scrubEnd]);

  return (
    <>
      {/* Gallery wrapper — full-viewport, clips overflow */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/*
          Bento grid — initial compact state.
          The [data-final] attribute is toggled by GSAP to snapshot the expanded state.
          We use a <style> tag for grid-area assignments and data-attr overrides
          because Tailwind can't handle these dynamic/structural CSS rules at runtime.
        */}
        <style>{bentoStyles}</style>

        <div
          ref={galleryRef}
          className="bento-gallery relative w-full h-full flex-none"
        >
          {images.map((img, i) => (
            <div
              key={i}
              data-gallery-item
              className={`bento-item bento-item-${i + 1} bg-center bg-cover flex-none relative`}
            >
              <Image
                fill
                loading="eager"
                src={img.src}
                alt={img.alt ?? ""}
                className="object-cover w-full h-full block"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content section below */}
      {children && (
        <div className="px-20 py-8 [&_p]:text-lg [&_p]:mb-4">{children}</div>
      )}
    </>
  );
}

// ─── Injected styles ──────────────────────────────────────────────────────────
// Tailwind can't express CSS grid area assignments or data-attribute selectors,
// so we keep only those rules here and let Tailwind handle everything else.
const bentoStyles = `
  .bento-gallery {
    display: grid;
    gap: 1vh;
    grid-template-columns: repeat(3, 32.5vw);
    grid-template-rows: repeat(4, 23vh);
    justify-content: center;
    align-content: center;
  }

  .bento-gallery[data-final] {
    grid-template-columns: repeat(3, 100vw);
    grid-template-rows: repeat(4, 49.5vh);
    gap: 1vh;
  }

  .bento-item-1 { grid-area: 1 / 1 / 3 / 2; }
  .bento-item-2 { grid-area: 1 / 2 / 2 / 3; }
  .bento-item-3 { grid-area: 2 / 2 / 4 / 3; }
  .bento-item-4 { grid-area: 1 / 3 / 3 / 3; }
  .bento-item-5 { grid-area: 3 / 1 / 3 / 2; }
  .bento-item-6 { grid-area: 3 / 3 / 5 / 4; }
  .bento-item-7 { grid-area: 4 / 1 / 5 / 2; }
  .bento-item-8 { grid-area: 4 / 2 / 5 / 3; }
`;
