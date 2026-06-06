// Acty — transactional event emails.
// Triggered by a Supabase Database Webhook on `participations` (INSERT + UPDATE).
// Looks up the recipient + event, renders a branded template, sends via Resend,
// and logs to email_log for idempotency.
//
// Auto-provided env (by Supabase): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// You must set: RESEND_API_KEY, EMAIL_FROM, SITE_URL. Optional: WEBHOOK_SECRET.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const EMAIL_FROM = Deno.env.get("EMAIL_FROM") ?? "Acty <onboarding@resend.dev>";
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://acty.btechjapan.com";
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");

const ok = () => new Response("ok", { status: 200 });

function emailKind(type: string, record: any, oldRecord: any): string | null {
  const prev = oldRecord?.status;
  const next = record?.status;
  if (type === "INSERT") {
    if (next === "confirmed") return "confirmed";
    if (next === "waitlisted") return "waitlisted";
    return null;
  }
  if (type === "UPDATE") {
    if (prev !== "confirmed" && next === "confirmed")
      return prev === "waitlisted" ? "promoted" : "confirmed";
    if (prev !== "waitlisted" && next === "waitlisted") return "waitlisted";
    if (prev !== "cancelled" && next === "cancelled") return "cancelled";
  }
  return null;
}

function whenLabel(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function layout(heading: string, bodyHtml: string, cta: { href: string; label: string }) {
  return `<!doctype html><html lang="ja"><body style="margin:0;background:#f2f2f2;font-family:-apple-system,'Helvetica Neue',Arial,'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif;color:#15130f">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border-radius:16px;overflow:hidden">
        <tr><td style="padding:28px 32px 8px"><span style="font-weight:700;font-size:22px;letter-spacing:-.01em">Acty</span></td></tr>
        <tr><td style="padding:8px 32px 0"><h1 style="margin:0;font-size:22px;line-height:1.4">${heading}</h1></td></tr>
        <tr><td style="padding:16px 32px 8px;font-size:15px;line-height:1.8">${bodyHtml}</td></tr>
        <tr><td style="padding:20px 32px 32px">
          <a href="${cta.href}" style="display:inline-block;background:#0b3d91;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:10px">${cta.label}</a>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #e5e5e5;font-size:12px;color:#777">
          このメールは Acty（${SITE_URL.replace(/^https?:\/\//, "")}）からお送りしています。<br/>
          心当たりがない場合は、このメールを破棄してください。
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function render(kind: string, name: string, event: any) {
  const greeting = name ? `${name} さん、` : "";
  const when = whenLabel(event.starts_at);
  const detail = `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:12px;background:#f7f7f7;border-radius:10px;width:100%">
    <tr><td style="padding:14px 16px;font-size:14px;line-height:1.9">
      <strong>${event.title}</strong><br/>📅 ${when}<br/>📍 ${event.location ?? ""}
    </td></tr></table>`;
  const eventUrl = `${SITE_URL}/events/${event.slug}`;
  const accountUrl = `${SITE_URL}/account`;

  switch (kind) {
    case "confirmed":
      return {
        subject: `【Acty】${event.title} の参加が確定しました`,
        html: layout(
          "参加が確定しました",
          `${greeting}イベントへの参加が確定しました。当日お会いできるのを楽しみにしています。${detail}`,
          { href: eventUrl, label: "イベント詳細を見る" },
        ),
      };
    case "waitlisted":
      return {
        subject: `【Acty】${event.title} のキャンセル待ちに登録しました`,
        html: layout(
          "キャンセル待ちに登録しました",
          `${greeting}現在満席のため、キャンセル待ちに登録しました。空きが出ると自動的に繰り上がり、改めてメールでお知らせします。${detail}`,
          { href: eventUrl, label: "イベント詳細を見る" },
        ),
      };
    case "promoted":
      return {
        subject: `【Acty】${event.title} に繰り上がりで参加が確定しました`,
        html: layout(
          "繰り上がりで参加が確定しました",
          `${greeting}キャンセル待ちから繰り上がり、参加が確定しました。ご都合が合わない場合は、お早めにキャンセルをお願いします。${detail}`,
          { href: eventUrl, label: "イベント詳細を見る" },
        ),
      };
    case "cancelled":
      return {
        subject: `【Acty】${event.title} の参加をキャンセルしました`,
        html: layout(
          "参加をキャンセルしました",
          `${greeting}イベントへの参加をキャンセルしました。またのご参加をお待ちしています。${detail}`,
          { href: accountUrl, label: "他のイベントを探す" },
        ),
      };
    default:
      return null;
  }
}

Deno.serve(async (req) => {
  if (WEBHOOK_SECRET && req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
    return new Response("unauthorized", { status: 401 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return ok();
  }

  const { type, record, old_record } = payload ?? {};
  if (!record) return ok();

  const kind = emailKind(type, record, old_record);
  if (!kind) return ok();

  const supa = createClient(SUPABASE_URL, SERVICE_ROLE);

  // Idempotency: skip if this (participation, kind) email already went out.
  const { data: seen } = await supa
    .from("email_log")
    .select("id")
    .eq("participation_id", record.id)
    .eq("kind", kind)
    .maybeSingle();
  if (seen) return ok();

  const { data: userRes } = await supa.auth.admin.getUserById(record.user_id);
  const email = userRes?.user?.email;
  if (!email) return ok();
  // LINE-only accounts get a synthesized placeholder address that can't receive
  // mail — skip instead of bouncing (protects sender reputation).
  if (email.endsWith("@line.users.acty")) {
    console.log("skip email: LINE-only user", record.user_id);
    return ok();
  }
  const name =
    userRes.user.user_metadata?.name ||
    userRes.user.user_metadata?.full_name ||
    "";

  const { data: event } = await supa
    .from("events")
    .select("title, slug, starts_at, location")
    .eq("id", record.event_id)
    .single();
  if (!event) return ok();

  const tpl = render(kind, name, event);
  if (!tpl) return ok();

  let sent = false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: email,
        subject: tpl.subject,
        html: tpl.html,
      }),
    });
    sent = res.ok;
    if (!res.ok) console.error("resend error", res.status, await res.text());
  } catch (e) {
    console.error("resend exception", e);
  }

  await supa
    .from("email_log")
    .insert({ participation_id: record.id, kind, recipient: email, ok: sent });

  return ok();
});
