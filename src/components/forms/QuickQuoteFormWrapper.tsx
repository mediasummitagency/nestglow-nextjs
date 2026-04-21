"use client";

import { useState, useEffect } from "react";
import QuickQuoteForm from "./QuickQuoteForm";

export default function QuickQuoteFormWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[120px] bg-cream-100 rounded-xl animate-pulse" />;
  }

  return <QuickQuoteForm />;
}
