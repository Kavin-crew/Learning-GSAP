"use client";

import contactImage1 from "@/public/img/contact-1.webp";
import contactImage2 from "@/public/img/contact-2.webp";
import contactImage3 from "@/public/img/swordman.webp";
import contactImage4 from "@/public/img/swordman-partial.webp";

import Image from "next/image";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

function ImageClipBox({ src, clipClass }) {
  return (
    <div className={clipClass}>
      <Image src={src} alt="contact images" />
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0  h-full w-72 overflow-hidden hiddden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src={contactImage1}
            clipClass="contact-clip-path-1 hidden sm:block"
          />
          <ImageClipBox
            src={contactImage2}
            clipClass="contact-clip-path-2 translate-y-60 lg:translate-y-40 hidden sm:block"
          />
        </div>
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox src={contactImage4} clipClass="absolute md:scale-125" />
          <ImageClipBox
            src={contactImage3}
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="font-general text-[10px] uppercase">Join Zentry</p>

          <AnimatedTitle
            title={`Let&apos;s b<b>u</b>ild the <br /> new era of <br />g<b>a</b>ming t<b>o</b>gether`}
            className="special-font !md:text-[6.2rem] w-full font-zentry text-5xl! font-black! leading-[.9]!
          "
          />

          <Button title="contact us" containerClass="cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
