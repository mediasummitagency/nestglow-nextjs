"use client";

import { useState } from "react";
import Image from "next/image";

export type RoomItem = { name: string; image: string };

const RESIDENTIAL_ROOMS: RoomItem[] = [
  { name: "Kitchen",      image: "/images/services/residential-cleaning/kitchen.png" },
  { name: "Bathrooms",    image: "/images/services/residential-cleaning/bathrooms.png" },
  { name: "Bedrooms",     image: "/images/services/residential-cleaning/bedrooms.png" },
  { name: "Living Areas", image: "/images/services/residential-cleaning/living-areas.png" },
];

export const COMMERCIAL_SPACES: RoomItem[] = [
  { name: "Reception",         image: "/images/services/commercial-cleaning/reception.png" },
  { name: "Conference Rooms",  image: "/images/services/commercial-cleaning/conference-room.png" },
  { name: "Workstations",      image: "/images/services/commercial-cleaning/workstations.png" },
  { name: "Break Room",        image: "/images/services/commercial-cleaning/break-room.png" },
];

function RoomCard({ name, image }: RoomItem) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-charcoal" />
      {!imgError && (
        <Image
          src={image}
          alt={name}
          fill
          quality={90}
          className="object-cover object-center"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
          onError={() => setImgError(true)}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
      <p className="absolute bottom-4 left-4 text-cream font-semibold text-lg leading-tight">
        {name}
      </p>
    </div>
  );
}

export function RoomCarousel({
  rooms = RESIDENTIAL_ROOMS,
  title = "What we clean",
  footerText,
  ctaSubtext,
  ctaLabel,
  ctaHref,
}: {
  rooms?: RoomItem[];
  title?: string;
  footerText?: string;
  ctaSubtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal text-center mb-10">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <RoomCard key={room.name} {...room} />
          ))}
        </div>
        {(footerText || ctaLabel) && (
          <div className="mt-10 text-center space-y-3">
            {footerText && (
              <p className="text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto">
                {footerText}
              </p>
            )}
            {ctaSubtext && (
              <p className="text-base text-charcoal/70">
                {ctaSubtext}
              </p>
            )}
            {ctaLabel && ctaHref && (
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 mt-2 bg-charcoal text-cream font-semibold px-6 py-3 rounded-full hover:bg-charcoal-70 transition-colors"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
