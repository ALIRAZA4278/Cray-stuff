"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function getTimeLeft(target) {
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function DropCountdown({ target }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(target));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units = [
    { label: "Days", value: timeLeft?.days ?? 0 },
    { label: "Hrs", value: timeLeft?.hours ?? 0 },
    { label: "Min", value: timeLeft?.minutes ?? 0 },
    { label: "Sec", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <div className="relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-lg border border-border p-8">
      <Image
        src="https://picsum.photos/seed/cray-next-drop/800/900"
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover grayscale-[50%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-black/10" />
      <div className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Next drop</p>
        <div className="mt-4 flex items-center gap-5">
          {units.map((unit) => (
            <div key={unit.label} className="w-12">
              <p className="text-2xl font-semibold tabular-nums">{String(unit.value).padStart(2, "0")}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted">{unit.label}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:border-accent"
        >
          <BellIcon />
          Get notified
        </button>
      </div>
    </div>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 12 6 8z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}
