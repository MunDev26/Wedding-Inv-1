"use client";

import Image from "next/image";
import { useState } from "react";
import FadeUp from "@/components/ui/FadeUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { config } from "@/config/wedding.config";

const placeholderGradients = [
  "linear-gradient(135deg, #f0d5c8, #e4b0a5, #d08878)",
  "linear-gradient(135deg, #d4e0cc, #a8c09a, #7a9e68)",
  "linear-gradient(225deg, #c8d8e8, #9ab4cc, #6888a8)",
  "linear-gradient(135deg, #e8dcc8, #d4c0a0, #b89e74)",
  "linear-gradient(225deg, #e8c8d4, #d4a0b4, #b87090)",
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const photos = config.photos.gallery;

  return (
    <FadeUp className="section-max">
      <SectionHeader
        label="Gallery"
        title={<>Momen<br /><em className="italic text-rose">Bahagia</em></>}
      />
      <div className="grid grid-cols-2 gap-3 mt-8">
        {photos.map((p, i) => (
          <div
            key={i}
            onClick={() => setLightbox(i)}
            className={`relative rounded-[4px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[0.98] flex items-center justify-center ${p.wide ? "col-span-2" : ""}`}
            style={{
              background: p.src ? undefined : placeholderGradients[i],
              aspectRatio: p.wide ? "16/9" : "1",
            }}
          >
            {p.src ? (
              <Image
                src={p.src}
                alt={p.label}
                fill
                className="object-cover"
                sizes={p.wide ? "100vw" : "50vw"}
              />
            ) : (
              <span className="font-cormorant italic text-white/60 text-sm text-center px-4">📸 {p.label}</span>
            )}
            <div className="absolute inset-0 bg-[rgba(44,20,20,0.3)] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-2xl">⤢</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[500] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className={`relative w-full max-w-sm rounded-lg overflow-hidden`}
            style={{
              background: photos[lightbox].src ? undefined : placeholderGradients[lightbox],
              aspectRatio: photos[lightbox].wide ? "16/9" : "1",
            }}
          >
            {photos[lightbox].src && (
              <Image
                src={photos[lightbox].src}
                alt={photos[lightbox].label}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      )}
    </FadeUp>
  );
}
