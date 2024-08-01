#!/usr/bin/env node

import { getConfig, setConfig } from "./config.js";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pug from "pug";
import open from "open";
import sass from "sass";

import Prism from "./lib/prism.js";
import { splitLines, unescapeAmpersands } from "./lib/code.js";
import loadLanguages from "prismjs/components/index.js";

import packageDetails from "../package.json" with { type: "json" };
const { version } = packageDetails;
console.log(`pigment v${version}`);

const SRC_DIR = fileURLToPath(new URL(".", import.meta.url));
const OUTPUT_DIR = path.join(SRC_DIR, "..", getConfig().outputDirectory);

let [, , inputFile, tabWidth] = process.argv;

// Deprecated: set custom Prism theme
let theme;
const useCustomTheme = !theme;
theme = !theme ? "prism.css" : `prism-${theme}.css`;

if (tabWidth) {
  const numericTabWidth = Number(tabWidth);

  if (!isNaN(numericTabWidth)) {
    setConfig("tabWidth", numericTabWidth);
  } else {
    console.warn(`Tab width must be numeric. (Received: ${tabWidth})`);
  }
}

if (!inputFile?.length) {
  console.error("Error: No input file specified");
  process.exit(1);
}

try {
  const outputPath = path.join(OUTPUT_DIR, "css");
  fs.mkdirSync(outputPath, { recursive: true });
  fs.accessSync(outputPath, fs.constants.W_OK);
} catch (err) {
  console.error("Error: Can't write to output directory", err);
  process.exit(1);
}

let language;
const extension = inputFile.split(".").pop();

switch (extension) {
  case "html":
    language = extension;
    break;
  case "ts":
  case "tsx":
    language = "typescript";
    break;
  case "js":
  case "jsx":
  default:
    language = "javascript";
    break;
}

if (language === "typescript") {
  loadLanguages(["typescript"]);
}

const code = fs.readFileSync(inputFile, { encoding: "utf8" });

if (!code.length) {
  console.error("Error: Empty input file");
  process.exit(1);
}

// Split lines and unescape HTML entities
let highlighted = unescapeAmpersands(
  splitLines(Prism.highlight(code, Prism.languages[language], language))
);

const locals = {
  code: highlighted,
  language: `language-${language}`,
  theme,
  useCustomTheme,
};

const themeScss = pug.renderFile(
  path.join(SRC_DIR, "templates", "theme.scss.pug"),
  locals
);
fs.writeFileSync(path.join(SRC_DIR, "scss", "theme.scss"), themeScss);

const { css } = sass.compile(path.join(SRC_DIR, "scss", "theme.scss"));
fs.writeFileSync(
  path.join(OUTPUT_DIR, "css", "theme.css"),
  css
);

const html = pug.renderFile(
  path.join(SRC_DIR, "templates", "formatted.html.pug"),
  locals
);

const outputFile = path.join(OUTPUT_DIR, "formatted.html");
fs.writeFileSync(outputFile, html);
console.log(`Wrote file: ${outputFile}`);

open(outputFile);
