// // components/logo.tsx
// export default function Logo({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 560 180" width={135} height={135} className={className}>
//       <defs>
//         <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" className="[stop-color:var(--gold-1)]" />
//           <stop offset="100%" className="[stop-color:var(--gold-2)]" />
//         </linearGradient>
//       </defs>
//       <text
//         x="30"
//         y="115"
//         fontSize="92"
//         fontFamily="'Playfair Display', Georgia, serif"
//         fontStyle="italic"
//         fontWeight="700"
//         fill="url(#textGrad)"
//       >
//         Mehedi
//       </text>
//       <path
//         d="M32 130 C 140 153, 340 153, 470 126 C 461 140, 300 162, 150 160 C 88 159, 52 149, 32 130 Z"
//         className="fill-(--accent-color)"
//         opacity="0.85"
//       />
//       <circle cx="485" cy="122" r="7" fill="url(#textGrad)" />
//     </svg>
//   );
// }

//
//
//========================================
//
type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Same mark used in the navbar ("</>" + smh.dev), themeable for
 * dark or light backgrounds. Swap in <Logo variant="light" /> anywhere
 * that sits on a light surface (a light-mode header, a printed resume
 * header, an email signature, etc).
 */
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <a
      href="#home"
      className={`group flex items-center gap-2 font-mono ${className}`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm transition-colors ${
          isLight
            ? "border-neutral-200 bg-white text-[#C97B2E] group-hover:border-[#C97B2E]/50"
            : "border-(--line) bg-(--ink) text-(--amber) group-hover:border-(--amber)/50"
        }`}
      >
        {"<"}/{">"}
      </span>
      <span
        className={`text-sm tracking-wide ${isLight ? "text-neutral-900" : "text-(--paper)"}`}
      >
        smh
        <span className={isLight ? "text-[#C97B2E]" : "text-(--amber)"}>
          .dev
        </span>
      </span>
    </a>
  );
}
