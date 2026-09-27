"use client";

import { useEffect, useState } from "react";
import { supabase, type Wish } from "@/lib/supabase";

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

const ATTENDANCE_LABEL: Record<string, string> = {
  hadir: "✅ Hadir",
  tidak: "❌ Tidak Hadir",
  ragu: "❓ Belum Pasti",
};

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [guestName, setGuestName] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!authed) return;
    const fetchWishes = async () => {
      const { data } = await supabase
        .from("wishes")
        .select("*")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });
      if (data) setWishes(data);
      setLoading(false);
    };
    fetchWishes();

    const channel = supabase
      .channel("admin-wishes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "wishes" }, (payload) => {
        setWishes((prev) => [payload.new as Wish, ...prev]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [authed]);

  const login = () => {
    if (pass === ADMIN_PASS) { setAuthed(true); setPassError(false); }
    else setPassError(true);
  };

  const deleteWish = async (id: string) => {
    await supabase.from("wishes").update({ is_deleted: true }).eq("id", id);
    setWishes((prev) => prev.filter((w) => w.id !== id));
  };

  const generateLink = () => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    return `${base}/?to=${encodeURIComponent(guestName)}`;
  };

  const shareWhatsApp = () => {
    const link = generateLink();
    const msg = `Assalamu'alaikum, kami mengundang *${guestName}* untuk hadir di pernikahan kami:\n\n${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generateLink());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const countByAttendance = (type: string) => wishes.filter((w) => w.attendance === type).length;

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm text-center">
          <h1 className="font-cormorant text-3xl text-dark mb-2">Admin</h1>
          <p className="text-[0.8rem] text-dark-muted mb-6 font-lato">Masukkan password untuk melanjutkan</p>
          <input
            type="password" value={pass} onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="Password admin"
            className={`w-full px-4 py-3 border rounded-[4px] font-lato text-sm text-dark bg-cream outline-none mb-3 transition-colors ${passError ? "border-red-400" : "border-[#e8d5c4] focus:border-rose"}`}
          />
          {passError && <p className="text-red-500 text-[0.75rem] mb-3">Password salah.</p>}
          <button onClick={login} className="w-full py-3 bg-rose text-white font-lato text-[0.8rem] tracking-[0.2em] uppercase rounded-[4px] hover:bg-rose-dark transition-colors">
            Masuk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-cormorant text-4xl text-dark mb-1">Dashboard Admin</h1>
        <p className="font-lato text-[0.8rem] text-dark-muted mb-8">Martio &amp; Mia · 14 Feb 2026</p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Total Ucapan", val: wishes.length },
            { label: "Hadir", val: countByAttendance("hadir") },
            { label: "Tidak Hadir", val: countByAttendance("tidak") },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gold-light rounded-lg p-4 text-center">
              <p className="font-cormorant text-3xl text-rose">{s.val}</p>
              <p className="font-lato text-[0.7rem] uppercase tracking-wider text-dark-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gold-light rounded-lg p-6 mb-8">
          <h2 className="font-cormorant text-xl text-dark mb-4">Generator Link Tamu</h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text" value={guestName} onChange={e => setGuestName(e.target.value)}
              placeholder="Nama tamu (contoh: Budi)"
              className="flex-1 px-4 py-2 border border-[#e8d5c4] rounded-[4px] font-lato text-sm text-dark bg-cream outline-none focus:border-rose"
            />
          </div>
          {guestName && (
            <p className="font-lato text-[0.75rem] text-dark-muted bg-cream rounded px-3 py-2 mb-3 break-all">{generateLink()}</p>
          )}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={copyLink} disabled={!guestName}
              className="px-5 py-2 bg-dark text-white font-lato text-[0.75rem] uppercase tracking-wider rounded-[4px] hover:bg-[#5a3535] disabled:opacity-40 transition-colors"
            >
              {copiedLink ? "✓ Tersalin!" : "⎘ Salin Link"}
            </button>
            <button
              onClick={shareWhatsApp} disabled={!guestName}
              className="px-5 py-2 font-lato text-[0.75rem] uppercase tracking-wider rounded-[4px] disabled:opacity-40 transition-colors text-white"
              style={{ background: "#25D366" }}
            >
              ✉ Kirim via WhatsApp
            </button>
          </div>
        </div>

        <div className="bg-white border border-gold-light rounded-lg p-6">
          <h2 className="font-cormorant text-xl text-dark mb-4">Moderasi Ucapan ({wishes.length})</h2>
          {loading && <p className="text-dark-muted font-lato text-sm">Memuat...</p>}
          {!loading && wishes.length === 0 && (
            <p className="text-dark-muted font-lato text-sm text-center py-8">Belum ada ucapan masuk.</p>
          )}
          <div className="flex flex-col gap-4">
            {wishes.map((w) => (
              <div key={w.id} className="border border-[#e8d5c4] rounded-lg p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-cormorant text-[1.05rem] font-semibold text-dark">{w.name}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[0.7rem] text-dark-muted font-lato">{timeAgo(w.created_at)}</span>
                    <button
                      onClick={() => deleteWish(w.id)}
                      className="text-[0.7rem] text-red-400 hover:text-red-600 font-lato uppercase tracking-wider transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <span className="font-lato text-[0.7rem] text-dark-muted">{ATTENDANCE_LABEL[w.attendance] || w.attendance}</span>
                <p className="mt-2 text-[0.85rem] text-dark-muted italic leading-relaxed">&ldquo;{w.message}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
