"use client";

import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";

export default function Mask({
  width = 259,
  height = 108,
  className = "",
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const { theme } = useTheme();

  // Original colors for light theme
  const originalFill = "#F3E6F5";
  const originalStroke = "#EFBDEB";

  // State to hold colors
  const [fillColor, setFillColor] = useState(originalFill);
  const [strokeColor, setStrokeColor] = useState(originalStroke);
  const [backgroundGradientStart, setBackgroundGradientStart] =
    useState(originalFill);
  const [backgroundGradientEnd, setBackgroundGradientEnd] =
    useState(originalFill);

  useEffect(() => {
    switch (theme) {
      case "light":
        setFillColor(originalFill);
        setStrokeColor(originalStroke);
        setBackgroundGradientStart(originalFill);
        setBackgroundGradientEnd(originalFill);
        break;
      case "dark":
        setFillColor("#21141E");
        setStrokeColor("#322028");
        setBackgroundGradientStart("#21141E");
        setBackgroundGradientEnd("#21141E");
        break;
      default:
        setFillColor(originalFill);
        setStrokeColor(originalStroke);
        setBackgroundGradientStart(originalFill);
        setBackgroundGradientEnd(originalFill);
        break;
    }
  }, [theme]);

  return (
    <svg
      className={className}
      style={{ pointerEvents: "none" }}
      width={width}
      height={height}
      viewBox="0 0 279 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.509 43.3573C29.627 26.699 14.26 28.5343 1.922 28.5343V13.1818H260.645V123.137H250.354L250.355 122.401C250.404 96.4342 228.964 75.5537 203.001 76.0145C146.994 77.0085 74.5603 77.4872 66.5081 74.9445C53.0968 70.7093 51.8615 64.1801 39.509 43.3573Z"
        fill={fillColor}
        stroke={strokeColor}
      />
      <path
        d="M252.54 28.0582H0.950684V0.466721H252.54V28.0582Z"
        fill={`url(#paint0_linear)`}
      />
      <path
        d="M250.824 127.138L250.824 9.18089L278.415 9.18089L278.415 127.138L250.824 127.138Z"
        fill={`url(#paint1_linear)`}
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="126.745"
          y1="-0.573536"
          x2="126.745"
          y2="9.43512"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={backgroundGradientStart} stopOpacity="0" />
          <stop offset="1" stopColor={backgroundGradientEnd} />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="279.456"
          y1="68.1594"
          x2="269.447"
          y2="68.1594"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={backgroundGradientStart} stopOpacity="0" />
          <stop offset="1" stopColor={backgroundGradientEnd} />
        </linearGradient>
      </defs>
    </svg>
  );
}
