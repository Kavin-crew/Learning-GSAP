"use client";

import { useRef, useState } from "react";

export default function BentoTilt({ children, className = "" }) {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef();

  function handleMouseMove(e) {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    // Adjust the multiplier for more/less tilt
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (0.5 - relativeX) * 5;

    const newTransform = `perspective(700px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransform);
  }

  function handleMouseLeave() {
    setTransformStyle("");
  }
  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
}
