import { qs } from "./utils";
import fetch from "node-fetch";
import { target_lang } from "./types";
export interface deeplResponse {
  translations: [
    {
      text: string;
    }
  ];
}
const deepl = async (html: string, target_lang: target_lang) => {
  const res = await fetch(process.env.DEEPL_URL as string, {
    method: "POST",
    body: qs({
      auth_key: process.env.DEEPL_API_KEY,
      text: html,
      tag_handling: "xml",
      ignore_tags: "pre",
      target_lang,
    }),
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  const json = ((await res.json()) as deeplResponse) || { translations: [] };
  return json.translations.map((t) => t.text).join("");
};
export default deepl;
