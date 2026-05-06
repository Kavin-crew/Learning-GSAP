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
  const [activeSection, setActiveSection] = useState("home");

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      let currentSection = "";

      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);

        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            window.scrollY >= sectionTop - 200 &&
            window.scrollY < sectionTop + sectionHeight - 200
          ) {
            currentSection = link.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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
              <Link
                href={`#${link.id}`}
                className={`hover:text-yellow ${
                  activeSection === link.id ? "text-yellow" : "text-white"
                }`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
