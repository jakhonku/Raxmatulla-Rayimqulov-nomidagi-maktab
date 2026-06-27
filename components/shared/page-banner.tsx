import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Reveal } from "./reveal";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

/**
 * Ichki sahifalar uchun yagona uslubdagi sarlavha banneri.
 * (Reusable page banner with breadcrumbs for inner pages.)
 */
export function PageBanner({ title, description, breadcrumbs = [] }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-grid">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-primary-100/50 blur-3xl" />
      </div>
      <div className="container py-12 lg:py-16">
        <Reveal>
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
            <Link
              href="/"
              className="flex items-center gap-1 transition-colors hover:text-primary-700"
            >
              <Home className="h-3.5 w-3.5" />
              Bosh sahifa
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-primary-700"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-slate-700">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-slate-900 text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
