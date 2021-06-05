import { parse } from "node-html-parser";

import { RichText } from "../types";
import findNode from "./findNode";
import hasNode from "./hasNode";
const toRichText = (html: string): RichText[] => {
  //@ts-ignore
  const root = parse(html) as HTMLElement;
  let newRichText = [] as any;
  Array.from(root.childNodes).map((node: ChildNode) => {
    const color = findNode(node, "mark");
    const href = findNode(node, "a");
    const richText = {
      type: "text",
      plain_text: node.textContent,
      annotations: {
        bold: hasNode(node, "b"),
        italic: hasNode(node, "i"),
        strikethrough: hasNode(node, "strike"),
        underline: hasNode(node, "u"),
        code: hasNode(node, "pre"),
        color: color ? color.getAttribute("data-color") : false,
      },
      href: href ? href.getAttribute("href") : false,
    };
    newRichText.push(richText);
  });
  return newRichText;
};

export default toRichText;
