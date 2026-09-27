"use client";

import { config } from "@/config/wedding.config";

interface CoverProps {
  guestName: string;
  onOpen: () => void;
}

export default function Cover({ guestName, onOpen }: CoverProps) {
  return (
    <div
      id="cover"
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center text-center px-8 py-8"
      style={{ background: "linear-gradient(160deg, #2b1a1a 0%, #4a2020 50%, #1e1010 100%)" }}
    >
      <p className="font-lato font-light text-[0.75rem] tracking-[0.4em] uppercase text-gold mb-8">
        ✦ Undangan Pernikahan ✦
      </p>

      <p className="font-lato font-light text-[0.8rem] tracking-[0.2em] uppercase text-gold-light mb-2">
        Kepada Yth.
      </p>
      <p className="font-cormorant italic font-light text-white text-2xl mb-10">
        {guestName || "Tamu Undangan"}
      </p>

      <div className="font-dancing text-rose-light leading-tight mb-2" style={{ fontSize: "clamp(2.8rem, 10vw, 4.5rem)" }}>
        {config.groom.nickname}
        <span className="block font-cormorant italic text-gold text-[2rem] leading-none my-1">&</span>
        {config.bride.nickname}
      </div>

      <p className="font-lato font-light tracking-[0.35em] uppercase text-gold-light text-[0.8rem] mt-6">
        {config.wedding.dateText}
      </p>

      <div className="w-[60px] h-px bg-gold my-6" />

      <button
        onClick={onOpen}
        className="px-10 py-[0.9rem] border border-gold text-gold font-lato font-light tracking-[0.25em] text-[0.8rem] uppercase bg-transparent rounded-sm transition-all duration-300 hover:bg-gold hover:text-[#2b1a1a]"
      >
        ✉ Buka Undangan
      </button>
      <p className="mt-4 text-[0.75rem] text-dark-muted italic tracking-wide">♪ Akan memutar musik latar</p>
    </div>
  );
}
