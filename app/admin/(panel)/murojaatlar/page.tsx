import { Inbox, Phone, Mail, MailOpen, MailCheck } from "lucide-react";
import { getMessages } from "@/lib/store";
import { formatDateUz } from "@/lib/utils";
import {
  toggleMessageReadAction,
  deleteMessageAction,
} from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          Murojaatlar
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Jami {messages.length} ta · {unread} ta o'qilmagan
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center text-slate-400">
          <Inbox className="h-12 w-12" />
          <p>Hozircha murojaatlar yo'q.</p>
          <p className="text-xs">
            Aloqa sahifasidagi forma orqali kelgan xabarlar shu yerda ko'rinadi.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border bg-white p-5 shadow-card transition-colors ${
                m.read ? "border-slate-100" : "border-primary-200 bg-primary-50/30"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {!m.read && (
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  )}
                  <h3 className="font-heading text-base font-bold text-slate-900">
                    {m.name}
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  {formatDateUz(m.createdAt)}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-4 text-sm">
                <a
                  href={`tel:${m.phone.replace(/\s|\(|\)|-/g, "")}`}
                  className="inline-flex items-center gap-1.5 font-medium text-primary-700 hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {m.phone}
                </a>
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    className="inline-flex items-center gap-1.5 font-medium text-slate-600 hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {m.email}
                  </a>
                )}
              </div>

              <p className="mt-3 whitespace-pre-line rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                {m.message}
              </p>

              <div className="mt-3 flex items-center justify-end gap-1">
                <form action={toggleMessageReadAction}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="read" value={(!m.read).toString()} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                  >
                    {m.read ? (
                      <>
                        <MailOpen className="h-3.5 w-3.5" />
                        O'qilmagan deb belgilash
                      </>
                    ) : (
                      <>
                        <MailCheck className="h-3.5 w-3.5" />
                        O'qilgan deb belgilash
                      </>
                    )}
                  </button>
                </form>
                <DeleteButton
                  action={deleteMessageAction}
                  name="id"
                  value={m.id}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
