import { motion, useReducedMotion } from "framer-motion";
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
      <motion.img
        src={src}
        alt={alt}
        className="block h-full w-full scale-[0.97] object-cover"
        whileHover={reduce ? undefined : { scale: 1.04 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </motion.div>
  );
}

/**
 * "People Make the Network" collage — a flush, no-gap 3-column grid (left two
 * stacked squares, center tall rectangle, right two stacked squares) matching
 * reference composition. Tiles animate in with a staggered rise when the
 * collage mounts (triggered by "Discover more").
 */
export default function PeopleNetworkCollage() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-1 md:flex-row md:h-[640px]">
        <div className="flex flex-col gap-1 md:w-[27%]">
          <div className="h-72 md:h-1/2">
            <Tile src={IMAGES.collageFieldTeam} alt="Fibrehood technicians working in a neighbourhood" delay={0} reduce={reduce} />
          </div>
          <div className="h-72 md:h-1/2">
            <Tile src={IMAGES.collageNetworkTeam} alt="Fibrehood network team gathered outdoors" delay={0.1} reduce={reduce} />
          </div>
        </div>

        <div className="h-80 md:h-full md:flex-1">
          <Tile src={IMAGES.collageCommunityTeam} alt="Fibrehood team serving a local community" delay={0.05} reduce={reduce} />
        </div>

        <div className="flex flex-col gap-1 md:w-[27%]">
          <div className="h-72 md:h-1/2">
            <Tile src={IMAGES.collageFibreInstallation} alt="Fibrehood technicians installing a network cable" delay={0.15} reduce={reduce} />
          </div>
          <div className="h-72 md:h-1/2">
            <Tile src={IMAGES.collagePoleInstallation} alt="Fibrehood technicians installing fibre on a neighbourhood pole" delay={0.2} reduce={reduce} />
          </div>
        </div>
      </div>
    </div>
  );
}