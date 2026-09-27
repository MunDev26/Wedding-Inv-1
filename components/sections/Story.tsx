import FadeUp from "@/components/ui/FadeUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { config } from "@/config/wedding.config";

export default function Story() {
  return (
    <FadeUp className="section-max">
      <SectionHeader
        label="Our Story"
        title={<>Kisah<br /><em className="italic text-rose">Cinta Kami</em></>}
      />
      <div className="relative mt-10 pl-6">
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, #e8d5a3, transparent)" }} />
        {config.story.map((e) => (
          <div key={e.year} className="relative mb-10">
            <div className="absolute -left-[1.75rem] top-1 w-[10px] h-[10px] rounded-full bg-gold border-2 border-cream shadow-[0_0_0_3px_#e8d5a3]" />
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-gold font-bold font-lato mb-1">{e.year}</p>
            <p className="font-cormorant text-[1.15rem] font-semibold text-dark mb-1">{e.title}</p>
            <p className="text-[0.82rem] text-dark-muted leading-relaxed">{e.desc}</p>
          </div>
        ))}
      </div>
    </FadeUp>
  );
}
