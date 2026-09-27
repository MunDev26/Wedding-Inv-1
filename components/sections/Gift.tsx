"use client";

import Image from "next/image";
import { useState } from "react";
import FadeUp from "@/components/ui/FadeUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { config } from "@/config/wedding.config";

type Tab = "bank" | "qris" | "kado";

function BankCard({ bank, number, holder }: { bank: string; number: string; holder: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(number.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="mb-4">
      <div className="relative rounded-lg p-7 text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #4a2020, #7a3535)" }}>
        <div className="absolute -right-8 -top-8 w-[120px] h-[120px] rounded-full bg-white/5" />
        <p className="text-[0.7rem] tracking-[0.2em] uppercase text-gold-light mb-1 font-lato">{bank}</p>
        <p className="font-lato text-[1.4rem] tracking-[0.12em] my-2">{number}</p>
        <p className="text-[0.85rem] text-white/70">a/n {holder}</p>
      </div>
      <button
        onClick={copy}
        className="flex items-center justify-center gap-2 w-full mt-3 py-[0.8rem] border border-gold-light rounded-[4px] bg-white text-dark font-lato text-[0.8rem] tracking-[0.15em] uppercase transition-all duration-200 hover:bg-gold-light"
      >
        {copied ? "✓ Tersalin!" : "⎘ Salin Nomor Rekening"}
      </button>
    </div>
  );
}

export default function Gift() {
  const [tab, setTab] = useState<Tab>("bank");
  const [copied, setCopied] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "bank", label: "Transfer Bank" },
    { id: "qris", label: "QRIS" },
    { id: "kado", label: "Kado Fisik" },
  ];

  const { address } = config.gift;
  const copyAddress = () => {
    navigator.clipboard.writeText(address.lines.replace(/\n/g, ", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <FadeUp className="section-max">
      <SectionHeader
        label="Wedding Gift"
        title={<>Amplop<br /><em className="italic text-rose">Digital</em></>}
      />
      <p className="text-center text-[0.85rem] text-dark-muted mt-4 leading-relaxed">
        Doa restu Anda adalah hadiah terindah bagi kami. Namun jika ingin berbagi kebahagiaan, berikut informasinya.
      </p>

      <div className="flex mt-8 rounded-[6px] overflow-hidden border border-gold-light">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-3 text-[0.75rem] tracking-[0.15em] uppercase font-lato border-none cursor-pointer transition-all duration-200 ${tab === t.id ? "bg-rose text-white" : "bg-white text-dark-muted"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "bank" && (
          <>
            {config.gift.banks.map((b) => (
              <BankCard key={b.bank} bank={b.bank} number={b.number} holder={b.holder} />
            ))}
          </>
        )}

        {tab === "qris" && (
          <div className="text-center p-6 border border-gold-light rounded-lg bg-white">
            {config.gift.qris.imageSrc ? (
              <Image
                src={config.gift.qris.imageSrc}
                alt="QRIS"
                width={160}
                height={160}
                className="mx-auto mb-4 rounded-[4px]"
              />
            ) : (
              <div
                className="w-40 h-40 mx-auto mb-4 border-4 border-dark rounded-[4px] opacity-70"
                style={{ background: "repeating-conic-gradient(#3d2c2c 0% 25%, white 0% 50%) 0 0 / 12px 12px" }}
              />
            )}
            <p className="text-[0.8rem] text-dark-muted">Scan QRIS untuk transfer hadiah digital</p>
            <p className="text-[0.75rem] text-dark-muted mt-1 italic">a/n {config.gift.qris.holder}</p>
          </div>
        )}

        {tab === "kado" && (
          <div>
            <div className="p-6 border border-gold-light rounded-lg bg-white leading-relaxed text-[0.9rem] text-dark-muted">
              <strong className="text-dark block mb-2 text-base">Alamat Pengiriman Kado</strong>
              {address.lines.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
              <br />
              <strong className="text-[0.8rem]">Penerima: {address.recipient} ({address.phone})</strong>
            </div>
            <button
              onClick={copyAddress}
              className="flex items-center justify-center gap-2 w-full mt-3 py-[0.8rem] border border-gold-light rounded-[4px] bg-white text-dark font-lato text-[0.8rem] tracking-[0.15em] uppercase transition-all duration-200 hover:bg-gold-light"
            >
              {copied ? "✓ Tersalin!" : "⎘ Salin Alamat"}
            </button>
          </div>
        )}
      </div>
    </FadeUp>
  );
}
