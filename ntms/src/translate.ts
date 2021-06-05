import deepl from "./deepl";
import { toRichText, toHtml } from "./utils";
import { RichText, translateParamters } from "./types";
import saveTranslations from "./saveTranslations";

const translate = async ({
  id,
  rich_text,
  locale,
  target_lang,
}: translateParamters): Promise<RichText[] | undefined> => {
  const html = toHtml(rich_text);
  const translation = await deepl(html, target_lang);
  const newRichText = toRichText(translation);
  await saveTranslations({ id, newRichText, locale });
  return newRichText;
};

export default translate;
