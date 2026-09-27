"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Cover from "@/components/Cover";
import AudioButton from "@/components/AudioButton";
import Hero from "@/components/sections/Hero";
import Couple from "@/components/sections/Couple";
import EventSection from "@/components/sections/EventSection";
import Countdown from "@/components/sections/Countdown";
import Story from "@/components/sections/Story";
import Gallery from "@/components/sections/Gallery";
import Gift from "@/components/sections/Gift";
import FooterSection from "@/components/sections/FooterSection";

const Wishes = dynamic(() => import("@/components/sections/Wishes"), { ssr: false });

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuestName(params.get("to") || "");
  }, []);

  return (
    <>
      {!opened && (
        <Cover guestName={guestName} onOpen={() => setOpened(true)} />
      )}

      <div className={`transition-opacity duration-700 ${opened ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <AudioButton autoPlay={opened} />
        <main className="bg-cream">
          <Hero />
          <Couple />
          <EventSection />
          <Countdown />
          <Story />
          <Gallery />
          <Gift />
          <Wishes />
          <FooterSection />
        </main>
      </div>
    </>
  );
}
