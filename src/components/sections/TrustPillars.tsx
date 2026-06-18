import { ShieldCheck, Award, ThumbsUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const pillars = [
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: Award, label: "10+ years of experience" },
  { icon: ThumbsUp, label: "Satisfaction guaranteed" },
  { icon: Clock, label: "On-time,\nevery time" },
];

interface TrustPillarsProps {
  variant?: "light" | "dark";
}

export function TrustPillars({ variant = "light" }: TrustPillarsProps) {
  const isDark = variant === "dark";
  return (
    <div className="w-[85%] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
      {pillars.map((p, i) => {
        const Icon = p.icon;
        return (
          <div
            key={p.label}
            className={cn(
              "flex flex-col items-center gap-2.5 rounded-xl p-4 text-center",
              i >= 2 && "hidden sm:flex",
              isDark
                ? "bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-black/20"
                : "bg-cream-50 border border-charcoal/10 shadow-md"
            )}
          >
            <Icon size={22} className={isDark ? "text-white/90" : "text-brand"} />
            <p className={cn("text-xs font-medium leading-snug whitespace-pre-line", isDark ? "text-white/90" : "text-charcoal-70")}>
              {p.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
