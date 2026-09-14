import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Signal, Headphones, MessageSquare, TrendingUp } from "lucide-react";

const NAVY = "#0D1B3A";
const SLATE = "#3A475C";

const ITEMS = [
  { icon: FileText, title: "Straightforward plans", body: "Clear pricing, honest terms, no surprises buried in the fine print." },
  { icon: Signal, title: "Reliable service", body: "A network built and maintained to keep homes and businesses online." },
  { icon: Headphones, title: "Responsive support", body: "When you need help, you reach people who can actually do something about it." },
  { icon: MessageSquare, title: "Honest communication", body: "We tell you what we know, when we know it — about your connection, your area, and your service." },
  { icon: TrendingUp, title: "Ongoing improvement", body: "We keep refining the network, the tools, and the way we serve you." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const row = { hidden: { opacity: 0 }, show: { opacity: 1 } };
const iconMark = { hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } } };
const connector = { hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.55, ease: "easeOut" } } };
const text = { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } } };

export default function CommitmentsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="commitment-heading" className="bg-[#FCFAF7] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 id="commitment-heading" className="mb-12 text-3xl font-medium leading-tight tracking-tight sm:text-4xl" style={{ color: NAVY }}>
          What you can expect from us — every time.
        </h2>

        <motion.ul variants={container} initial={reduceMotion ? "show" : "hidden"} whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === ITEMS.length - 1;

            return (
              <motion.li key={item.title} variants={row} className={`group flex gap-5 sm:gap-6 ${isLast ? "" : "pb-10 sm:pb-12"}`}>
                <div className="flex shrink-0 flex-col items-center">
                  <motion.span variants={iconMark} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FFCC00]/60 bg-[#FFCC00]/15 text-[#E0A800] transition-colors duration-200 group-hover:bg-[#FFCC00] group-hover:text-[#FCFAF7]">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                  </motion.span>
                  {!isLast && <motion.span variants={connector} style={{ originY: 0 }} className="w-px flex-1 bg-[#C5A059]/45 transition-colors duration-200 group-hover:bg-[#C5A059]/90" />}
                </div>

                <motion.div variants={text} className="pt-1.5">
                  <h3 className="mb-1 text-lg font-semibold tracking-tight" style={{ color: NAVY }}>{item.title}</h3>
                  <p className="max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: SLATE }}>{item.body}</p>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
