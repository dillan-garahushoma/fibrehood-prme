import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";
import { Wifi, ArrowDown, ArrowUp } from "lucide-react";

export function Step4Connected() {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line">
      <Image
        src={IMAGES.lifeEvening}
        alt="A connected home in the evening, streaming and browsing"
        fittingType="fill"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/80 via-signal-deep/20 to-transparent" />

      <motion.div
        className="absolute bottom-4 left-4 right-4 rounded-2xl border border-paper/15 bg-signal-deep/70 p-4 backdrop-blur-xl"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <span className="text-sm font-semibold text-paper">Connection Active</span>
          </div>
          <Wifi className="h-4 w-4 text-loop" strokeWidth={1.6} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-paper/10 p-3">
            <div className="flex items-center gap-1.5 text-paper/60">
              <ArrowDown className="h-3 w-3" strokeWidth={2} />
              <span className="text-[11px] font-medium">Download</span>
            </div>
            <p className="mt-1 font-heading text-xl font-bold text-paper">
              48<span className="text-xs font-normal text-paper/60"> Mbps</span>
            </p>
          </div>
          <div className="rounded-xl bg-paper/10 p-3">
            <div className="flex items-center gap-1.5 text-paper/60">
              <ArrowUp className="h-3 w-3" strokeWidth={2} />
              <span className="text-[11px] font-medium">Upload</span>
            </div>
            <p className="mt-1 font-heading text-xl font-bold text-paper">
              22<span className="text-xs font-normal text-paper/60"> Mbps</span>
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-paper/50">
          <span>Uptime: 99.8%</span>
          <span>Latency: 8ms</span>
        </div>
      </motion.div>
    </div>
  );
}

export default Step4Connected;