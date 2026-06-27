import { createNewsAction } from "@/app/admin/actions";
import { NewsForm } from "@/components/admin/news-form";

export default function NewNewsPage() {
  return <NewsForm action={createNewsAction} submitLabel="Yangilikni chop etish" />;
}
