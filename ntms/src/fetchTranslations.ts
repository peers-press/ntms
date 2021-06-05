import { toPlainText, notionApi } from "./utils";
import extractTranslations from "./extractTranslations";
import {
  database_id,
  translationsDictonnary,
  fetchTranslationOptions,
} from "./types";

const fetchTranslation = async (
  databases: database_id[],
  { locale, defaultLocale, deepl }: fetchTranslationOptions
): Promise<translationsDictonnary> => {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("A notion API key must be defined");
  }
  if (defaultLocale === undefined) {
    throw new Error(
      "A default locale must be defined inside your next.config.js  file under the ntms object"
    );
  }
  if (locale === undefined) {
    throw new Error(
      "This locale is undefined, please make sure your i18n config inside next.config.js handle it"
    );
  }
  let translations = {};
  await Promise.all(
    databases.map(async (database_id: database_id) => {
      const { title, properties } = await notionApi(
        "get",
        "databases",
        database_id
      );
      const notionLocales = Object.keys(properties).filter((x) => x !== "key");
      const { results } = await notionApi(
        "post",
        "databases",
        database_id,
        "query"
      );

      const database = toPlainText(title);
      const baseProps = {
        notionLocales,
        deepl,
        results,
        defaultLocale: defaultLocale,
      };
      const defaultLocaleTranslations = await extractTranslations({
        locale: defaultLocale,
        ...baseProps,
      });
      let localeTranslations = await extractTranslations({
        locale,
        defaultLocaleTranslations,
        ...baseProps,
      });

      Object.assign(translations, { [database]: localeTranslations });
    })
  );

  return translations;
};

export default fetchTranslation;
