import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-grid">
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-3xl bg-primary-50 text-primary-600">
          <Search className="h-10 w-10" />
        </span>
        <p className="mt-6 font-heading text-7xl font-extrabold text-primary-200">404</p>
        <h1 className="mt-2 font-heading text-2xl font-bold text-slate-900">
          Sahifa topilmadi
        </h1>
        <p className="mt-3 max-w-md text-slate-600">
          Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi
          mumkin.
        </p>
        <Link href="/" className="mt-8">
          <Button size="lg">
            <Home className="h-4 w-4" />
            Bosh sahifaga qaytish
          </Button>
        </Link>
      </div>
    </section>
  );
}
