import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/lib/store";
import { updateNewsAction } from "@/app/admin/actions";
import { NewsForm } from "@/components/admin/news-form";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <NewsForm action={updateNewsAction} initial={item} submitLabel="O'zgarishlarni saqlash" />
  );
}
