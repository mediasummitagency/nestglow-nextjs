import { ChevronDown } from 'lucide-react'

export function ScrollHint() {
  return (
    <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-1.5 z-30 pointer-events-none">
      <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/60">
        Scroll
      </span>
      <ChevronDown size={16} className="text-white/60 animate-bounce" />
    </div>
  )
}
