"use client";

import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import ScrubbedBentoGallery from "./ui/ScrubbedBentoGallery";
import img1 from "@/public/img/portrait-image-1.jpg";
import img2 from "@/public/img/portrait-image-3.jpg";
import img3 from "@/public/img/portrait-image-4.jpg";
import img4 from "@/public/img/portrait-image-8.jpg";
import img5 from "@/public/img/portrait-image-12.jpg";
import img6 from "@/public/img/portrait-pattern-1.jpg";
import img7 from "@/public/img/portrait-pattern-2.jpg";
import img8 from "@/public/img/portrait-pattern-3.jpg";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function Footer() {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div>
        <ScrubbedBentoGallery images={images}>
          <h2 className="mb-6 text-4xl font-bold">Here is some content</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </ScrubbedBentoGallery>
      </div>
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©Nova {new Date().getFullYear()}. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
