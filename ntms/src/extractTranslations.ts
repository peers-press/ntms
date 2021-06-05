import { mapSeries, toPlainText, hasAnnotations } from "./utils";
import translate from "./translate";
import { databaseDictionnary } from "./types";
interface ExtracTranslationsOptions {
  deepl: any;
  results: any;
  locale: string;
  defaultLocale: string;
  notionLocales: string[];
  defaultLocaleTranslations?: databaseDictionnary;
}

const DEEPL_TARGETS = [
  "BG",
  "CS",
  "DA",
  "DE",
  "EL",
  "EN-GB",
  "EN-US",
  "EN",
  "ES",
  "ET",
  "FI",
  "FR",
  "HU",
  "IT",
  "JA",
  "LT",
  "LV",
  "NL",
  "PL",
  "PT-PT",
  "PT-BR",
  "RO",
  "RU",
  "SK",
  "SL",
  "SV",
  "ZH",
];

const extractTranslations = async ({
  deepl,
  results,
  locale,
  defaultLocale,
  defaultLocaleTranslations,
  notionLocales,
}: ExtracTranslationsOptions): Promise<databaseDictionnary> => {
  let translations = {};
  await mapSeries(results, async ({ properties, id }: any) => {
    const key = toPlainText(properties.key.title);
    let rich_text = properties[locale]
      ? properties[locale].rich_text || []
      : [];
    const plainText = toPlainText(rich_text);

    const shouldTranslate = plainText.length === 0;

    if (shouldTranslate) {
      const target_lang =
        deepl?.[locale] ||
        DEEPL_TARGETS.find((x) => x === locale.toUpperCase());

      const canTranslate =
        !!defaultLocaleTranslations &&
        !!process.env.DEEPL_API_KEY &&
        !!process.env.DEEPL_URL &&
        target_lang &&
        DEEPL_TARGETS.includes(target_lang) &&
        notionLocales.includes(locale);

      if (canTranslate) {
        const maybeTranslation = await translate({
          rich_text: properties[defaultLocale].rich_text,
          locale,
          id,
          target_lang,
        });
        if (!!maybeTranslation) {
          rich_text = maybeTranslation;
        } else {
          rich_text = properties[defaultLocale].rich_text;
        }
      } else {
        rich_text = properties[defaultLocale].rich_text;
      }
    }
    const translation = hasAnnotations(rich_text)
      ? rich_text
      : toPlainText(rich_text);
    Object.assign(translations, {
      [key]: translation,
    });
  });
  return translations;
};

export default extractTranslations;
