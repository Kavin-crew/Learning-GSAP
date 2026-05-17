"use client";

// React
import { useEffect, useRef, useState } from "react";

// Next.js
import Image from "next/image";
import Link from "next/link";

// Third-party libraries
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import { gsap } from "gsap";

// Internal components/modules
import Button from "@/app/_components/Button";

// Assets
import logoImg from "@/public/img/logo.png";

const navItems = ["Nexus", "Vault", "Prolouge", "About", "Contact"];

export default function Navbar() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIndicatorActive] = useState(false);

  const { y: currentScrollY } = useWindowScroll();

  const lastScrollY = useRef(0);
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  useEffect(() => {
    if (!navContainerRef.current) return;
    // if navbar is at the topmost of the page, show it and remove floating styles
    if (currentScrollY === 0) {
      navContainerRef.current.classList.remove("floating-nav");
      navContainerRef.current.classList.remove("-translate-y-24");
      navContainerRef.current.classList.add("translate-y-0");
      // user just scrolling down, hide the navbar and add floating styles
    } else if (currentScrollY > lastScrollY.current) {
      navContainerRef.current.classList.add("floating-nav");
      navContainerRef.current.classList.remove("translate-y-0");
      navContainerRef.current.classList.add("-translate-y-24");
      // user is scrolling up, show the navbar and add floating styles
    } else if (currentScrollY < lastScrollY.current) {
      navContainerRef.current.classList.add("floating-nav");
      navContainerRef.current.classList.remove("-translate-y-24");
      navContainerRef.current.classList.add("translate-y-0");
    }

    // update last scroll position
    lastScrollY.current = currentScrollY;
  }, [currentScrollY]);

  useEffect(() => {
    if (!audioElementRef.current) return;

    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  function toggleAudioIndicator() {
    setIsAudioPlaying((prev) => !prev);
    setIndicatorActive((prev) => !prev);
  }

  return (
    <section
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 translate-y-0 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Link href="/">
              <Image
                src={logoImg}
                alt="Image of male Ninja Logo"
                className="w-10"
              />
            </Link>

            <Button
              id="product-button"
              title="Products"
              icon={<TiLocationArrow />}
              containerClass="bg-blue-50 hidden md:flex flex-row-reverse items-center justify-center gap-1 !w-40"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </Link>
              ))}
            </div>

            <button
              className="ml-10 flex cursor-pointer items-center space-x-0.5"
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />

              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </section>
  );
}
