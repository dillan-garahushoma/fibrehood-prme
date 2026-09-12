import { useState } from "react";

type HeaderProps = {
  dark?: boolean;
  onLogoClick?: () => void;
};

const navLinks = ["Watches", "Our World", "Stories", "Services"];

export default function Header({ dark = false, onLogoClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const textColor = dark ? "text-white" : "text-black";
  const borderColor = dark ? "border-white/10" : "border-black/10";
  const bg = dark ? "bg-black" : "bg-white";

  return (
    <header className={`w-full ${bg} ${textColor} border-b ${borderColor} relative z-30`}>
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 shrink-0 cursor-pointer"
            aria-label="Home"
          >
            <span className="text-2xl font-light tracking-tight leading-none">15</span>
            <span className="flex flex-col leading-[0.6] text-[9px] tracking-widest">
              <span>2</span>
              <span className="text-[6px] tracking-[0.2em]">YEARS</span>
            </span>
          </button>
          <span className={`hidden md:block h-6 w-px ${dark ? "bg-white/30" : "bg-black/20"}`} />
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:opacity-60 transition-opacity"
              >
                {link}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden text-xs tracking-widest"
            onClick={() => setMenuOpen((v) => !v)}
          >
            MENU
          </button>
        </div>

        <button onClick={onLogoClick} className="absolute left-1/2 -translate-x-1/2 text-center cursor-pointer">
          <div
            className="text-lg md:text-2xl tracking-[0.15em] whitespace-nowrap"
            style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
          >
            AUDEMARS PIGUET
          </div>
          <div
            className="text-[9px] md:text-[10px] italic tracking-[0.35em] -mt-1"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Le Brassus
          </div>
        </button>

        <div className="flex items-center gap-4 md:gap-5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="hidden sm:block">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="hidden sm:block">
            <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.3" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5 20c1.2-3.8 4.2-6 7-6s5.8 2.2 7 6" />
          </svg>
        </div>
      </div>

      {menuOpen && (
        <nav className={`md:hidden flex flex-col gap-4 px-6 pb-6 text-sm tracking-wide ${bg}`}>
          {navLinks.map((link) => (
            <a key={link} href="#" onClick={(e) => e.preventDefault()}>
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
