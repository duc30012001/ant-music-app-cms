import CryptoJS from 'crypto-js';
import { defaultConfig } from '../constants';

export function encrypt(data: object): string {
  const dataString = JSON.stringify(data);
  const cipherText = CryptoJS.AES.encrypt(
    dataString,
    defaultConfig.SECRET_KEY
  ).toString();
  return cipherText;
}

export function decrypt(cipherText: string): object {
  const bytes = CryptoJS.AES.decrypt(cipherText, defaultConfig.SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  const data = JSON.parse(originalText);
  return data;
}

export function getCurrentPage(limit: number | undefined, pageSize: number) {
  return (limit ?? 0) / pageSize;
}
