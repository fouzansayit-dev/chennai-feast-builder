import React from "react";

interface GarlandProps {
  className?: string;
  count?: number; // Number of arches
}

export default function MarigoldGarland({ className = "", count = 12 }: GarlandProps) {
  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none flex justify-around ${className}`}>
      {Array.from({ length: count }).map((_, archIndex) => (
        <svg
          key={archIndex}
          viewBox="0 0 120 40"
          className="w-full h-8 min-w-[80px] max-w-[150px] opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Thread arc */}
          <path
            d="M0,5 Q60,32 120,5"
            stroke="#4A3B12"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          />

          {/* Hanging Mango Leaves */}
          <g>
            {/* Left Leaf */}
            <path
              d="M30,12 C28,25 32,35 34,38 C32,35 24,20 28,12 Z"
              fill="#2B5E2E"
              stroke="#133B1C"
              strokeWidth="0.5"
            />
            {/* Center Leaf */}
            <path
              d="M60,18 C58,32 62,42 64,45 C62,42 54,27 58,18 Z"
              fill="#1E4620"
              stroke="#133B1C"
              strokeWidth="0.5"
            />
            {/* Right Leaf */}
            <path
              d="M90,12 C88,25 92,35 94,38 C92,35 84,20 88,12 Z"
              fill="#2B5E2E"
              stroke="#133B1C"
              strokeWidth="0.5"
            />
          </g>

          {/* String of Marigold Flowers (Chendumalli) */}
          <g>
            {/* We follow the curve path y = 5 + (27 * (x-60)^2) / 3600 approx */}
            {[
              { x: 5, y: 6, color: "#FF9F1C" }, // Orange
              { x: 15, y: 10, color: "#FFBF00" }, // Yellow
              { x: 25, y: 14, color: "#FF9F1C" },
              { x: 35, y: 17, color: "#FFBF00" },
              { x: 45, y: 19, color: "#FF9F1C" },
              { x: 55, y: 20, color: "#FFBF00" }, // Center bottom
              { x: 65, y: 20, color: "#FF9F1C" },
              { x: 75, y: 19, color: "#FFBF00" },
              { x: 85, y: 17, color: "#FF9F1C" },
              { x: 95, y: 14, color: "#FFBF00" },
              { x: 105, y: 10, color: "#FF9F1C" },
              { x: 115, y: 6, color: "#FFBF00" }
            ].map((flower, idx) => (
              <g key={idx} transform={`translate(${flower.x}, ${flower.y})`}>
                {/* Fluffy Marigold petals using overlapping small circles */}
                <circle cx="0" cy="0" r="5" fill={flower.color} />
                <circle cx="-2" cy="-2" r="3.2" fill={flower.color === "#FF9F1C" ? "#E76F51" : "#FFD000"} />
                <circle cx="2" cy="-2" r="3.2" fill={flower.color === "#FF9F1C" ? "#FF8000" : "#FFE066"} />
                <circle cx="-2" cy="2" r="3.2" fill={flower.color} />
                <circle cx="2" cy="2" r="3.2" fill={flower.color} />
                {/* Center bud */}
                <circle cx="0" cy="0" r="2" fill="#E65F00" opacity="0.7" />
              </g>
            ))}
          </g>
        </svg>
      ))}
    </div>
  );
}
