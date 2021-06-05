import { database_id, page_id } from "../types";
import fetch from "node-fetch";
const notionApi = async (
  method: "get" | "post" | "patch",
  type: "databases" | "pages",
  id: database_id | page_id,
  query?: string,
  body?: object | string
) => {
  let options = {
    method,
    headers: {
      Authorization: process.env.NOTION_API_KEY,
      "Notion-Version": "2021-05-13",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (body) Object.assign(options, { body });

  return (
    await fetch(
      `https://api.notion.com/v1/${type}/${id}/${query || ""}`,
      //@ts-ignore
      options
    )
  ).json();
};

export default notionApi;
