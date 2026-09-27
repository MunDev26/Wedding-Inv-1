import FadeUp from "@/components/ui/FadeUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { config } from "@/config/wedding.config";

interface EventCardProps {
  type: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  calendarTitle: string;
  calendarStart: string;
  calendarEnd: string;
}

function EventCard({ type, name, date, time, venue, address, mapsUrl }: EventCardProps) {
  return (
    <div className="relative border border-gold-light rounded-[6px] p-7 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #c4a96b, #c9847a)" }} />
      <p className="text-[0.65rem] tracking-[0.35em] uppercase text-gold font-bold font-lato mb-2">{type}</p>
      <p className="font-cormorant text-[1.6rem] font-light text-dark mb-4">{name}</p>

      <div className="flex items-start gap-3 mb-[0.6rem]">
        <span className="text-rose text-sm mt-[3px] w-4 flex-shrink-0">📅</span>
        <span className="text-[0.85rem] text-dark-muted leading-relaxed"><strong className="text-dark">{date}</strong></span>
      </div>
      <div className="flex items-start gap-3 mb-[0.6rem]">
        <span className="text-rose text-sm mt-[3px] w-4 flex-shrink-0">🕐</span>
        <span className="text-[0.85rem] text-dark-muted leading-relaxed"><strong className="text-dark">{time}</strong></span>
      </div>
      <div className="flex items-start gap-3 mb-[0.6rem]">
        <span className="text-rose text-sm mt-[3px] w-4 flex-shrink-0">📍</span>
        <span className="text-[0.85rem] text-dark-muted leading-relaxed">
          <strong className="text-dark">{venue}</strong><br />{address}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-[4px] text-[0.75rem] font-bold tracking-[0.1em] uppercase text-white no-underline transition-all duration-200 bg-rose hover:bg-rose-dark">
          🗺 Google Maps
        </a>
      </div>
    </div>
  );
}

export default function EventSection() {
  return (
    <FadeUp className="section-max">
      <SectionHeader
        label="The Event"
        title={<>Detail<br /><em className="italic text-rose">Acara</em></>}
      />
      <div className="flex flex-col gap-5 mt-8">
        <EventCard
          {...config.akad}
          calendarTitle={`${config.akad.name} ${config.groom.nickname} & ${config.bride.nickname}`}
        />
        <EventCard
          {...config.resepsi}
          calendarTitle={`${config.resepsi.name} ${config.groom.nickname} & ${config.bride.nickname}`}
        />
      </div>
    </FadeUp>
  );
}
