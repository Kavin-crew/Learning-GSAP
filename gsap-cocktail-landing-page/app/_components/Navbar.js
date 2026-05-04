"use client";

import { navLinks } from "@/app/_constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        // when the bottom of the nav hits the top of the viewport
        start: "bottom top",
      },
    });

    navTween.fromTo(
      "nav",
      //   initial state
      {
        backgroundColor: "transparent",
      },
      //   state when scrolled into view
      {
        backgroundColor: "#00000050",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      },
    );
  });

  return (
    <nav>
      <div>
        <Link href="#home" className="flex items-center gap-2">
          <Image
            src="/images/logo.webp"
            alt="Velvet Pour Logo"
            width={32}
            height={32}
          />
          <p>Velvet Pour</p>
        </Link>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link href={`#${link.id}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
