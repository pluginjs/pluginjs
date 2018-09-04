const times = time => {
  time /= 1000

  return {
    seconds: Math.floor(time % 60),
    minutes: Math.floor(time / 60) % 60,
    hours: Math.floor(time / 3600) % 24,
    days: Math.floor(time / 3600 / 24) % 7,
    daysToWeek: Math.floor(time / 3600 / 24) % 7,
    daysToMonth: Math.floor((time / 3600 / 24) % 30.4368),
    weeks: Math.floor(time / 3600 / 24 / 7),
    weeksToMonth: Math.floor(time / 3600 / 24 / 7) % 4,
    months: Math.floor(time / 3600 / 24 / 30.4368),
    years: Math.floor(time / 3600 / 24 / 365),
    totalDays: Math.floor(time / 3600 / 24),
    totalHours: Math.floor(time / 3600),
    totalMinutes: Math.floor(time / 60),
    totalSeconds: time
  }
}

export default times
