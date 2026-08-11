"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

/**
 * https://codepen.io/devales/pen/XJKXZEP
 * ProjectList
 *
 * Reusable animated portfolio project list with a custom cursor
 * and an image-reveal panel that follows the mouse on hover.
 * Styled with Tailwind CSS.
 *
 * Setup:
 *   1. npm install gsap
 *   2. Add 'Syne' and 'Inter' fonts (e.g. via next/font or a <link> in your
 *      root layout) and reference them in tailwind.config.js:
 *        theme: {
 *          extend: {
 *            fontFamily: {
 *              syne: ['Syne', 'sans-serif'],
 *              inter: ['Inter', 'sans-serif'],
 *            },
 *          },
 *        }
 *   3. next/image requires external hosts to be allow-listed in
 *      next.config.js, e.g.:
 *        images: {
 *          remotePatterns: [
 *            { protocol: 'https', hostname: '**' }, // or list specific hosts
 *          ],
 *        }
 *
 * Usage:
 *   <ProjectList
 *     projects={[
 *       { index: '01', title: 'NEURAL NETWORK', category: 'AI / Development', image: '/img/1.jpg' },
 *       ...
 *     ]}
 *     onSelect={(project) => router.push(`/work/${project.slug}`)}
 *   />
 */
export default function ProjectList({ projects = [] }) {
  const cursorRef = useRef(null);
  const revealRef = useRef(null);
  const revealImgWrapperRef = useRef(null);
  // Next/Image manages its own <img> under the hood, so we drive the src
  // through state rather than mutating a ref's .src directly — imperative
  // mutation bypasses Next's loader and (with no fallback) triggers the
  // "empty string passed to src" warning on first render.
  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const reveal = revealRef.current;
    if (!cursor || !reveal) return;

    const cursorX = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3.out",
    });
    const cursorY = gsap.quickTo(cursor, "y", {
      duration: 0.2,
      ease: "power3.out",
    });
    const revealX = gsap.quickTo(reveal, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const revealY = gsap.quickTo(reveal, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const handleMouseMove = (e) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      revealX(e.clientX);
      revealY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate the image's scale-in whenever the preview src actually changes
  // (i.e. after Next/Image has rendered the new <img> to the DOM).
  useEffect(() => {
    if (!previewSrc) return;
    const wrapper = revealImgWrapperRef.current;
    const img = wrapper?.querySelector("img");
    if (!img) return;

    gsap.fromTo(
      img,
      { scale: 1.4 },
      { scale: 1, duration: 0.4, ease: "power2.out" },
    );
  }, [previewSrc]);

  const handleEnter = (imgUrl) => {
    const reveal = revealRef.current;
    const cursor = cursorRef.current;
    if (!reveal || !cursor) return;

    setPreviewSrc(imgUrl);

    gsap.to(reveal, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(cursor, { scale: 4, duration: 0.2 });
  };

  const handleLeave = () => {
    const reveal = revealRef.current;
    const cursor = cursorRef.current;
    if (!reveal || !cursor) return;

    gsap.to(reveal, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(cursor, { scale: 1, duration: 0.2 });
  };

  return (
    <div className="relative bg-[#101010] text-white font-syne cursor-none overflow-x-hidden">
      <section className="flex flex-col ">
        {projects.map((project) => (
          <div
            key={project.index ?? project.title}
            className="group relative z-2 flex items-center justify-between border-t border-white/10 last:border-b px-7 py-6.5 transition-colors duration-300 cursor-none hover:bg-white/2"
            onMouseEnter={() => handleEnter(project.image)}
            onMouseLeave={handleLeave}
          >
            <span className="mr-10 text-base text-white/30 transition-colors duration-300 group-hover:text-[#eb5939]">
              {project.index}
            </span>

            <div className="grow">
              <h2 className="m-0 text-[2.5vw] font-extrabold uppercase tracking-[-2%] transition-all duration-300 group-hover:pl-2.5 group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_#fff] max-w-8/12 truncate">
                {project.title}
              </h2>
              <p className="mt-1.25 mb-0 text-base text-white/50 uppercase">
                {project.company} / {project.when}
              </p>
            </div>
          </div>
        ))}
      </section>

      <div
        ref={revealRef}
        className="pointer-events-none fixed top-0 left-0 z-10 h-95 w-[320px] scale-[0.8] opacity-0 max-md:hidden"
      >
        <div
          ref={revealImgWrapperRef}
          className="relative h-full w-full overflow-hidden"
        >
          {previewSrc && (
            <Image
              src={previewSrc}
              fill
              sizes="320px"
              alt="Project preview"
              className="h-full w-full object-contain object-center aspect-video"
            />
          )}
        </div>
      </div>

      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-999 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
    </div>
  );
}
