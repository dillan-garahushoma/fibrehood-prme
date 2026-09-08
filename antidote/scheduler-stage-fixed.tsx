"use client";

/**
 * BUG: the original <MeetingScheduler> is `max-w-4xl` (896px) with h-10 (40px)
 * calendar cells — sized for a full standalone booking page. Dropped straight
 * into a scroll-stage panel that's ~700px wide, it simply doesn't fit: the
 * calendar (left half of its internal grid) renders, but the form/footer
 * (right half) runs past the edge of the stage and gets hard-clipped by
 * `overflow-hidden` on the Card — which is why it looked like it "starts on
 * one side and fades into an unfinished side." overflow:hidden is a clip,
 * not a blend, and it's clipping asymmetrically because the component's
 * own internal layout is left-to-right, not centered.
 *
 * Fix: don't fight the component's natural size. Scale the whole thing down
 * with a CSS transform (so all its internal proportions/spacing stay
 * correct — nothing needs to be rebuilt), center that scaled box inside the
 * stage, and apply the same edge-mask technique used elsewhere so it blends
 * instead of getting clipped.
 */

import { MeetingScheduler } from "@/components/ui/meeting-scheduler";

export function SchedulerStage({
  active,
  onSchedule,
  onCancel,
  initialStartDate,
  initialEndDate,
}: {
  active: boolean;
  onSchedule: (details: { startDate: Date | null; endDate: Date | null; aiNotes: boolean }) => void;
  onCancel: () => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}) {
  return (
    <div
      className="relative w-full mx-auto overflow-hidden rounded-2xl"
      style={{
        // same footprint as the other stage panels (map / plans / globe) —
        // keep every step of the sequence the same size so nothing jumps.
        maxWidth: 720,
        height: 480,
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0, #000 46px, #000 calc(100% - 46px), transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0, #000 46px, #000 calc(100% - 46px), transparent 100%)",
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: active ? 1 : 0 }}
      >
        {/*
          Scale the real component down instead of rebuilding it. transform-
          origin center + a fixed unscaled box (so the flex centering has a
          real size to center) keeps left/right margins symmetric, unlike
          the original which was pinned to the left edge of its parent.
        */}
        <div
          style={{
            width: 896,          // matches the component's own max-w-4xl
            transform: "scale(0.62)",
            transformOrigin: "center center",
          }}
        >
          <MeetingScheduler
            title="Schedule installation"
            description="Choose a day and arrival window that works for your home."
            scheduleButtonText="Request installation"
            initialStartDate={initialStartDate}
            initialEndDate={initialEndDate}
            onSchedule={onSchedule}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
}
