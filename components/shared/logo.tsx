import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  subtitle?: string;
  title?: string;
}

/**
 * Maktab logotipi va nomi. (School emblem + name lockup.)
 */
export function Logo({
  className,
  variant = "dark",
  title = "R. Rayimqulov maktabi",
  subtitle = "Umumiy o'rta ta'lim maktabi",
}: LogoProps) {
  const isLight = variant === "light";
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-soft ring-1 ring-white/10 transition-transform group-hover:scale-105">
        <GraduationCap className="h-6 w-6" />
        <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-gold" />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-heading text-[15px] font-extrabold tracking-tight",
            isLight ? "text-white" : "text-slate-900",
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "text-[11px] font-medium",
            isLight ? "text-white/70" : "text-slate-500",
          )}
        >
          {subtitle}
        </span>
      </span>
    </Link>
  );
}
