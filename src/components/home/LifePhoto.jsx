import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Clean, breathing photo panel for the EverydayLife section — a plain framed
 * image with no overlay or caption strip, letting the surrounding copy carry
 * the message (Dominus-style editorial pairing).
 */
export function LifePhoto({ reduce }) {
  return (
    <motion.div
      className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[6/5]"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <Image
        src={IMAGES.lifeEvening}
        alt="A household at ease in the evening — TV glowing, laptop open, a video call in the background."
        fittingType="fill"
        className="h-full w-full"
      />
    </motion.div>
  );
}

export default LifePhoto;