import React from "react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

/**
 * Rigid editorial grid collage: a tall central video is framed by four
 * cinematic domain photos. The proportions mirror an editorial contact sheet:
 * quarter-width side columns frame a square, half-width centre panel.
 */

const LEFT_TOP = "domainCorporate";
const LEFT_BOTTOM = "domainHealthcare";
const RIGHT_TOP = "domainCoworking";
const RIGHT_BOTTOM = "domainRetail";

export function DomainCollage({ images, videoSrc }) {
  const Cell = ({ src, alt, className, imageClassName }) => (
    <figure
      className={cn(
        "group relative overflow-hidden bg-white",
        className
      )}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fittingType="fill"
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105",
            imageClassName
          )}
        />
      )}
    </figure>
  );

  const CenterFrame = ({ className }) => (
    <figure
      className={cn(
        "group relative overflow-hidden bg-signal",
        className
      )}
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-signal to-signal-deep">
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-paper/60 sm:text-sm">
            What fibre unlocks
          </span>
        </div>
      )}
    </figure>
  );

  return (
    <div>
      {/* Mobile: a compact editorial collage, not a regular image gallery. */}
      <div className="lg:hidden">
        <CenterFrame className="aspect-[1.15/1] w-full" />
        <div className="mt-[6px] grid aspect-[1.15/1] grid-cols-[0.8fr_1fr] grid-rows-3 gap-[6px] bg-black">
          <Cell
            className="col-start-1 row-start-1 row-span-2 h-full"
            src={images?.[LEFT_TOP]}
            alt="Corporate offices"
            imageClassName="object-[60%_center]"
          />
          <Cell
            className="col-start-2 row-start-1 h-full"
            src={images?.[RIGHT_TOP]}
            alt="Creative studios"
            imageClassName="object-[55%_45%]"
          />
          <Cell
            className="col-start-1 row-start-3 h-full"
            src={images?.[LEFT_BOTTOM]}
            alt="Healthcare"
            imageClassName="object-[68%_center]"
          />
          <Cell
            className="col-start-2 row-start-2 row-span-2 h-full"
            src={images?.[RIGHT_BOTTOM]}
            alt="Retail and point-of-sale workspace"
            imageClassName="object-[65%_center]"
          />
        </div>
      </div>

      {/* Desktop: no outer frame — only the fine dividers between adjacent panels. */}
      <div className="hidden bg-black lg:grid lg:aspect-[2/1] lg:w-full lg:grid-cols-[1fr_2fr_1fr] lg:grid-rows-3 lg:gap-[6px]">
        <Cell
          className="col-start-1 row-start-1 row-span-2 h-full"
          src={images?.[LEFT_TOP]}
          alt="Corporate offices"
          imageClassName="object-[60%_center]"
        />
        <CenterFrame className="col-start-2 row-start-1 row-span-3 h-full" />
        <Cell
          className="col-start-3 row-start-1 h-full"
          src={images?.[RIGHT_TOP]}
          alt="Creative studios"
          imageClassName="object-[55%_45%]"
        />
        <Cell
          className="col-start-1 row-start-3 h-full"
          src={images?.[LEFT_BOTTOM]}
          alt="Healthcare"
          imageClassName="object-[68%_center]"
        />
        <Cell
          className="col-start-3 row-start-2 row-span-2 h-full"
          src={images?.[RIGHT_BOTTOM]}
          alt="Retail and point-of-sale workspace"
          imageClassName="object-[65%_center]"
        />
      </div>
    </div>
  );
}

export default DomainCollage;
