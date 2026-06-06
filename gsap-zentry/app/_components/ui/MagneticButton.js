"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomWiggle } from "gsap/CustomWiggle";

gsap.registerPlugin(CustomWiggle);

export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  labelStrength = 0.24,
  wiggle = false,
  zoneSize = 200,
  onClick,
}) {
  const zoneRef = useRef(null);
  const buttonRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const button = buttonRef.current;
    const label = labelRef.current;

    if (!zone || !button || !label) return;

    let wiggleTween;

    if (wiggle) {
      wiggleTween = gsap.to(button, {
        rotation: 12,
        duration: 1.5,
        repeat: -1,
        ease: "wiggle({wiggles:8,type:easeOut})",
      });
    }

    const handleMove = (e) => {
      const rect = zone.getBoundingClientRect();

      const x = gsap.utils.mapRange(
        rect.left,
        rect.right,
        -rect.width / 2,
        rect.width / 2,
        e.clientX,
      );

      const y = gsap.utils.mapRange(
        rect.top,
        rect.bottom,
        -rect.height / 2,
        rect.height / 2,
        e.clientY,
      );

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });

      gsap.to(label, {
        x: x * labelStrength,
        y: y * labelStrength,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const handleLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1,0.4)",
      });

      gsap.to(label, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1,0.4)",
      });
    };

    zone.addEventListener("mousemove", handleMove);
    zone.addEventListener("mouseleave", handleLeave);

    return () => {
      zone.removeEventListener("mousemove", handleMove);
      zone.removeEventListener("mouseleave", handleLeave);
      wiggleTween?.kill();
    };
  }, [strength, labelStrength, wiggle]);

  return (
    <div
      ref={zoneRef}
      className="flex items-center justify-center"
      style={{
        width: zoneSize,
        height: zoneSize,
      }}
    >
      <button
        ref={buttonRef}
        onClick={onClick}
        className={`relative overflow-hidden rounded-full px-8 py-4 font-semibold text-zinc-900 will-change-transform cursor-pointer ${className}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(144.02deg, #00bae2 4.56%, #fec5fb 72.98%)",
          }}
        />

        <span
          ref={labelRef}
          className="relative z-10 inline-block pointer-events-none"
        >
          {children}
        </span>
      </button>
    </div>
  );
}
