import React from "react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

/**
 * Rigid editorial grid collage: centered media frame (video) flanked by four
 * freshly generated cinematic domain photos, separated by thick Signal Navy
 * gutters. On mobile the video breaks out to the top and the images stack.
 *
 * The center frame is video-ready — drop a <video> element with the
 * `videoSrc` prop (or edit the JSX below) to wire the local asset.
 */

const LEFT_TOP = "domainCorporate";
const LEFT_BOTTOM = "domainHealthcare";
const RIGHT_TOP = "domainCoworking";
const RIGHT_BOTTOM = "domainRetail";

export function DomainCollage({ images, videoSrc }) {
  const Cell = ({ src, alt, label, className }) => (
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
          className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      )}
      {label && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-signal/70 via-signal/15 to-transparent px-5 py-4">
          <span className="font-heading text-sm font-semibold text-paper sm:text-base">
            {label}
          </span>
        </figcaption>
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
      {/* Mobile: video on top, images stacked below */}
      <div className="lg:hidden">
        <CenterFrame className="aspect-[4/3] w-full" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Cell className="aspect-[4/3]" src={images?.[LEFT_TOP]} alt="Corporate offices" label="Corporate offices" />
          <Cell className="aspect-[4/3]" src={images?.[RIGHT_TOP]} alt="Creative studios" label="Creative studios" />
          <Cell className="aspect-[4/3]" src={images?.[LEFT_BOTTOM]} alt="Healthcare" label="Healthcare" />
          <Cell className="aspect-[4/3]" src={images?.[RIGHT_BOTTOM]} alt="Retail & POS" label="Retail & POS" />
        </div>
      </div>

      {/* Desktop: rigid 3-column grid with Signal Navy gutter */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.35fr_1fr] lg:grid-rows-2 lg:gap-4">
        <Cell className="row-span-1" src={images?.[LEFT_TOP]} alt="Corporate offices" label="Corporate offices" />
        <CenterFrame className="row-span-2" />
        <Cell className="row-span-1" src={images?.[RIGHT_TOP]} alt="Creative studios" label="Creative studios" />
        <Cell className="row-span-1" src={images?.[LEFT_BOTTOM]} alt="Healthcare" label="Healthcare" />
        <Cell className="row-span-1" src={images?.[RIGHT_BOTTOM]} alt="Retail & POS" label="Retail & POS" />
      </div>
    </div>
  );
}

export default DomainCollage;