//@flow
import type { Unit } from "./data/types";
// inspired by https://github.com/smirzaei/currency-formatter/blob/master/currencies.json
const units: { [key: string]: Unit } = {
  AED: { name: "AED", code: "AED", symbol: "د.إ.‏", magnitude: 2 },
  AFN: { name: "AFN", code: "AFN", symbol: "؋", magnitude: 2 },
  ALL: { name: "ALL", code: "ALL", symbol: "Lek", magnitude: 2 },
  AMD: { name: "AMD", code: "AMD", symbol: "֏", magnitude: 2 },
  ANG: { name: "ANG", code: "ANG", symbol: "ƒ", magnitude: 2 },
  AOA: { name: "AOA", code: "AOA", symbol: "Kz", magnitude: 2 },
  ARS: { name: "ARS", code: "ARS", symbol: "$", magnitude: 2 },
  AUD: { name: "AUD", code: "AUD", symbol: "$", magnitude: 2 },
  AWG: { name: "AWG", code: "AWG", symbol: "ƒ", magnitude: 2 },
  AZN: { name: "AZN", code: "AZN", symbol: "₼", magnitude: 2 },
  BAM: { name: "BAM", code: "BAM", symbol: "КМ", magnitude: 2 },
  BBD: { name: "BBD", code: "BBD", symbol: "$", magnitude: 2 },
  BDT: { name: "BDT", code: "BDT", symbol: "৳", magnitude: 0 },
  BGN: { name: "BGN", code: "BGN", symbol: "лв.", magnitude: 2 },
  BHD: { name: "BHD", code: "BHD", symbol: "د.ب.‏", magnitude: 3 },
  BIF: { name: "BIF", code: "BIF", symbol: "FBu", magnitude: 0 },
  BMD: { name: "BMD", code: "BMD", symbol: "$", magnitude: 2 },
  BND: { name: "BND", code: "BND", symbol: "$", magnitude: 0 },
  BOB: { name: "BOB", code: "BOB", symbol: "Bs", magnitude: 2 },
  BRL: { name: "BRL", code: "BRL", symbol: "R$", magnitude: 2 },
  BSD: { name: "BSD", code: "BSD", symbol: "$", magnitude: 2 },
  BTC: { name: "BTC", code: "BTC", symbol: "Ƀ", magnitude: 2 },
  BTN: { name: "BTN", code: "BTN", symbol: "Nu.", magnitude: 1 },
  BWP: { name: "BWP", code: "BWP", symbol: "P", magnitude: 2 },
  BYR: { name: "BYR", code: "BYR", symbol: "р.", magnitude: 2 },
  BZD: { name: "BZD", code: "BZD", symbol: "BZ$", magnitude: 2 },
  CAD: { name: "CAD", code: "CAD", symbol: "$", magnitude: 2 },
  CDF: { name: "CDF", code: "CDF", symbol: "FC", magnitude: 2 },
  CHF: { name: "CHF", code: "CHF", symbol: "CHF", magnitude: 2 },
  CLP: { name: "CLP", code: "CLP", symbol: "$", magnitude: 2 },
  CNY: { name: "CNY", code: "CNY", symbol: "¥", magnitude: 2 },
  COP: { name: "COP", code: "COP", symbol: "$", magnitude: 2 },
  CRC: { name: "CRC", code: "CRC", symbol: "₡", magnitude: 2 },
  CUC: { name: "CUC", code: "CUC", symbol: "CUC", magnitude: 2 },
  CUP: { name: "CUP", code: "CUP", symbol: "$MN", magnitude: 2 },
  CVE: { name: "CVE", code: "CVE", symbol: "$", magnitude: 2 },
  CZK: { name: "CZK", code: "CZK", symbol: "Kč", magnitude: 2 },
  DJF: { name: "DJF", code: "DJF", symbol: "Fdj", magnitude: 0 },
  DKK: { name: "DKK", code: "DKK", symbol: "kr.", magnitude: 2 },
  DOP: { name: "DOP", code: "DOP", symbol: "RD$", magnitude: 2 },
  DZD: { name: "DZD", code: "DZD", symbol: "د.ج.‏", magnitude: 2 },
  EGP: { name: "EGP", code: "EGP", symbol: "ج.م.‏", magnitude: 2 },
  ERN: { name: "ERN", code: "ERN", symbol: "Nfk", magnitude: 2 },
  ETB: { name: "ETB", code: "ETB", symbol: "ETB", magnitude: 2 },
  EUR: { name: "EUR", code: "EUR", symbol: "€", magnitude: 2 },
  FJD: { name: "FJD", code: "FJD", symbol: "$", magnitude: 2 },
  FKP: { name: "FKP", code: "FKP", symbol: "£", magnitude: 2 },
  GBP: { name: "GBP", code: "GBP", symbol: "£", magnitude: 2 },
  GEL: { name: "GEL", code: "GEL", symbol: "Lari", magnitude: 2 },
  GHS: { name: "GHS", code: "GHS", symbol: "₵", magnitude: 2 },
  GIP: { name: "GIP", code: "GIP", symbol: "£", magnitude: 2 },
  GMD: { name: "GMD", code: "GMD", symbol: "D", magnitude: 2 },
  GNF: { name: "GNF", code: "GNF", symbol: "FG", magnitude: 0 },
  GTQ: { name: "GTQ", code: "GTQ", symbol: "Q", magnitude: 2 },
  GYD: { name: "GYD", code: "GYD", symbol: "$", magnitude: 2 },
  HKD: { name: "HKD", code: "HKD", symbol: "HK$", magnitude: 2 },
  HNL: { name: "HNL", code: "HNL", symbol: "L.", magnitude: 2 },
  HRK: { name: "HRK", code: "HRK", symbol: "kn", magnitude: 2 },
  HTG: { name: "HTG", code: "HTG", symbol: "G", magnitude: 2 },
  HUF: { name: "HUF", code: "HUF", symbol: "Ft", magnitude: 2 },
  IDR: { name: "IDR", code: "IDR", symbol: "Rp", magnitude: 0 },
  ILS: { name: "ILS", code: "ILS", symbol: "₪", magnitude: 2 },
  INR: { name: "INR", code: "INR", symbol: "₹", magnitude: 2 },
  IQD: { name: "IQD", code: "IQD", symbol: "د.ع.‏", magnitude: 2 },
  IRR: { name: "IRR", code: "IRR", symbol: "﷼", magnitude: 2 },
  ISK: { name: "ISK", code: "ISK", symbol: "kr.", magnitude: 0 },
  JMD: { name: "JMD", code: "JMD", symbol: "J$", magnitude: 2 },
  JOD: { name: "JOD", code: "JOD", symbol: "د.ا.‏", magnitude: 3 },
  JPY: { name: "JPY", code: "JPY", symbol: "¥", magnitude: 0 },
  KES: { name: "KES", code: "KES", symbol: "S", magnitude: 2 },
  KGS: { name: "KGS", code: "KGS", symbol: "сом", magnitude: 2 },
  KHR: { name: "KHR", code: "KHR", symbol: "៛", magnitude: 0 },
  KMF: { name: "KMF", code: "KMF", symbol: "CF", magnitude: 2 },
  KPW: { name: "KPW", code: "KPW", symbol: "₩", magnitude: 0 },
  KRW: { name: "KRW", code: "KRW", symbol: "₩", magnitude: 0 },
  KWD: { name: "KWD", code: "KWD", symbol: "د.ك.‏", magnitude: 3 },
  KYD: { name: "KYD", code: "KYD", symbol: "$", magnitude: 2 },
  KZT: { name: "KZT", code: "KZT", symbol: "₸", magnitude: 2 },
  LAK: { name: "LAK", code: "LAK", symbol: "₭", magnitude: 0 },
  LBP: { name: "LBP", code: "LBP", symbol: "ل.ل.‏", magnitude: 2 },
  LKR: { name: "LKR", code: "LKR", symbol: "₨", magnitude: 0 },
  LRD: { name: "LRD", code: "LRD", symbol: "$", magnitude: 2 },
  LSL: { name: "LSL", code: "LSL", symbol: "M", magnitude: 2 },
  LYD: { name: "LYD", code: "LYD", symbol: "د.ل.‏", magnitude: 3 },
  MAD: { name: "MAD", code: "MAD", symbol: "د.م.‏", magnitude: 2 },
  MDL: { name: "MDL", code: "MDL", symbol: "lei", magnitude: 2 },
  MGA: { name: "MGA", code: "MGA", symbol: "Ar", magnitude: 0 },
  MKD: { name: "MKD", code: "MKD", symbol: "ден.", magnitude: 2 },
  MMK: { name: "MMK", code: "MMK", symbol: "K", magnitude: 2 },
  MNT: { name: "MNT", code: "MNT", symbol: "₮", magnitude: 2 },
  MOP: { name: "MOP", code: "MOP", symbol: "MOP$", magnitude: 2 },
  MRO: { name: "MRO", code: "MRO", symbol: "UM", magnitude: 2 },
  MTL: { name: "MTL", code: "MTL", symbol: "₤", magnitude: 2 },
  MUR: { name: "MUR", code: "MUR", symbol: "₨", magnitude: 2 },
  MVR: { name: "MVR", code: "MVR", symbol: "MVR", magnitude: 1 },
  MWK: { name: "MWK", code: "MWK", symbol: "MK", magnitude: 2 },
  MXN: { name: "MXN", code: "MXN", symbol: "$", magnitude: 2 },
  MYR: { name: "MYR", code: "MYR", symbol: "RM", magnitude: 2 },
  MZN: { name: "MZN", code: "MZN", symbol: "MT", magnitude: 0 },
  NAD: { name: "NAD", code: "NAD", symbol: "$", magnitude: 2 },
  NGN: { name: "NGN", code: "NGN", symbol: "₦", magnitude: 2 },
  NIO: { name: "NIO", code: "NIO", symbol: "C$", magnitude: 2 },
  NOK: { name: "NOK", code: "NOK", symbol: "kr", magnitude: 2 },
  NPR: { name: "NPR", code: "NPR", symbol: "₨", magnitude: 2 },
  NZD: { name: "NZD", code: "NZD", symbol: "$", magnitude: 2 },
  OMR: { name: "OMR", code: "OMR", symbol: "﷼", magnitude: 3 },
  PAB: { name: "PAB", code: "PAB", symbol: "B/.", magnitude: 2 },
  PEN: { name: "PEN", code: "PEN", symbol: "S/.", magnitude: 2 },
  PGK: { name: "PGK", code: "PGK", symbol: "K", magnitude: 2 },
  PHP: { name: "PHP", code: "PHP", symbol: "₱", magnitude: 2 },
  PKR: { name: "PKR", code: "PKR", symbol: "₨", magnitude: 2 },
  PLN: { name: "PLN", code: "PLN", symbol: "zł", magnitude: 2 },
  PYG: { name: "PYG", code: "PYG", symbol: "₲", magnitude: 2 },
  QAR: { name: "QAR", code: "QAR", symbol: "﷼", magnitude: 2 },
  RON: { name: "RON", code: "RON", symbol: "lei", magnitude: 2 },
  RSD: { name: "RSD", code: "RSD", symbol: "Дин.", magnitude: 2 },
  RUB: { name: "RUB", code: "RUB", symbol: "₽", magnitude: 2 },
  RWF: { name: "RWF", code: "RWF", symbol: "RWF", magnitude: 2 },
  SAR: { name: "SAR", code: "SAR", symbol: "﷼", magnitude: 2 },
  SBD: { name: "SBD", code: "SBD", symbol: "$", magnitude: 2 },
  SCR: { name: "SCR", code: "SCR", symbol: "₨", magnitude: 2 },
  SDD: { name: "SDD", code: "SDD", symbol: "LSd", magnitude: 2 },
  SDG: { name: "SDG", code: "SDG", symbol: "£‏", magnitude: 2 },
  SEK: { name: "SEK", code: "SEK", symbol: "kr", magnitude: 2 },
  SGD: { name: "SGD", code: "SGD", symbol: "$", magnitude: 2 },
  SHP: { name: "SHP", code: "SHP", symbol: "£", magnitude: 2 },
  SLL: { name: "SLL", code: "SLL", symbol: "Le", magnitude: 2 },
  SOS: { name: "SOS", code: "SOS", symbol: "S", magnitude: 2 },
  SRD: { name: "SRD", code: "SRD", symbol: "$", magnitude: 2 },
  STD: { name: "STD", code: "STD", symbol: "Db", magnitude: 2 },
  SVC: { name: "SVC", code: "SVC", symbol: "₡", magnitude: 2 },
  SYP: { name: "SYP", code: "SYP", symbol: "£", magnitude: 2 },
  SZL: { name: "SZL", code: "SZL", symbol: "E", magnitude: 2 },
  THB: { name: "THB", code: "THB", symbol: "฿", magnitude: 2 },
  TJS: { name: "TJS", code: "TJS", symbol: "TJS", magnitude: 2 },
  TMT: { name: "TMT", code: "TMT", symbol: "m", magnitude: 0 },
  TND: { name: "TND", code: "TND", symbol: "د.ت.‏", magnitude: 3 },
  TOP: { name: "TOP", code: "TOP", symbol: "T$", magnitude: 2 },
  TRY: { name: "TRY", code: "TRY", symbol: "TL", magnitude: 2 },
  TTD: { name: "TTD", code: "TTD", symbol: "TT$", magnitude: 2 },
  TVD: { name: "TVD", code: "TVD", symbol: "$", magnitude: 2 },
  TWD: { name: "TWD", code: "TWD", symbol: "NT$", magnitude: 2 },
  TZS: { name: "TZS", code: "TZS", symbol: "TSh", magnitude: 2 },
  UAH: { name: "UAH", code: "UAH", symbol: "₴", magnitude: 2 },
  UGX: { name: "UGX", code: "UGX", symbol: "USh", magnitude: 2 },
  USD: { name: "USD", code: "USD", symbol: "$", magnitude: 2 },
  UYU: { name: "UYU", code: "UYU", symbol: "$U", magnitude: 2 },
  UZS: { name: "UZS", code: "UZS", symbol: "сўм", magnitude: 2 },
  VEB: { name: "VEB", code: "VEB", symbol: "Bs.", magnitude: 2 },
  VEF: { name: "VEF", code: "VEF", symbol: "Bs. F.", magnitude: 2 },
  VND: { name: "VND", code: "VND", symbol: "₫", magnitude: 1 },
  VUV: { name: "VUV", code: "VUV", symbol: "VT", magnitude: 0 },
  WST: { name: "WST", code: "WST", symbol: "WS$", magnitude: 2 },
  XAF: { name: "XAF", code: "XAF", symbol: "F", magnitude: 2 },
  XCD: { name: "XCD", code: "XCD", symbol: "$", magnitude: 2 },
  XOF: { name: "XOF", code: "XOF", symbol: "F", magnitude: 2 },
  XPF: { name: "XPF", code: "XPF", symbol: "F", magnitude: 2 },
  YER: { name: "YER", code: "YER", symbol: "﷼", magnitude: 2 },
  ZAR: { name: "ZAR", code: "ZAR", symbol: "R", magnitude: 2 },
  ZMW: { name: "ZMW", code: "ZMW", symbol: "ZK", magnitude: 2 },
  WON: { name: "WON", code: "WON", symbol: "₩", magnitude: 2 }
};
for (let u in units) {
  units[u].showAllDigits = true;
}

export default units;
