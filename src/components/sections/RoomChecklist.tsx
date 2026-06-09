"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { roomChecklist } from "@/lib/checklist";

const roomImages: Record<string, string> = {
  "Kitchen":      "/images/services/rooms/kitchen.jpg",
  "Bathrooms":    "/images/services/rooms/bathrooms.jpg",
  "Bedrooms":     "/images/services/rooms/bedrooms.jpg",
  "Living Areas": "/images/services/rooms/living-areas.jpg",
};

export function RoomChecklist() {
  const [activeTab, setActiveTab] = useState(0);
  const active = roomChecklist[activeTab];

  return (
    <section className="border-t border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8 text-center">
          What&apos;s included
        </h2>

        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">

          {/* Left — tabs + large room image */}
          <div className="md:w-[420px] shrink-0 flex flex-col gap-10">
            <div role="tablist" aria-label="Room checklist" className="flex flex-nowrap gap-2">
              {roomChecklist.map((room, i) => (
                <button
                  key={room.room}
                  role="tab"
                  id={`checklist-tab-${i}`}
                  aria-selected={i === activeTab}
                  aria-controls={`checklist-panel-${i}`}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors whitespace-nowrap ${
                    i === activeTab
                      ? "bg-brand-dark text-cream border-brand-dark"
                      : "bg-cream-50 text-charcoal-70 border-charcoal/10 hover:border-brand hover:text-brand"
                  }`}
                >
                  {room.room}
                </button>
              ))}
            </div>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-charcoal/6 border border-charcoal/10">
              <Image
                key={active.room}
                src={roomImages[active.room]}
                alt={`${active.room} cleaning`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          </div>

          {/* Right — checklist */}
          <div className="flex-1 min-w-0 flex items-start">
            {roomChecklist.map((room, i) => (
              <div
                key={room.room}
                role="tabpanel"
                id={`checklist-panel-${i}`}
                aria-labelledby={`checklist-tab-${i}`}
                hidden={i !== activeTab}
                className="w-full"
              >
                <div className="flex gap-6">
                  {[
                    room.items.slice(0, Math.ceil(room.items.length / 2)),
                    room.items.slice(Math.ceil(room.items.length / 2)),
                  ].map((col, ci) => (
                    <ul key={ci} className="flex-1 space-y-3.5">
                      {col.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-base text-charcoal-70">
                          <CheckCircle size={17} className="text-brand-dark mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
