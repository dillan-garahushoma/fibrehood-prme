import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";

const EASE = [0.16, 1, 0.3, 1];

function Tile({ src, alt, delay, reduce }) {
  return (
    <motion.div
      className="relative h-full w-full overflow-hidden"
      initial={reduce ? false : { opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      <Image src={src} alt={alt} fittingType="fill" className="h-full w-full" />
    </motion.div>
  );
}

/**
 * "People Make the Network" collage — a flush, no-gap 3-column grid (left two
 * stacked squares, center tall rectangle, right two stacked squares) matching
 * the reference composition. Edges dissolve into the page via a mask-image
 * gradient (linear-blend technique). Tiles animate in with a staggered rise
 * when the collage mounts (triggered by "Discover more").
 */
export default function PeopleNetworkCollage() {
  const reduce = useReducedMotion();
  const maskStyle = reduce
    ? undefined
    : {
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)",
      };

  return (
    <div className="relative w-full" style={maskStyle}>
      <div className="flex flex-col md:flex-row md:h-[640px]">
        <div className="flex flex-col md:w-[27%]">
          <div className="h-72 md:h-1/2">
            <Tile src={IMAGES.domainCorporate} alt="People collaborating in a connected office" delay={0} reduce={reduce} />
          </div>
          <div className="h-72 md:h-1/2">
            <Tile src={IMAGES.domainHealthcare} alt="Healthcare team supported by a connected network" delay={0.1} reduce={reduce} />
          </div>
        </div>

        <div className="h-80 md:h-full md:flex-1">
          <Tile src={IMAGES.lifeEvening} alt="A connected home at evening" delay={0.05} reduce={reduce} />
        </div>

        <div className="flex flex-col md:w-[27%]">
          <div className="h-72 md:h-1/2">
            <Tile src={IMAGES.domainCoworking} alt="Creative team collaborating in a studio" delay={0.15} reduce={reduce} />
          </div>
          <div className="h-72 md:h-1/2">
            <Tile src={IMAGES.domainRetail} alt="Retail team using a connected workspace" delay={0.2} reduce={reduce} />
          </div>
        </div>
      </div>
    </div>
  );
}