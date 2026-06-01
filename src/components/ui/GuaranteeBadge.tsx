import { CheckCircle } from "lucide-react";

export function GuaranteeBadge({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-sm text-charcoal-70 ${className ?? ""}`}>
      <CheckCircle size={15} className="text-brand-dark shrink-0" />
      <span>100% satisfaction guarantee — we&apos;ll make it right or it&apos;s free.</span>
    </div>
  );
}
