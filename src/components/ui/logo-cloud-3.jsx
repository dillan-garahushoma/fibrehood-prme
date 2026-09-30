import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

/**
 * LogoCloud — an infinite-scrolling strip of partner/trust logos.
 *
 * @param {string} [className]      wrapper className
 * @param {string} [logoClassName]  className applied to each <img>; defaults to h-12 md:h-16
 * @param {Array<{src:string, alt:string, width?:number, height?:number}>} logos
 */
export function LogoCloud({ className, logoClassName, logos, ...props }) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={56} reverse speed={60} speedOnHover={20}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className={cn(
              "pointer-events-none select-none object-contain",
              logoClassName ?? "h-12 md:h-16"
            )}
            height={logo.height || "auto"}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width || "auto"}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}

