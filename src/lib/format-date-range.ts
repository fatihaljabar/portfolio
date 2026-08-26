/**
 * Date Range Formatting
 * Shared by Career and Education public rendering — turns start/end
 * dates into the "Sep 2024 – Present" and "4 Months" strings that used
 * to be hand-written per locale
 */

const PRESENT_LABEL: Record<string, string> = {
  en: 'Present',
  id: 'Sekarang',
};

export function formatDateRange(start: Date, end: Date | null, locale: string): string {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' });
  const startLabel = formatter.format(start);
  const endLabel = end ? formatter.format(end) : (PRESENT_LABEL[locale] ?? PRESENT_LABEL.en);
  return `${startLabel} – ${endLabel}`;
}

export function formatDuration(start: Date, end: Date | null, locale: string): string {
  const endDate = end ?? new Date();
  const totalMonths = Math.max(
    1,
    (endDate.getFullYear() - start.getFullYear()) * 12 +
      (endDate.getMonth() - start.getMonth()) +
      1,
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const unit = (count: number, en: string, id: string) =>
    locale === 'id' ? `${count} ${id}` : `${count} ${en}${count === 1 ? '' : 's'}`;

  if (years === 0) {
    return unit(months, 'Month', 'Bulan');
  }
  if (months === 0) {
    return unit(years, 'Year', 'Tahun');
  }
  return `${unit(years, 'Year', 'Tahun')} ${unit(months, 'Month', 'Bulan')}`;
}
