"use client";

import { motion } from "framer-motion";

const DEFAULT_TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1,
};

/**
 * HoverTextButton
 *
 * A reusable button where the label slides up and is replaced by a
 * duplicate copy sliding in from below on hover. Extracted from a
 * hover-image-reveal component, with the image-following logic removed.
 *
 * Required dependency: framer-motion
 *   npm install framer-motion
 *
 * @param {Object} props
 * @param {string} props.text - Button label
 * @param {() => void} [props.onClick]
 * @param {string} [props.href] - If provided, renders an <a> instead of a <button>
 * @param {string} [props.textColor]
 * @param {string} [props.hoverColor] - Color of the label while hovered (defaults to textColor)
 * @param {Object} [props.font] - CSS font-related properties (fontFamily, fontSize, fontWeight, letterSpacing, etc.)
 * @param {Object} [props.transition] - Framer Motion transition config
 * @param {string} [props.backgroundColor]
 * @param {number} [props.paddingX]
 * @param {number} [props.paddingY]
 * @param {number} [props.rounded]
 * @param {Object} [props.style]
 */
export default function HoverTextButton({
  text = "HOVER ME",
  onClick,
  href,
  textColor = "#FFFFFF",
  hoverColor,
  font = {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 18,
    letterSpacing: "-0.02em",
  },
  transition = DEFAULT_TRANSITION,
  backgroundColor = "#000000",
  paddingX = 28,
  paddingY = 14,
  rounded = 999,
  style,
}) {
  const color = hoverColor || textColor;

  const copyStyle = {
    display: "block",
    color: textColor,
    whiteSpace: "pre",
  };

  const content = (
    <motion.div
      style={{ position: "relative" }}
      initial={false}
      whileHover={{ y: "-100%" }}
      transition={transition}
    >
      <span style={copyStyle}>{text}</span>
      <span
        aria-hidden
        style={{
          ...copyStyle,
          color,
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
        }}
      >
        {text}
      </span>
    </motion.div>
  );

  const sharedStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor,
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius: rounded,
    border: "none",
    cursor: "pointer",
    ...font,
    ...style,
  };

  if (href) {
    return (
      <a href={href} style={{ ...sharedStyle, textDecoration: "none" }}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} style={sharedStyle}>
      {content}
    </button>
  );
}
