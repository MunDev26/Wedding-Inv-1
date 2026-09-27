import Image from "next/image";
import FadeUp from "@/components/ui/FadeUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { config } from "@/config/wedding.config";

export default function Hero() {
  return (
    <FadeUp className="section-max">
      <SectionHeader
        label="Wedding Invitation"
        title={<>Kami Menikah<br /><em className="italic text-rose">dengan penuh syukur</em></>}
      />
      <div
        className="w-full rounded-[4px] overflow-hidden flex items-center justify-center font-cormorant italic text-[#7a4040]"
        style={{
          aspectRatio: "3/4",
          background: "linear-gradient(135deg, #e8d5c4 0%, #d4a8a0 50%, #c9847a 100%)",
        }}
      >
        {config.photos.hero ? (
          <Image
            src={config.photos.hero}
            alt={`${config.groom.nickname} & ${config.bride.nickname}`}
            width={600}
            height={800}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg opacity-60">📸 Foto Prewedding Utama</span>
        )}
      </div>
      <blockquote className="font-cormorant italic text-lg text-dark-muted text-center leading-relaxed mt-8 px-4">
        &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.&rdquo;
        <cite className="not-italic font-lato text-[0.7rem] tracking-[0.2em] uppercase text-gold block mt-3">
          — QS. Ar-Rum: 21
        </cite>
      </blockquote>
    </FadeUp>
  );
}
