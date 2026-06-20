"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// const demoParagraphs = [
//   `<green>Value</green> Today, development plays a key role in how users experience a product. I focus on building interfaces that are intuitive, reliable, and impactful—helping businesses connect with users, stand out, and drive real results.`,

//   `<green>Approach</green> I value quality over quantity—every detail matters. I take time to understand the problem and focus on what truly adds value, aiming to deliver solutions that create impact and leave clients satisfied.`,
// ];

function cleanKeywordText(word, color) {
  return word.split(`<${color}>`).join("").split(`</${color}>`).join("");
}

function parseWord(word) {
  if (word.includes("<red>")) {
    return {
      text: cleanKeywordText(word, "red"),
      keyword: "red",
    };
  }

  if (word.includes("<green>")) {
    return {
      text: cleanKeywordText(word, "green"),
      keyword: "green",
    };
  }

  return {
    text: word,
  };
}

function parseParagraph(paragraph) {
  return paragraph.split(" ").map(parseWord);
}

// backgroundColor - background of each word as highlight
export function WordHighlightParagraphs({
  paragraphs,
  activeWordCount = 10,
  staggerDelay = 0.08,
  className = "",
  sectionClassName = "",
  backgroundColor = "rgba(191, 188, 180, 0.0)",
}) {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  const parsedParagraphs = useMemo(() => {
    return paragraphs.map(parseParagraph);
  }, [paragraphs]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean);

      gsap.set(words, {
        opacity: 0,
        backgroundColor: "rgba(191, 188, 180, 0)",
      });

      gsap.set(".keyword-inner", {
        opacity: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800",
          scrub: true,
          pin: true,
        },
      });

      words.forEach((word, index) => {
        tl.to(
          word,
          {
            opacity: 1,
            backgroundColor,
            duration: 0.25,
            ease: "none",
          },
          index * staggerDelay,
        );

        tl.to(
          word,
          {
            backgroundColor: "rgba(191, 188, 180, 0)",
            duration: 0.25,
            ease: "none",
          },
          (index + activeWordCount) * staggerDelay,
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [activeWordCount, staggerDelay, backgroundColor]);

  return (
    <>
      <style>{`
        .keyword-wrapper {
        position: relative;
        isolation: isolate;
        background-color: transparent !important;
        overflow: visible;
        color: #101010;
        font-size: 14px;
        top: 50%;
        transform: translateY(-50%);
        margin-inline: 20px;
        line-height: 100%;
        }

        .keyword-inner {
          position: relative;
          z-index: 2;
        }

        .keyword-wrapper::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(100% + 1rem);
        height: calc(100% + .15rem);
        transform: translate(-50%, -50%);
        z-index: 1;
        }

        .keyword-red::before {
          background: #ff7f7a;
        }

        .keyword-green::before {
          background: #fff;
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`anime-text-container  min-h-screen bg-[#101010] ${sectionClassName}`}
      >
        <div className="flex min-h-screen items-center justify-center px-6">
          <div
            className={`space-y-12 text-left text-xl leading-[1.35] tracking-[-2%] md:text-4xl max-w-400 ${className}`}
          >
            {parsedParagraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>
                {paragraph.map((word, index) => {
                  const currentIndex =
                    parsedParagraphs
                      .slice(0, paragraphIndex)
                      .reduce((acc, curr) => acc + curr.length, 0) + index;

                  const isKeyword = Boolean(word.keyword);

                  return (
                    <span
                      key={`${word.text}-${paragraphIndex}-${index}`}
                      ref={(el) => {
                        wordsRef.current[currentIndex] = el;
                      }}
                      className={`word mr-2 inline-block uppercase rounded-md px-1.5 py-0.5 md:mr-3 font-light text-[#efefef] ${
                        isKeyword
                          ? `keyword-wrapper keyword-${word.keyword}`
                          : ""
                      }`}
                    >
                      {isKeyword ? (
                        <span className="keyword-inner">{word.text}</span>
                      ) : (
                        word.text
                      )}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// use case
export default function GSAPWordHighlightPreview() {
  return (
    <section className="min-h-screen bg-[#101010]">
      <WordHighlightParagraphs
        paragraphs={demoParagraphs}
        activeWordCount={10}
        staggerDelay={0.08}
      />
    </section>
  );
}
