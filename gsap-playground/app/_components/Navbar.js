"use client";

// React
import { useEffect, useRef, useState } from "react";

// Next.js
import Link from "next/link";

// Third-party libraries
import { useWindowScroll } from "react-use";

// Internal components/modules

// Assets

const navItems = ["About", "Timeline", "Achievements", "Projects", "Contact"];

export default function Navbar() {
  const { y: currentScrollY } = useWindowScroll();

  const lastScrollY = useRef(0);
  const navContainerRef = useRef(null);

  useEffect(() => {
    if (!navContainerRef.current) return;
    // if navbar is at the topmost of the page, show it and remove floating styles
    if (currentScrollY === 0) {
      navContainerRef.current.classList.remove("-translate-y-24");
      navContainerRef.current.classList.add("translate-y-0");
      // user just scrolling down, hide the navbar and add floating styles
    } else if (currentScrollY > lastScrollY.current) {
      navContainerRef.current.classList.remove("translate-y-0");
      navContainerRef.current.classList.add("-translate-y-24");
      // user is scrolling up, show the navbar and add floating styles
    } else if (currentScrollY < lastScrollY.current) {
      navContainerRef.current.classList.remove("-translate-y-24");
      navContainerRef.current.classList.add("translate-y-0");
    }

    // update last scroll position
    lastScrollY.current = currentScrollY;
  }, [currentScrollY]);

  return (
    <header
      ref={navContainerRef}
      className="fixed inset-x-0 top-13 z-50 h-16 translate-y-0 border-none transition-all duration-700 sm:inset-x-6 text-[#efefef]  mix-blend-difference max-w-600 mx-auto"
    >
      <nav className="flex size-full items-center justify-between p-4 absolute top-1/2 w-full -translate-y-1/2  mix-blend-difference">
        <div className="flex items-center gap-7">
          <Link
            href="/"
            className="font-sans text-[2dvw]  uppercase leading-[0.7] tracking-tighter font-bold "
          >
            Kavin
            <br />
            Abregana
          </Link>
        </div>

        <div className="flex h-full items-center">
          <div className="hidden md:flex gap-12">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={`#${item.toLowerCase()}`}
                className="nav-hover-btn text-[1dvw] uppercase tracking-wide font-light"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <span>button</span>
      </nav>
    </header>
  );
}
