import { DATE_FORMAT, LOCALE } from '@/enums';
import clsx, { ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function formattedDate(
  date?: string | number | Date | dayjs.Dayjs | null | undefined,
  format?: DATE_FORMAT
): string {
  return (date && dayjs(date).format(format ?? DATE_FORMAT.FULL)) || '';
}

export function getIndex(
  pageSize: number | undefined = 0,
  currentPage: number | undefined = 1,
  index: number
) {
  return pageSize * (currentPage - 1) + index + 1;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formattedNumber(
  value: number | string | null | undefined,
  lang: LOCALE = LOCALE.EN
) {
  const localeArg = lang === LOCALE.VI ? 'vi-VN' : 'en-US';
  const number = value ? Number(value) : 0;
  const result = new Intl.NumberFormat(localeArg).format(number);
  return result;
}

export function replaceSpecialChars(str: string) {
  const regex = /[\\.{ }^%`[\]"<>#|~/]/g;
  return str.replace(regex, '_');
}

export function parseTimestampToDateTime(timestamp: number) {
  // Create a new Date object using the timestamp (converted to milliseconds)
  var date = new Date(timestamp * 1000);

  // Format the date and time in a human-readable format
  // You can adjust the format as needed
  var formattedDateTime = date.toISOString();

  return formattedDateTime;
}

export function stringToNumber(value: any) {
  if (!value) return undefined;
  return Number(value);
}

export function getAvatarPlaceholder(value: any) {
  return value?.[0]?.toUpperCase();
}

export const convertSecondsToTime = (duration = 0) => {
  if (isNaN(Number(duration)) || duration < 0) {
    return '00:00';
  }

  let minutes: string | number = Math.floor(duration / 60);
  let seconds: string | number = Math.floor(duration - minutes * 60);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};
