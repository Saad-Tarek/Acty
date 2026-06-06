/**
 * Pick the localized variant of a DB content field.
 * Rows carry Japanese in `<field>` and optional English in `<field>_en`;
 * EN locale prefers the English text and falls back to Japanese so the
 * site never shows a blank.
 *
 * @param {object|null|undefined} row
 * @param {string} field  e.g. "title", "location", "category_name"
 * @param {"ja"|"en"} locale
 * @returns {string}
 */
export function localized(row, field, locale) {
  if (!row) return "";
  if (locale === "en") {
    const en = row[`${field}_en`];
    if (en) return en;
  }
  return row[field] ?? "";
}
