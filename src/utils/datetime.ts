export function getISODate(date: Date) {
  return date.toISOString().split('T')[0]
}

export function getTodayInISO() {
  const now = new Date()
  return getISODate(now)
}
