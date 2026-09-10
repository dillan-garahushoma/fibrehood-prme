import React from "react";

/**
 * Full-size white wordmark pinned to the top-left of a dark hero.
 * Exactly the treatment used on the homepage hero: the mark sits at navbar
 * level (negative top margin pulls it up) and shows through the transparent
 * navbar while it is over the dark hero. Only for dark/heroes with imagery —
 * the asset is white, so it needs a dark backdrop.
 */
export function HeroLogo() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 flex items-start">
      <img
        src="/white.png"
        alt="FibreHood"
        className="-mt-9 h-[7.5rem] w-auto object-contain md:-mt-11 md:h-[9rem]"
      />
    </div>
  );
}

export default HeroLogo;
