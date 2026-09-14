import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, Activity, Headset, MessageSquare, Zap } from "lucide-react";

/**
 * CommitmentsSection
 *
 * A light-theme display of five parallel brand promises, visualised as a
 * "network trace" — circular icon marks connected by a thin vertical line.
 * One shared whileInView trigger staggers all five rows; each row combines
 * its transforms into a single Motion variants object so Tailwind transform
 * utilities never fight Motion's inline transform.
 */
const CommitmentsSection = () => {
  const reduce = useReducedMotion();

  const commitments = [
    {
      title: "Straightforward plans",
      description:
        "Clear pricing, honest terms, no surprises buried in the fine print.",
      icon: FileText,
    },
    {
      title: "Reliable service",
      description:
        "A network built and maintained to keep homes and businesses online.",
      icon: Activity,
    },
    {
      title: "Responsive support",
      description:
        "When you need help, you reach people who can actually do something about it.",
      icon: Headset,
    },
    {
      title: "Honest communication",
      description:
        "We tell you what we know, when we know it — about your connection, your area, and your service.",
      icon: MessageSquare,
    },
    {
      title: "Ongoing improvement",
      description:
        "We keep refining the network, the tools, and the way we serve you.",
      icon: Zap,
    },
  ];

  // One shared container — the only whileInView trigger on the list.
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  // Whole row: text slides in ~8px and fades. Single transform object.
  const row = {
    hidden: { opacity: 0, x: reduce ? 0 : -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  // Icon mark: scales + fades in as one transform.
  const icon = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  // Connecting line: draws in from the top.
  const line = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 0.8, ease: "circOut" },
    },
  };

  return (
    <section className="w-full bg-[#FAF9F6] px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-20 text-4xl font-medium leading-[1.1] tracking-tight text-[#0d1b3a] md:text-5xl lg:text-6xl">
          What you can expect from us —<br className="hidden md:block" /> every
          time.
        </h2>

        <motion.ul
          variants={container}
          initial={reduce ? "visible" : "hidden"}
          animate={reduce ? "visible" : undefined}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex flex-col"
        >
          {commitments.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === commitments.length - 1;

            return (
              <motion.li
                key={item.title}
                variants={row}
                className="group relative flex items-start pb-12 last:pb-0"
              >
                {/* Network-trace column: icon mark + connecting line */}
                <div className="relative mr-8 flex flex-col items-center md:mr-12">
                  <motion.div
                    variants={icon}
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#FAF9F6] text-[#D4AF37] transition-colors duration-300 group-hover:bg-[#D4AF37] group-hover:text-[#FAF9F6]"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </motion.div>

                  {!isLast && (
                    <motion.div
                      variants={line}
                      style={{ originY: 0 }}
                      className="absolute bottom-0 top-12 w-[1.5px] bg-[#D4AF37]/35 transition-colors duration-300 group-hover:bg-[#D4AF37]/70"
                    />
                  )}
                </div>

                {/* Content column */}
                <div className="flex-1 pt-2">
                  <h3 className="mb-2 text-xl font-semibold text-[#0d1b3a] md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="max-w-2xl text-lg leading-relaxed text-[#4a5568]">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default CommitmentsSection;
