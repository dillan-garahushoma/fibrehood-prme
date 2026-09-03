import { useEffect, useState } from "react";

/**
 * Detects whether the fixed navbar currently sits over a dark background.
 * Samples the section of the page under the navbar and resolves the nearest
 * opaque background colour up the DOM chain, then compares luminance.
 * Keeps the nav transparent over dark heroes and flips it to the light
 * glass bar over white/ light content.
 */
function sectionUnderNavIsDark() {
  const NAV_Y = 40; // vertical sample point inside the navbar
  const sections = document.querySelectorAll("main section");
  let under = null;
  for (const s of sections) {
    const r = s.getBoundingClientRect();
    if (NAV_Y >= r.top && NAV_Y <= r.bottom) {
      under = s;
      break;
    }
  }
  if (!under) return false;

  let node = under;
  while (node && node !== document.documentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    const m = bg.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\)/);
    if (m && (m[4] === undefined || parseFloat(m[4]) > 0.5)) {
      const [r, g, b] = [+m[1], +m[2], +m[3]];
      return (r * 299 + g * 587 + b * 114) / 1000 < 128;
    }
    node = node.parentElement;
  }
  return false;
}

export function useNavOverDark(pathname) {
  const [overDark, setOverDark] = useState(true);

  useEffect(() => {
    let raf = 0;
    const sample = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setOverDark(sectionUnderNavIsDark());
      });
    };

    sample();
    window.addEventListener("scroll", sample, { passive: true });
    window.addEventListener("resize", sample);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", sample);
      window.removeEventListener("resize", sample);
    };
  }, [pathname]);

  return overDark;
}

export default useNavOverDark;