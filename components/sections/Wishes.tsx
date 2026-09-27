"use client";

import { useEffect, useState } from "react";
import FadeUp from "@/components/ui/FadeUp";
import SectionHeader from "@/components/ui/SectionHeader";
import { supabase, type Wish } from "@/lib/supabase";

const ATTENDANCE_LABEL: Record<string, { label: string; color: string }> = {
  hadir: { label: "Hadir", color: "bg-green-50 text-green-800" },
  tidak: { label: "Tidak Hadir", color: "bg-pink-50 text-red-800" },
  ragu: { label: "Masih Belum Pasti", color: "bg-yellow-50 text-yellow-800" },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchWishes = async () => {
      const { data } = await supabase
        .from("wishes")
        .select("*")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setWishes(data);
    };

    fetchWishes();

    const channel = supabase
      .channel("wishes-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "wishes" }, (payload) => {
        setWishes((prev) => [payload.new as Wish, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance || !message.trim()) return;
    setSubmitting(true);

    const { error } = await supabase.from("wishes").insert({
      name: name.trim(),
      attendance,
      message: message.trim(),
      is_deleted: false,
    });

    if (!error) {
      setName(""); setAttendance(""); setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
    setSubmitting(false);
  };

  return (
    <FadeUp className="section-max">
      <SectionHeader
        label="Wishes & Prayers"
        title={<>Ucapan<br /><em className="italic text-rose">&amp; Doa</em></>}
      />

      <form onSubmit={handleSubmit} className="bg-white border border-gold-light rounded-lg p-6 mt-8">
        <div className="mb-4">
          <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-gold font-lato mb-1">Nama Anda</label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Tulis nama Anda..."
            className="w-full px-4 py-3 border border-[#e8d5c4] rounded-[4px] font-lato text-[0.9rem] text-dark bg-cream outline-none focus:border-rose transition-colors"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-gold font-lato mb-1">Kehadiran</label>
          <select
            value={attendance} onChange={e => setAttendance(e.target.value)}
            className="w-full px-4 py-3 border border-[#e8d5c4] rounded-[4px] font-lato text-[0.9rem] text-dark bg-cream outline-none focus:border-rose transition-colors"
          >
            <option value="">-- Pilih --</option>
            <option value="hadir">Insya Allah Hadir ✓</option>
            <option value="tidak">Tidak Dapat Hadir ✗</option>
            <option value="ragu">Masih Belum Pasti</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[0.7rem] tracking-[0.2em] uppercase text-gold font-lato mb-1">Ucapan &amp; Doa</label>
          <textarea
            value={message} onChange={e => setMessage(e.target.value)}
            placeholder="Tuliskan ucapan dan doa terbaik Anda..."
            rows={4}
            className="w-full px-4 py-3 border border-[#e8d5c4] rounded-[4px] font-lato text-[0.9rem] text-dark bg-cream outline-none focus:border-rose transition-colors resize-y"
          />
        </div>
        <button
          type="submit" disabled={submitting}
          className="w-full py-[0.9rem] bg-rose text-white border-none rounded-[4px] font-lato text-[0.8rem] tracking-[0.25em] uppercase cursor-pointer transition-colors duration-200 hover:bg-rose-dark disabled:opacity-50"
        >
          {submitted ? "✓ Ucapan Terkirim!" : submitting ? "Mengirim..." : "✈ Kirim Ucapan"}
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-8">
        {wishes.map((w) => {
          const att = ATTENDANCE_LABEL[w.attendance] ?? { label: w.attendance, color: "bg-gray-50 text-gray-700" };
          return (
            <div key={w.id} className="bg-white border-l-[3px] border-rose-light rounded-r-lg px-5 py-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-cormorant text-[1.05rem] font-semibold text-dark">{w.name}</span>
                <span className="text-[0.7rem] text-dark-muted">{timeAgo(w.created_at)}</span>
              </div>
              <span className={`inline-block text-[0.65rem] tracking-[0.15em] uppercase px-2 py-[0.2rem] rounded-[2px] mb-2 font-lato ${att.color}`}>
                {att.label}
              </span>
              <p className="text-[0.85rem] text-dark-muted leading-relaxed italic">&ldquo;{w.message}&rdquo;</p>
            </div>
          );
        })}
      </div>
    </FadeUp>
  );
}
