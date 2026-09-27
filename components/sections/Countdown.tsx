"use client";

import { useEffect, useState } from "react";
import FadeUp from "@/components/ui/FadeUp";
import { config } from "@/config/wedding.config";

const WEDDING_DATE = new Date(config.wedding.dateISO);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    const update = () => {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Hari", val: time.d },
    { label: "Jam", val: time.h },
    { label: "Menit", val: time.m },
    { label: "Detik", val: time.s },
  ];

  return (
    <FadeUp
      className="py-16 px-6 w-full"
      style={{ background: "linear-gradient(135deg, #4a2020, #2b1a1a)" }}
    >
      <div className="max-w-mobile mx-auto">
        <p className="text-[0.7rem] tracking-[0.4em] uppercase text-gold-light font-lato text-center mb-3">
          Counting Down
        </p>
        <h2 className="font-cormorant text-[clamp(2rem,8vw,2.8rem)] font-light text-center text-white leading-tight mb-4">
          Menuju<br /><em className="italic text-gold">Hari Bahagia</em>
        </h2>
        <div className="text-center text-gold-light text-lg tracking-[0.5em] my-6">— ✦ —</div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {units.map((u, i) => (
            <>
              <div key={u.label} className="text-center">
                <div className="font-cormorant font-light text-gold leading-none" style={{ fontSize: "clamp(2.5rem,12vw,3.5rem)" }}>
                  {u.val}
                </div>
                <div className="text-[0.6rem] tracking-[0.2em] uppercase text-white/50 mt-1 font-lato">{u.label}</div>
              </div>
              {i < units.length - 1 && (
                <span key={`sep-${i}`} className="font-cormorant text-[2.5rem] text-gold opacity-40 self-start pt-1">:</span>
              )}
            </>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}
