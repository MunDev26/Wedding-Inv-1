import { config } from "@/config/wedding.config";

export default function FooterSection() {
  return (
    <footer
      className="text-white text-center py-16 px-6"
      style={{ background: "linear-gradient(160deg, #2b1a1a, #1e1010)" }}
    >
      <p className="text-[0.7rem] tracking-[0.4em] uppercase text-gold font-lato">Thank You</p>
      <p className="font-dancing text-rose-light text-[2.5rem] my-4">
        {config.groom.nickname} &amp; {config.bride.nickname}
      </p>
      <p className="text-[0.75rem] tracking-[0.4em] uppercase text-gold font-lato">{config.wedding.dateShort}</p>
      <div className="text-center text-gold text-lg tracking-[0.5em] my-6">— ✦ —</div>
      <p className="font-cormorant italic text-white/50 text-base leading-relaxed mt-6">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami<br />
        apabila Bapak/Ibu/Saudara/i berkenan hadir<br />
        dan memberikan doa restu.<br /><br />
        Wassalamu&apos;alaikum Wr. Wb.
      </p>
      <div className="text-gold text-lg tracking-[0.5em] mt-6">✦</div>
      <p className="mt-8 text-[0.7rem] tracking-[0.15em] uppercase text-white/20 font-lato">
        Made with ♥ — MunDev
      </p>
    </footer>
  );
}
