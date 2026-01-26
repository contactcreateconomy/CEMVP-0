// Currency configuration
const currencies = {
  USD: { symbol: "$", decimals: 2 },
  EUR: { symbol: "€", decimals: 2 },
  GBP: { symbol: "£", decimals: 2 },
} as const;

export type Currency = keyof typeof currencies;

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number, currency: Currency = "USD"): string {
  const config = currencies[currency];
  const formatted = amount.toFixed(config.decimals);
  return `${config.symbol}${formatted}`;
}

/**
 * Format a number with thousands separator
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Format a date as relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | number): string {
  const now = Date.now();
  const timestamp = typeof date === "number" ? date : date.getTime();
  const seconds = Math.floor((now - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

/**
 * Format a date as a localized string
 */
export function formatDate(date: Date | number, locale: string = "en-US"): string {
  const timestamp = typeof date === "number" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(timestamp);
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Convert a string to URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Get badge gradient color from level
 */
export function getBadgeColor(level: string): string {
  switch (level) {
    case "platinum":
      return "bg-gradient-to-r from-slate-200 to-slate-400";
    case "gold":
      return "bg-gradient-to-r from-yellow-400 to-amber-500";
    case "silver":
      return "bg-gradient-to-r from-gray-300 to-gray-400";
    case "bronze":
      return "bg-gradient-to-r from-amber-600 to-orange-600";
    default:
      return "bg-muted";
  }
}
