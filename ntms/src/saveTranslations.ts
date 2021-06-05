import { page_id, RichText } from "./types";
import notionApi from "./utils/notionApi";

interface SaveTranslationsOptions {
  id: page_id;
  newRichText: RichText[];
  locale: string;
}

const saveTranslations = async ({
  id,
  newRichText,
  locale,
}: SaveTranslationsOptions) => {
  return await notionApi(
    "patch",
    "pages",
    id,
    undefined,
    JSON.stringify({
      properties: {
        [locale]: {
          rich_text: newRichText.map(
            ({ annotations = {}, plain_text, href }) => ({
              type: "text",
              annotations: {
                ...annotations,
                color: annotations.color || "default",
              },
              text: {
                link: href
                  ? {
                      url: href,
                    }
                  : undefined,
                content: plain_text,
              },
            })
          ),
        },
      },
    })
  );
};

export default saveTranslations;
