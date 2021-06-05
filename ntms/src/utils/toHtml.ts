import { RichText } from "../types";

const toHtml = (rich_text: RichText[]) => {
  const getChildren = ({ annotations, href, plain_text }: RichText) => {
    const { bold, code, color, italic, strikethrough, underline } = annotations;
    let children = plain_text;

    if (bold) {
      children = `<b>${children}</b>`;
    }
    if (code) {
      children = `<pre>${children}</pre>`;
    }
    if (strikethrough) {
      children = `<strike>${children}</span>`;
    }
    if (underline) {
      children = `<u>${children}</u>`;
    }
    if (italic) {
      children = `<i>${children}</i>`;
    }
    if (color && color !== "default") {
      children = `<mark data-color="${color}">${children}</mark>`;
    }
    if (href) {
      children = `<a href="${href}">${children}</a>`;
    }
    return `<span>${children}</span>`;
  };
  let text = [];
  const length = rich_text.length;
  for (let i = 0; i < length; i++) {
    text.push(getChildren(rich_text[i]));
  }
  return text.join("");
};

export default toHtml;
