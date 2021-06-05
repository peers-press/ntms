import { RichText, annotationsKey } from "../types";

const hasAnnotations = (rich_text: RichText[]): boolean => {
  return rich_text.some((c: RichText) => {
    return (
      // @ts-ignore
      Object.keys(c.annotations).some((key: annotationsKey) => {
        const value = c.annotations[key];
        if (key === "color") return !!value && value !== "default";
        return value;
      }) || !!c.href
    );
  });
};

export default hasAnnotations;
