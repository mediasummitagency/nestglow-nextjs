"use client";

import { useState } from "react";
import Image from "next/image";

const ROOMS = [
  { name: "Kitchen",      image: "/images/services/residential-cleaning/kitchen.png" },
  { name: "Bathrooms",    image: "/images/services/residential-cleaning/bathrooms.png" },
  { name: "Bedrooms",     image: "/images/services/residential-cleaning/bedrooms.png" },
  { name: "Living Areas", image: "/images/services/residential-cleaning/living-areas.png" },
];

function RoomCard({ name, image }: { name: string; image: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-charcoal" />
      {!imgError && (
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 288px"
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

export function RoomCarousel() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal text-center mb-10">
          What we clean
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ROOMS.map((room) => (
            <RoomCard key={room.name} name={room.name} image={room.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
