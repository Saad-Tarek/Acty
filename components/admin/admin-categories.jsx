"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/lib/i18n/locale-provider";
import {
  listCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/supabase/admin";

function CategoryRow({ cat, labels, onChanged }) {
  const [name, setName] = useState(cat.name);
  const [nameEn, setNameEn] = useState(cat.name_en || "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const dirty = name !== cat.name || nameEn !== (cat.name_en || "");

  const save = async () => {
    if (!name.trim()) return;
    setBusy(true);
    setErr("");
    try {
      await updateCategory(cat.id, { name, name_en: nameEn });
      await onChanged();
    } catch {
      setErr(labels.errSave);
    }
    setBusy(false);
  };

  const remove = async () => {
    if (typeof window !== "undefined" && !window.confirm(labels.confirmDelete(cat.name))) return;
    setBusy(true);
    setErr("");
    try {
      await deleteCategory(cat.id);
      await onChanged();
    } catch {
      setErr(labels.errInUse);
      setBusy(false);
    }
  };

  return (
    <li className="flex flex-wrap items-end gap-3 py-4">
      <div className="grid grow basis-40 gap-1">
        <Label className="text-small" htmlFor={`cat-ja-${cat.id}`}>{labels.nameJa}</Label>
        <Input id={`cat-ja-${cat.id}`} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="grid grow basis-40 gap-1">
        <Label className="text-small" htmlFor={`cat-en-${cat.id}`}>{labels.nameEn}</Label>
        <Input id={`cat-en-${cat.id}`} value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
      </div>
      <p className="basis-28 pb-2 text-small text-neutral-darkest/60">{cat.slug}</p>
      <div className="flex shrink-0 gap-2 pb-0.5">
        <Button size="sm" disabled={busy || !dirty || !name.trim()} title={labels.save} onClick={save}>
          {labels.save}
        </Button>
        <Button size="sm" variant="secondary" disabled={busy} title={labels.del} onClick={remove}>
          {labels.del}
        </Button>
      </div>
      {err && <p className="w-full text-small font-medium text-burnt-sienna-dark">{err}</p>}
    </li>
  );
}

export function AdminCategories() {
  const { t } = useLocale();
  const c = t.admin.categories;
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNameEn, setNewNameEn] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const refresh = () =>
    listCategoriesAdmin()
      .then(setRows)
      .catch(() => setError(true));

  useEffect(() => {
    refresh();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setBusy(true);
    setErr("");
    try {
      await createCategory({ name: newName, name_en: newNameEn });
      setNewName("");
      setNewNameEn("");
      await refresh();
    } catch {
      setErr(c.errSave);
    }
    setBusy(false);
  };

  if (error) return <p className="text-medium">{t.admin.loadError}</p>;
  if (rows === null)
    return <p className="text-medium text-neutral-darkest/60">{t.admin.loading}</p>;

  return (
    <div>
      <form onSubmit={add} className="flex flex-wrap items-end gap-3 rounded-card border border-scheme-border p-5">
        <p className="w-full text-h6 font-bold">{c.newTitle}</p>
        <div className="grid grow basis-40 gap-1">
          <Label className="text-small" htmlFor="new-cat-ja">{c.nameJa}</Label>
          <Input id="new-cat-ja" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div className="grid grow basis-40 gap-1">
          <Label className="text-small" htmlFor="new-cat-en">{c.nameEn}</Label>
          <Input id="new-cat-en" value={newNameEn} onChange={(e) => setNewNameEn(e.target.value)} />
        </div>
        <Button type="submit" size="sm" disabled={busy || !newName.trim()} title={c.add} className="pb-0.5">
          {c.add}
        </Button>
        {err && <p className="w-full text-small font-medium text-burnt-sienna-dark">{err}</p>}
      </form>

      {rows.length === 0 ? (
        <p className="mt-6 text-medium">{c.empty}</p>
      ) : (
        <ul className="mt-4 flex flex-col divide-y divide-scheme-border">
          {rows.map((cat) => (
            <CategoryRow key={cat.id} cat={cat} labels={c} onChanged={refresh} />
          ))}
        </ul>
      )}
    </div>
  );
}
