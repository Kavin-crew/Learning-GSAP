"use client";

import { navLinks } from "@/app/_constants/index";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import Logo from "@/public/images/logo.webp";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  useGSAP(() => {
    gsap.fromTo(
      ".main-nav",
      // Initial state
      {
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
      },
      // background color and blur on scroll
      {
        backgroundColor: "#00000050",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "nav",
          // start the animation when the bottom of the nav hits the top of the viewport
          start: "bottom top",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <nav className="main-nav fixed z-50 w-full">
      <div className="flex md:flex-row flex-col md:justify-between items-center gap-5 py-5 lg:px-0 px-5 container mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer text-nowrap md:text-base text-sm"
        >
          <Image src={Logo} alt="Velvet Pour Logo" width={32} height={32} />
          <p className="font-modern-negra text-3xl -mb-2">Velvet Pour</p>
        </Link>

        <ul className="flex-center lg:gap-12 gap-7">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link href={`#${link.id}`} className="hover:text-yellow">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
