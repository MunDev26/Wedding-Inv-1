import Image from "next/image";
import FadeUp from "@/components/ui/FadeUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { config } from "@/config/wedding.config";

function CoupleCard({
  photo, emoji, name, fullName, position, parents,
}: {
  photo: string; emoji: string; name: string; fullName: string; position: string; parents: string;
}) {
  return (
    <div className="text-center">
      <div
        className="w-full aspect-square rounded-full overflow-hidden flex items-center justify-center text-[2.5rem] mx-auto mb-4"
        style={{ background: "linear-gradient(135deg, #e8b4ae, #c9847a)" }}
      >
        {photo ? (
          <Image src={photo} alt={name} width={200} height={200} className="w-full h-full object-cover" />
        ) : (
          emoji
        )}
      </div>
      <p className="font-dancing text-[1.6rem] text-dark">{name}</p>
      <p className="text-[0.75rem] text-dark-muted mt-1 leading-relaxed italic">{fullName}</p>
      <p className="text-[0.7rem] text-dark-muted mt-2 leading-relaxed">
        {position}<br />{parents}
      </p>
    </div>
  );
}

export default function Couple() {
  return (
    <FadeUp className="section-max">
      <SectionHeader
        label="The Couple"
        title={<>Kedua<br /><em className="italic text-rose">Mempelai</em></>}
      />
      <div className="grid grid-cols-2 gap-6 mt-8">
        <CoupleCard
          photo={config.groom.photo}
          emoji={config.groom.photoEmoji}
          name={config.groom.nickname}
          fullName={config.groom.fullName}
          position={config.groom.childOrder}
          parents={config.groom.parents}
        />
        <CoupleCard
          photo={config.bride.photo}
          emoji={config.bride.photoEmoji}
          name={config.bride.nickname}
          fullName={config.bride.fullName}
          position={config.bride.childOrder}
          parents={config.bride.parents}
        />
      </div>
      <p className="text-center font-cormorant italic text-[2.5rem] text-gold py-4">❧</p>
    </FadeUp>
  );
}
