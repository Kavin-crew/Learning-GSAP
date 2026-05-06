"use client";

import leftLeaf from "@/public/images/slider-left-leaf.webp";
import rightLeaf from "@/public/images/slider-right-leaf.webp";
import leftArrow from "@/public/images/left-arrow.webp";
import rightArrow from "@/public/images/right-arrow.webp";
import Image from "next/image";
import { allCocktails } from "@/app/_constants/index";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  function goToSlide(index) {
    const newIndex = (index + allCocktails.length) % allCocktails.length;

    setCurrentIndex(newIndex);
  }

  function getCocktailAt(indexOffset) {
    return allCocktails[
      (currentIndex + indexOffset + allCocktails.length) % allCocktails.length
    ];
  }

  const currentCocktail = getCocktailAt(0);
  const nextCocktail = getCocktailAt(1);
  const prevCocktail = getCocktailAt(-1);

  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#menu",
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      })
      .to("#m-left-leaf", { y: -100 }, 0)
      .to("#m-right-leaf", { y: 250 }, 0);
  });

  useGSAP(() => {
    gsap.fromTo(
      "#title",
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power1.inOut" },
    );
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      { opacity: 1, xPercent: 0, duration: 1, ease: "power1.inOut" },
    );
    gsap.fromTo(
      ".details h2, .details p",
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, duration: 1, ease: "power1.inOut" },
    );
  }, [currentIndex]);

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="overflow-hidden mt-0 pt-32"
    >
      <Image src={leftLeaf} alt="Left leaf" id="m-left-leaf" loading="eager" />
      <Image
        src={rightLeaf}
        alt="Right leaf"
        id="m-right-leaf"
        loading="eager"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              className={`${isActive ? "text-yellow border-yellow" : "text-white/50 border-white/50"}`}
              onClick={() => goToSlide(index)}
              aria-pressed={isActive}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            {prevCocktail.name}
            <Image src={rightArrow} alt="right arrow icon" aria-hidden="true" />
          </button>
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            {nextCocktail.name}
            <Image
              src={leftArrow}
              alt="left arrow icon"
              aria-hidden="true"
              className="ml-auto"
            />
          </button>
        </div>

        <div className="cocktail">
          <Image
            width={400}
            height={400}
            src={currentCocktail.image}
            alt={currentCocktail.name}
            className="object-contain"
          />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
