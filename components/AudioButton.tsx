"use client";

import { useEffect, useRef, useState } from "react";
import { config } from "@/config/wedding.config";

export default function AudioButton({ autoPlay = false }: { autoPlay?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(config.music.src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    return () => { audioRef.current?.pause(); };
  }, []);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }, [autoPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      title="Putar / Pause musik"
      className={`fixed bottom-6 right-6 z-[100] w-11 h-11 rounded-full bg-rose text-white border-none flex items-center justify-center shadow-lg text-base transition-all duration-200 hover:scale-110 hover:bg-rose-dark ${playing ? "animate-pulse" : ""}`}
    >
      {playing ? "⏸" : "♪"}
    </button>
  );
}
