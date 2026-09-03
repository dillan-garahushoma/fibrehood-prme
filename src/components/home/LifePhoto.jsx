import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";

const EASE = [0.16, 1, 0.3, 1];

/**
 * The lifestyle photo panel for the EverydayLife section. On desktop it sits
 * inset below the section's top line and anchors to the bottom edge, carrying
 * the caption and closing line inside its navy caption strip.
 */
export function LifePhoto({ reduce }) {
  return (
    <div className="relative order-2 flex flex-col px-5 pb-14 sm:px-10 lg:order-none lg:min-h-[640px] lg:px-10 lg:pb-20 lg:pt-[7.25rem]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/10] lg:aspect-auto lg:flex-1 lg:rounded-3xl">
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { opacity: 0.7, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <Image
            src={IMAGES.lifeEvening}
            alt="A household at ease in the evening — TV glowing, laptop open, a video call in the background."
            fittingType="fill"
            className="h-full w-full"
          />
        </motion.div>

        {/* Caption strip — ties the photo to the ledger column */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-signal/90 via-signal/45 to-transparent pt-28">
          <div className="flex flex-col gap-3 px-6 pb-10 sm:px-10 lg:gap-4 lg:px-14 lg:pb-14">
            <span className="h-0.5 w-10 bg-loop" aria-hidden="true" />
            <p className="font-heading text-base font-semibold tracking-tight text-paper lg:text-lg">
              One connection. Everything on it.
            </p>
            <p className="flex items-center gap-2.5 text-sm leading-snug text-paper/85 lg:text-[15px]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-loop" aria-hidden="true" />
              Whatever your household runs on, it runs on fibre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LifePhoto;