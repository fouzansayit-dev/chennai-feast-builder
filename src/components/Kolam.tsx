import React from "react";

interface KolamProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Traditional South Indian Lotus-Symmetry Kolam (Sikku/Pulli style)
 */
export function CenterKolam({ className = "", size = 120, color = "currentColor" }: KolamProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-[spin_120s_linear_infinite] ${className}`}
    >
      {/* Central dot */}
      <circle cx="50" cy="50" r="2" fill={color} />
      
      {/* Surrounding dots of the kolam grid */}
      {[
        { x: 50, y: 35 }, { x: 50, y: 65 }, { x: 35, y: 50 }, { x: 65, y: 50 },
        { x: 35, y: 35 }, { x: 65, y: 35 }, { x: 35, y: 65 }, { x: 65, y: 65 },
        { x: 50, y: 20 }, { x: 50, y: 80 }, { x: 20, y: 50 }, { x: 80, y: 50 }
      ].map((dot, idx) => (
        <circle key={idx} cx={dot.x} cy={dot.y} r="1" fill={color} opacity="0.3" />
      ))}

      {/* Symmetrical intersecting loops */}
      <path
        d="M50,20 Q65,20 65,35 T50,50 Q35,50 35,35 T50,20 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M50,80 Q35,80 35,65 T50,50 Q65,50 65,65 T50,80 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20,50 Q20,35 35,35 T50,50 Q50,65 35,65 T20,50 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M80,50 Q80,65 65,65 T50,50 Q50,35 65,35 T80,50 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Outer elegant framing petals */}
      <path
        d="M50,12 Q60,2 60,18 T50,28 Q40,28 40,18 T50,12 Z"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.8"
      />
      <path
        d="M50,88 Q40,98 40,82 T50,72 Q60,72 60,82 T50,88 Z"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.8"
      />
      <path
        d="M12,50 Q2,40 18,40 T28,50 Q28,60 18,60 T12,50 Z"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.8"
      />
      <path
        d="M88,50 Q98,60 82,60 T72,50 Q72,40 82,40 T88,50 Z"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.8"
      />
    </svg>
  );
}

/**
 * Traditional Corner Kolam border accent
 */
export function CornerKolam({ className = "", size = 80, color = "currentColor" }: KolamProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Corner corner loops */}
      <path
        d="M5,5 Q25,5 25,25 T5,45 Q5,25 5,5 Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M5,5 Q5,25 25,25 T45,5 Q25,5 5,5 Z"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Inner floral accent */}
      <path
        d="M5,5 C15,15 15,30 5,35"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="2,2"
      />
      <path
        d="M5,5 C15,15 30,15 35,5"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="2,2"
      />
      <circle cx="20" cy="20" r="1.5" fill={color} />
      <circle cx="5" cy="5" r="3" fill={color} />
    </svg>
  );
}

/**
 * Horizontal Kolam Divider
 */
export function KolamDivider({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 w-full ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-current opacity-40" />
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-70 text-brand-gold"
      >
        <circle cx="20" cy="20" r="1.5" fill={color} />
        <path
          d="M20,10 Q25,15 20,20 T20,30"
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M10,20 Q15,25 20,20 T30,20"
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M13,13 C17,17 23,17 27,13"
          stroke={color}
          strokeWidth="0.8"
        />
        <path
          d="M13,27 C17,23 23,23 27,27"
          stroke={color}
          strokeWidth="0.8"
        />
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-current opacity-40" />
    </div>
  );
}
