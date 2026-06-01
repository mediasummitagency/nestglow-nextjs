// TODO: Ask Caroline for reviews from Ocean County and Middlesex County
// clients, and any reviews where she knows the specific town. Do not fabricate.

export interface Review {
  name: string;
  date: string;
  dateDisplay: string;
  rating: number;
  quote: string;
  body: string;
  location: string;
  town?: string;
  county?: "Monmouth" | "Ocean" | "Middlesex";
  service?: string;
}

export const reviews: Review[] = [
  {
    name: "Eileen S.",
    date: "2025-10-08",
    dateDisplay: "October 2025",
    rating: 5,
    quote:
      "Caroline was so kind and very professional. She arrived promptly right on time at 9 AM. Communication and reminders were sent to keep us updated about our appointment and her arrival time.",
    body: "I'm so happy I scheduled with Caroline and her team. Caroline was so kind and very professional. She arrived promptly right on time at 9 AM. Communication and reminders were sent to keep us updated about our appointment and her arrival time. She was very detailed in cleaning our house top to bottom, and the house sparkled when she was done. I highly recommend NestGlow Co for your cleaning needs.",
    location: "Monmouth County, NJ",
    county: "Monmouth",
  },
  {
    name: "Jeffrey R.",
    date: "2020-01-31",
    dateDisplay: "January 2020",
    rating: 5,
    quote:
      "Caroline is extremely dependable and does a great job. She is very flexible with my schedule. My house is sparkling after she leaves!",
    body: "Caroline is extremely dependable and does a great job. She is very flexible with my schedule and always accommodates my schedule. My house is sparkling after she leaves! I would highly recommend her.",
    location: "Monmouth County, NJ",
    county: "Monmouth",
  },
  {
    name: "Greg A.",
    date: "2020-01-31",
    dateDisplay: "January 2020",
    rating: 5,
    quote: "Caroline is punctual, flexible, and dependable! I love walking into my house when she's been here!",
    body: "Caroline is punctual, flexible, and dependable! I love walking into my house when she's been here!",
    location: "Monmouth County, NJ",
    county: "Monmouth",
  },
  {
    name: "Elena H.",
    date: "2020-01-29",
    dateDisplay: "January 2020",
    rating: 5,
    quote:
      "Caroline has been cleaning my home for 4+ years. She is professional, reliable, thorough, and always does an exceptional job.",
    body: "Caroline has been cleaning my home for 4+ years. She is professional, reliable, thorough, and always does an exceptional job. She is flexible and easy to communicate with. I look forward to coming home after she has been there. I highly recommend her services!",
    location: "Monmouth County, NJ",
    county: "Monmouth",
  },
  {
    name: "Danny H.",
    date: "2020-01-29",
    dateDisplay: "January 2020",
    rating: 5,
    quote:
      "Caroline is great! She pays attention to detail and the house is always spotless. She is by far the best.",
    body: "Caroline is great! She cleans my house bi-weekly and I couldn't be happier. She pays attention to detail and the house is always spotless. I've tried other cleaners in the past and she is by far the best. Highly recommend!",
    location: "Monmouth County, NJ",
    county: "Monmouth",
  },
];
