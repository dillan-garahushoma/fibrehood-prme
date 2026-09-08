"use client";

import React from "react";
import { MeetingScheduler } from "@/components/ui/meeting-scheduler";

export default function MeetingSchedulerDemo() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper p-4 font-body">
      <div className="w-full max-w-[720px] text-center mb-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-signal mb-3">Installation scheduler</h2>
        <p className="text-sm text-ink-soft leading-relaxed">
          A full installation-request interface that dissolves into the dark journey surface rather than sitting in a framed modal.
        </p>
      </div>

      <div className="relative h-[680px] w-full max-w-5xl overflow-hidden bg-paper">
        {/* The "Stage" - Mock UI that is blurred in the background */}
        <div className="absolute inset-0 filter blur-[6px] saturate-[120%] opacity-[0.55] p-10 grid grid-cols-3 gap-6 bg-grid">
          <div className="flex flex-col gap-4">
             <div className="text-[11px] font-bold text-ink-soft uppercase tracking-[0.16em] mb-2">Todo · 71</div>
             <div className="bg-white border border-line rounded-xl p-4">
                <b className="block text-[13px] text-signal mb-2">Remove UI inconsistencies</b>
                <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-signal/5 text-ink-soft font-semibold">Bug</span>
             </div>
             <div className="bg-white border border-line rounded-xl p-4">
                <b className="block text-[13px] text-signal mb-2">TypeError: cannot read props</b>
                <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-signal/5 text-ink-soft font-semibold">Bug</span>
             </div>
          </div>
          <div className="flex flex-col gap-4">
             <div className="text-[11px] font-bold text-ink-soft uppercase tracking-[0.16em] mb-2">In Progress · 3</div>
             <div className="bg-white border border-line rounded-xl p-4">
                <b className="block text-[13px] text-signal mb-2">Remove contentData from API</b>
                <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-signal/5 text-ink-soft font-semibold">Perf</span>
             </div>
             <div className="bg-white border border-line rounded-xl p-4">
                <b className="block text-[13px] text-signal mb-2">Launch page assets</b>
                <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-signal/5 text-ink-soft font-semibold">Design</span>
             </div>
          </div>
          <div className="flex flex-col gap-4">
             <div className="text-[11px] font-bold text-ink-soft uppercase tracking-[0.16em] mb-2">Done</div>
             <div className="bg-white border border-line rounded-xl p-4">
                <b className="block text-[13px] text-signal mb-2">Optimize load times</b>
                <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-signal/5 text-ink-soft font-semibold">Perf</span>
             </div>
          </div>
        </div>

        {/* The blended panel sitting on top */}
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
          <div className="pointer-events-auto w-full">
            <MeetingScheduler
            />
          </div>
        </div>
      </div>
    </div>
  );
}
