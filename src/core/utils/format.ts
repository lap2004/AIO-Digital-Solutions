/** Formatting helpers (Vietnamese locale). */

export function formatCurrency(value: number, currency = 'VND'): string {
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('vi-VN').format(value);
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat('vi-VN', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

export function formatDate(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
}

export function formatDateLong(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
}

/** "3 phút đọc" estimate from word count. */
export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} phút đọc`;
}
