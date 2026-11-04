const OUTLINE = "#100C24";

// Paco's fox, sitting with its tail curled round. Decorative only.
export default function Fox({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 124 124"
      className={className}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* Tail */}
      <path d="M78 114 Q120 116 116 74 Q114 62 102 58 Q106 84 80 94 Z" fill="#EB6E00" />
      <path d="M116 74 Q114 62 102 58 Q104 68 102 76 Q110 80 116 74 Z" fill="#F4F1EA" />

      {/* Body and chest */}
      <path d="M40 70 Q28 110 42 118 L80 118 Q94 110 82 70 Z" fill="#EB6E00" />
      <path d="M48 76 Q61 112 74 76 Q61 84 48 76 Z" fill="#F4F1EA" />
      <path d="M50 118 L50 106 M72 118 L72 106" fill="none" />

      {/* Ears */}
      <path d="M26 8 L48 32 L30 44 Z" fill="#EB6E00" />
      <path d="M31 19 L42 31 L33 38 Z" fill="#F4F1EA" stroke="none" />
      <path d="M96 8 L74 32 L92 44 Z" fill="#EB6E00" />
      <path d="M91 19 L80 31 L89 38 Z" fill="#F4F1EA" stroke="none" />

      {/* Head and white cheeks */}
      <path d="M61 26 Q80 26 92 36 Q98 42 98 50 Q86 72 61 82 Q36 72 24 50 Q24 42 30 36 Q42 26 61 26 Z" fill="#EB6E00" />
      <path d="M24 50 Q40 50 52 66 L61 82 Q36 72 24 50 Z" fill="#F4F1EA" />
      <path d="M98 50 Q82 50 70 66 L61 82 Q86 72 98 50 Z" fill="#F4F1EA" />

      {/* Face */}
      <ellipse cx="46" cy="50" rx="4.5" ry="6" fill={OUTLINE} stroke="none" />
      <ellipse cx="76" cy="50" rx="4.5" ry="6" fill={OUTLINE} stroke="none" />
      <circle cx="47.5" cy="47.5" r="1.6" fill="#FFFFFF" stroke="none" />
      <circle cx="77.5" cy="47.5" r="1.6" fill="#FFFFFF" stroke="none" />
      <path d="M56 72 L66 72 L61 79 Z" fill={OUTLINE} stroke="none" />
    </svg>
  );
}
