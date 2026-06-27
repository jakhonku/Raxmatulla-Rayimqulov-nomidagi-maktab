import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getUnreadCount } from "@/lib/store";

export const metadata: Metadata = {
  title: "Admin panel",
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let unread = 0;
  try {
    unread = await getUnreadCount();
  } catch {
    unread = 0;
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <AdminSidebar unread={unread} />
      <div className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
