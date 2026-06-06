"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/i18n/locale-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { listAllUsers, setUserRole, setUserTier } from "@/lib/supabase/admin";

const ROLE_SELECT =
  "rounded-button border border-scheme-border bg-scheme-background px-2 py-1 text-small focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torea-bay-lighter";

const isLineUser = (email) => (email || "").endsWith("@line.users.acty");

function MemberRow({ row, isSelf, onChanged }) {
  const { t, locale } = useLocale();
  const m = t.admin.members;
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);

  const roleLabel = {
    member: m.roleMember,
    organizer: m.roleOrganizer,
    admin: m.roleAdmin,
  };
  const name = row.display_name || m.anon;
  const premium = row.tier === "premium";

  const run = async (fn) => {
    setBusy(true);
    setErr(false);
    try {
      await fn();
      await onChanged();
    } catch {
      setErr(true);
    }
    setBusy(false);
  };

  const changeRole = (e) => {
    const role = e.target.value;
    if (role === row.role) return;
    if (typeof window !== "undefined" && !window.confirm(m.confirmRole(name, roleLabel[role]))) {
      e.target.value = row.role;
      return;
    }
    run(() => setUserRole(row.id, role));
  };

  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4">
      <div className="min-w-0 grow basis-52">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold">{name}</p>
          {isLineUser(row.email) && (
            <Badge className="shrink-0 border-silver-tree bg-silver-tree-lightest text-silver-tree-darker">
              {m.lineUser}
            </Badge>
          )}
          {premium && <Badge className="shrink-0">{m.tierPremium}</Badge>}
        </div>
        <p className="truncate text-small text-neutral-darkest/60">
          {isLineUser(row.email) ? "—" : row.email}
        </p>
        <p className="text-small text-neutral-darkest/60">
          {m.joinedOn}: {new Date(row.created_at).toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US")}
          {" ・ "}
          {m.eventsJoined}: {row.events_joined}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <select
          className={ROLE_SELECT}
          value={row.role}
          disabled={busy || isSelf}
          onChange={changeRole}
          aria-label={`${name} role`}
        >
          <option value="member">{m.roleMember}</option>
          <option value="organizer">{m.roleOrganizer}</option>
          <option value="admin">{m.roleAdmin}</option>
        </select>
        <Button
          size="sm"
          variant="secondary"
          disabled={busy}
          title={premium ? m.makeFree : m.makePremium}
          onClick={() => run(() => setUserTier(row.id, premium ? "free" : "premium"))}
        >
          {premium ? m.makeFree : m.makePremium}
        </Button>
      </div>
      {err && <p className="w-full text-small font-medium text-burnt-sienna-dark">{m.errUpdate}</p>}
    </li>
  );
}

export function AdminMembers() {
  const { t } = useLocale();
  const { user } = useAuth();
  const m = t.admin.members;
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  const refresh = () =>
    listAllUsers()
      .then(setRows)
      .catch(() => setError(true));

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    if (!rows) return null;
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        (r.display_name || "").toLowerCase().includes(q) ||
        (r.email || "").toLowerCase().includes(q),
    );
  }, [rows, query]);

  if (error) return <p className="text-medium">{t.admin.loadError}</p>;
  if (filtered === null)
    return <p className="text-medium text-neutral-darkest/60">{t.admin.loading}</p>;

  return (
    <div>
      <Input
        type="search"
        placeholder={m.search}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
      />
      {filtered.length === 0 ? (
        <p className="mt-6 text-medium">{m.empty}</p>
      ) : (
        <ul className="mt-4 flex flex-col divide-y divide-scheme-border">
          {filtered.map((row) => (
            <MemberRow key={row.id} row={row} isSelf={row.id === user?.id} onChanged={refresh} />
          ))}
        </ul>
      )}
    </div>
  );
}
