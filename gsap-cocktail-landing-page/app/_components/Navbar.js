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
    <nav className="main-nav">
      <div>
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="Velvet Pour Logo" width={32} height={32} />
          <p>Velvet Pour</p>
        </Link>

        <ul>
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
