import { RichText } from "../types";

const toPlainText = (rich_text: RichText[]) => {
  return rich_text.map(({ plain_text }: RichText) => plain_text).join("");
};
export default toPlainText;
