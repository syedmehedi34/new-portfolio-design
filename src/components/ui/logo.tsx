type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

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
