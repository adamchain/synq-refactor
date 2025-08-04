import moment from "moment-timezone";

export function toUTC(date: string, tz: string): string {
  return moment.tz(date, tz).utc().format();
}

export function toLocal(date: string, tz: string): string {
  return moment.utc(date).tz(tz).format("YYYY-MM-DD HH:mm");
}

export function formatCalendarDate(date: string): string {
  return moment(date).calendar();
}
