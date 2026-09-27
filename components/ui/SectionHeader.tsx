interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <>
      <p className="text-[0.7rem] tracking-[0.4em] uppercase text-gold font-lato font-normal text-center mb-3">
        {label}
      </p>
      <h2 className="font-cormorant text-[clamp(2rem,8vw,2.8rem)] font-light text-center text-dark leading-tight mb-4">
        {title}
      </h2>
      <div className="text-center text-gold text-lg tracking-[0.5em] my-6">— ✦ —</div>
    </>
  );
}
