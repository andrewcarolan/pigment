import { repeat } from "./string.js";
import { getConfig } from "../config.js";

const { tabWidth } = getConfig();

const DOUBLE_SPACE = "  ";
const TAB = "\t";
const SPACES = repeat("&nbsp;", tabWidth ?? 2);

const splitLines = (code) => {
  let output = '<ol class="lines">';

  for (const line of code.split("\n")) {
    output += `<li class=\"line\"><span class=\"line-content\">${line}</span></li>`;
  }

  output += "</ol>";

  return output;
};

const unescapeAmpersands = (str) => str.replaceAll("&amp;", "&");

const replaceTabs = (str) =>
  str.replaceAll(DOUBLE_SPACE, SPACES).replaceAll(TAB, SPACES);

export { splitLines, unescapeAmpersands, replaceTabs };
