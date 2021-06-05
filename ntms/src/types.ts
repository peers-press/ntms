export type database_id = string;
export type page_id = string;
export declare type Color =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";

export declare type BackgroundColor =
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "green_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background";

export interface RichText {
  plain_text: string;
  href?: string;
  annotations: Annotations;
  type?: string;
}
export type annotationsKey =
  | "bold"
  | "code"
  | "italic"
  | "strikethrough"
  | "underline"
  | "color";

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: Color | BackgroundColor;
}

export interface translationsDictonnary {
  [database: string]: databaseDictionnary;
}
export interface databaseDictionnary {
  [key: string]: string | RichText[];
}

export interface translateParamters {
  id: string;
  rich_text: RichText[];
  locale: string;
  target_lang: target_lang;
}

export interface fetchTranslationOptions {
  locale: string | undefined;
  defaultLocale: string | undefined;
  deepl?: {
    [locale: string]: target_lang;
  };
}
export type target_lang =
  | "BG"
  | "CS"
  | "DA"
  | "DE"
  | "EL"
  | "EN-GB"
  | "EN-US"
  | "EN"
  | "ES"
  | "ET"
  | "FI"
  | "FR"
  | "HU"
  | "IT"
  | "JA"
  | "LT"
  | "LV"
  | "NL"
  | "PL"
  | "PT-PT"
  | "PT-BR"
  | "RO"
  | "RU"
  | "SK"
  | "SL"
  | "SV"
  | "ZH";
