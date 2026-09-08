import React from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable glassmorphism shell. Light variant sits on paper sections;
 * `dark` renders a deep translucent micro-panel for demos that need depth.
 */
export const GlassPanel = React.forwardRef(function GlassPanel(
  { className, dark = false, as: Comp = "div", children, ...props },
  ref
) {
  return (
    <Comp
      ref={ref}
      className={cn(
        "rounded-2xl",
        dark ? "glass-panel-dark" : "glass-panel",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});

export default GlassPanel;