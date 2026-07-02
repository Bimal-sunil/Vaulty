export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function daysBetween(date1: Date, date2: Date) {
  const diffMs = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function nextMonthSameDay(day: number) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 0 : month;

  return new Date(nextYear, nextMonth, day);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findTotalAmount(amounts: number[]): number {
  return amounts.reduce((total, amount) => {
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);
}
