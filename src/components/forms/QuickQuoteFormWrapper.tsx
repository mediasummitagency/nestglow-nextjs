"use client";

import dynamic from "next/dynamic";

const QuickQuoteForm = dynamic(() => import("./QuickQuoteForm"), {
  ssr: false,
  loading: () => (
    <div className="h-[120px] bg-cream-100 rounded-xl animate-pulse" />
  ),
});

export default function QuickQuoteFormWrapper() {
  return <QuickQuoteForm />;
}
